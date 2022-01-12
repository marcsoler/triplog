import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faComment } from '@fortawesome/free-solid-svg-icons'

import {FC, useEffect} from 'react';
import {useDispatch} from 'react-redux';
import useCommentsSelector from '../../../hooks/useCommentsSelector';
import {getCommentsByPostId} from '../../../store/actions/commentActions';
import usePostSelector from '../../../hooks/usePostSelector';
import Comment from './Comment';

const Comments: FC = () => {

    const dispatch = useDispatch();

    const {post} = usePostSelector();

    useEffect(() => {
        if(post) {
            dispatch(getCommentsByPostId(post.id!));
        }
    }, [dispatch, post]);

    const {comments} = useCommentsSelector();


    return (
        <div className="comments">
            <h3 className="color-darkcyan mb-3">Reactions <span className="color-gray-500"><FontAwesomeIcon icon={faComment} size="lg" /></span></h3>
            { comments && comments.map((c) => {
                return <Comment key={c.id!} comment={c} />
            })}
        </div>
    )
}

export default Comments;
