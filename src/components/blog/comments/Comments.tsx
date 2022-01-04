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
        <>
            <h5>Reactions</h5>
            { comments && comments.map((c) => {
                return <Comment key={c.id!} comment={c} />
            })}
        </>
    )
}

export default Comments;
