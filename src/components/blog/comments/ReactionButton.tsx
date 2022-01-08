import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faChevronUp} from '@fortawesome/free-solid-svg-icons/faChevronUp';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import React, {FC, useState} from 'react';
import {addReaction} from '../../../store/actions/commentActions';
import useAuthSelector from '../../../hooks/useAuthSelector';
import {useDispatch} from 'react-redux';
import {Reaction, Comment} from '../../../store/types';
import SignIn from '../../auth/SignIn';
import {setAuthModal} from '../../../store/actions/authActions';

const ReactionButton: FC<Comment> = (comment) => {

    const {authenticated, user} = useAuthSelector();
    const [reactions] = useState<Reaction[]>(comment.reactions);

    const alreadyVoted = (): boolean => {
        if (authenticated) {
            return !!reactions.find(r => r.user_id === user!.id);
        }
        return false;
    }

    const [votes, setVotes] = useState(reactions ? reactions.length : 0);
    const dispatch = useDispatch();
    const [voted, setVoted] = useState(alreadyVoted);
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
