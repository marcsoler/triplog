import {FC} from 'react';

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

    const {authenticated, user} = useAuthSelector();

    const dispatch = useDispatch();

    const handleReaction = () => {
        if(authenticated) {
            console.log(`React to comment #${comment.id}`);
            dispatch(addReaction(comment, user!));
            return;
        }
        window.alert('You need to be authenticated!'); //todo
    }

    const voteIcon = <FontAwesomeIcon icon={faChevronUp} onClick={handleReaction}/>

    return (
        <article className="comment">
            <Row>
                <Col xs={2} md={1}>
                    {voteIcon}
                    <span>5</span>
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
