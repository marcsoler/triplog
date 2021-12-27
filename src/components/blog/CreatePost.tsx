import {FC} from 'react';

import Container from 'react-bootstrap/Container';

import PostForm from './PostForm';

const CreatePost: FC = () => {

    return (
        <Container>
            <PostForm />
        </Container>
    )
}

export default CreatePost;
