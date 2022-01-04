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

const ReactionButton: FC<Comment> = (comment) => {

    const {authenticated, user} = useAuthSelector();
    const [reactions] = useState<Reaction[]>(comment.reactions);
    const [showLogin, setShowLogin] = useState(false);

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
            setShowLogin(true);
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

    return (
        <>
            <Button type="button" variant="outline-dark" onClick={(e) => handleReaction(e)}>
                <FontAwesomeIcon icon={faChevronUp} style={{color: voted ? 'red' : 'inherit'}}/>
                <span>{votes}</span>
            </Button>

            <Modal show={showLogin} onHide={() => setShowLogin(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Sign in</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <SignIn />
                </Modal.Body>
            </Modal>
        </>
    )
}

export default ReactionButton;
