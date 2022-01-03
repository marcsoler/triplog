import {FC, useState, useEffect} from 'react';

import {Comment as CommentType} from '../../../store/types';

import {Row, Col} from 'react-bootstrap';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faChevronUp} from '@fortawesome/free-solid-svg-icons/faChevronUp';
import {useDispatch} from 'react-redux';
import useAuthSelector from '../../../hooks/useAuthSelector';
import {addReaction} from '../../../store/actions/commentActions';


interface CommentProps {
    key: string;
    comment: CommentType;
}

const Comment: FC<CommentProps> = (props) => {

    const comment = props.comment;

    const [votes, setVotes] = useState<number>(comment.reactions ? comment.reactions.length : 0);

    const {authenticated, user} = useAuthSelector();

    const dispatch = useDispatch();

    const handleReaction = () => {
        if(authenticated) {
            dispatch(addReaction(comment, user!));
            //todo: if success? +1... else -1 (already voted and cancels vote)
            setVotes(votes+1);
            return;
        }
        window.alert('You need to be authenticated!'); //todo
    }


    return (
        <article className="comment">
            <Row>
                <Col xs={2} md={1}>
                    <FontAwesomeIcon icon={faChevronUp} onClick={handleReaction}/>
                    <span>{votes}</span>
                </Col>
                <Col xs={10} md={11}>
                    <h5>{comment.user_id}</h5>
                    <p>{comment.comment}</p>
                </Col>
            </Row>
        </article>
    )
}

export default Comment;
