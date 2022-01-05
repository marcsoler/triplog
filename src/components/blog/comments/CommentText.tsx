import {FC, useState} from 'react';
import useAuthSelector from '../../../hooks/useAuthSelector';
import {Comment} from '../../../store/types';
import {useDispatch} from 'react-redux';
import {approveComment} from '../../../store/actions/commentActions';
import {deleteComment} from '../../../store/actions/commentActions';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
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
                <div className="mb-3">
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
        return <p>{comment.text}</p>
    }

    const commentStyle = {
        fontSize: '0.85em',
        color: '#ccc',
        cursor: 'pointer',
    }

    return (
        <p onClick={showComment} style={commentStyle}>{approved ? comment.text :
            <em>This comment hasn't been approved yet. Click to view.</em>}</p>
    )
}

export default CommentText;
