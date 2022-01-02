import {FC} from 'react';

import {Comment as CommentType} from '../../../store/types';

interface CommentProps {
    comment: CommentType;
    key: string;
}

const Comment: FC<CommentProps> = (props) => {

    const comment: CommentType = props.comment;

    console.log(comment);

    return (
        <article className="comment">
            <h5>{comment.user_id}</h5>
            <p>{comment.comment}</p>
        </article>
    )
}

export default Comment;
