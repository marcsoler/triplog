import {FC} from 'react';

import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';


const CreatePost: FC = () => {
    return (
        <Container>
            <Row>
                <Col xs={12} md={10} lg={8}>
                    <Form>
                        <h2>New post</h2>
                    </Form>
                </Col>
            </Row>
        </Container>
    )
}

export default CreatePost;
