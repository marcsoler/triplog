import {FC} from 'react';
import {RouteComponentProps} from 'react-router-dom';
import PostForm from './PostForm';


const EditPost: FC<RouteComponentProps<{ id: string }>> = (props) => {

    const postId = props.match.params.id;

    return (
        <PostForm postId={postId}/>
    )
}

export default EditPost;
