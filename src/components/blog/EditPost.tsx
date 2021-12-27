import {FC} from 'react';
import {RouteComponentProps} from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import PostForm from './PostForm';


const EditPost: FC<RouteComponentProps<{ id: string }>> = (props) => {

    const postId = props.match.params.id;

    return (
        <Container>
            <PostForm postId={postId}/>
        </Container>


    )
}

export default EditPost;
