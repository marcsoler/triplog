import {FC, useState} from 'react';
import useAuthSelector from '../../../hooks/useAuthSelector';
import {Comment} from '../../../store/types';
import {useDispatch} from 'react-redux';
import {approveComment} from '../../../store/actions/commentActions';
import {deleteComment} from '../../../store/actions/commentActions';

import {Button, ButtonGroup} from 'react-bootstrap';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faCheck, faTrash} from '@fortawesome/free-solid-svg-icons';


const CommentText: FC<Comment> = (comment) => {
    const [approved, setApproved] = useState(!!comment.approved_at);
    const {user} = useAuthSelector();
    const dispatch = useDispatch();

    const handleApproveComment = () => {
        dispatch(approveComment(comment));
    }

    const handleDeleteComment = () => {
        dispatch(deleteComment(comment))
    }

    const showComment = () => {
        setApproved(true); // "approved" by the user
    }

    if (user && user.admin) {
        return (
            <>
                <div className="comment-text mb-3">
                    {comment.text}
                </div>
                <ButtonGroup size="sm">
                    {!approved && <Button variant="outline-primary" onClick={handleApproveComment}><FontAwesomeIcon
                        icon={faCheck}/> Approve</Button>}
                    <Button variant="outline-danger" onClick={handleDeleteComment}><FontAwesomeIcon
                        icon={faTrash}/> Delete</Button>
                </ButtonGroup>
            </>
        )
    }

    if (comment.approved_at) {
        return <div className="comment-text mb-3">{comment.text}</div>
    }

    const commentStyle = {
        fontSize: '0.85em',
        color: approved ? 'inherit' : '#ccc',
        cursor: 'pointer',
    }

    return (
        <p className="comment-text mb-3" onClick={showComment} style={commentStyle}>{approved ? comment.text :
            <em>This comment hasn't been approved yet. Click to view.</em>}</p>
    )
}

export default CommentText;
