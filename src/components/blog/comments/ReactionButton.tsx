import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faChevronUp} from '@fortawesome/free-solid-svg-icons/faChevronUp';
import Button from 'react-bootstrap/Button';
import React, {FC, useEffect, useState} from 'react';
import {addReaction} from '../../../store/actions/commentActions';
import useAuthSelector from '../../../hooks/useAuthSelector';
import {useDispatch} from 'react-redux';
import {Reaction, Comment} from '../../../store/types';
import {setAuthModal} from '../../../store/actions/authActions';

const ReactionButton: FC<Comment> = (comment) => {

    const {authenticated, user} = useAuthSelector();

    const [reactions, setReactions] = useState<Reaction[]>([]);
    const [votes, setVotes] = useState(0);
    const [voted, setVoted] = useState(false);

    useEffect(() => {
        if(comment.reactions) {
            setVotes(comment.reactions.length);
            setReactions(comment.reactions);
        }
    }, [comment]);

    useEffect(() => {
        if (user) {
            return setVoted(!!reactions.find(r => r.user_id === user!.id));
        }
        return setVoted(false);
    }, [user, reactions]);

    const dispatch = useDispatch();

    const handleReaction = (e: React.MouseEvent<HTMLButtonElement>) => {
        if (!authenticated) {
            dispatch(setAuthModal(true));
            return;
        }
        dispatch(addReaction(comment, user!, () => {
            setVotes(votes + 1);
            setVoted(true);
        }, () => {
            setVotes(votes - 1);
            setVoted(false);
        }));
        return;
    }

    const divStyle = {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    }

    return (
        <Button type="button" variant="outline-dark" onClick={(e) => handleReaction(e)}
            // @ts-ignore
            style={divStyle}
        >
            <FontAwesomeIcon icon={faChevronUp} style={{color: voted ? 'red' : 'inherit'}}/>
            <span>{votes}</span>
        </Button>
    )
}

export default ReactionButton;
