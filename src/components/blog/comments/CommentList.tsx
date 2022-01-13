import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faComment } from '@fortawesome/free-solid-svg-icons'

import {FC, useEffect, useState} from 'react';
import useCommentsSelector from '../../../hooks/useCommentsSelector';
import usePostSelector from '../../../hooks/usePostSelector';
import {Comment} from '../../../store/types';
import CommentPartial from './CommentPartial';


const CommentList: FC = () => {

    const [postComments, setPostComments] = useState<Comment[]>([]);

    const {post} = usePostSelector();
    const {comments} = useCommentsSelector();

    useEffect(() => {
        if(post && comments) {
            setPostComments(comments.filter((c) => { return c.post_id === post.slug}));
        }
    }, [post, comments]);



    return (
        <div className="comments">
            <h3 className="color-darkcyan mb-3">Reactions <span className="color-gray-500"><FontAwesomeIcon icon={faComment} size="lg" /></span></h3>
            { postComments && postComments.map((c) => {
                return <CommentPartial key={c.id} {...c} />
            })}
        </div>
    )
}

export default CommentList;
