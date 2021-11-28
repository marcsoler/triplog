import {FC, FormEvent, useState} from 'react';

import Button from 'react-bootstrap/Button'
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';


const CreatePost: FC = () => {

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();

    }

    return (
        <Container>
            <Row>
                <Col xs={12} md={10} lg={8}>

                    <h2>New post</h2>

                    <Form>

                        <Form.Group className="mb-3" controlId="title">
                            <Form.Label>Title</Form.Label>
                            <Form.Control type="text" required />
                        </Form.Group>

                        <Form.Group>
                            <Form.Label>Slug</Form.Label>
                        </Form.Group>

                        <Form.Group>
                            <Form.Group className="mb-3" controlId="subtitle">
                                <Form.Label>Subtitle</Form.Label>
                                <Form.Control type="subtitle" />
                            </Form.Group>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="content">
                            <Form.Label>Content</Form.Label>
                            <Form.Control as="textarea" rows={10} />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="status">
                            <Form.Label>Status</Form.Label>
                            <Form.Check type="switch" id="status-switch" label="Publish" />
                        </Form.Group>


                        <Button variant="primary" type="submit">
                            Submit
                        </Button>
                    </Form>
                </Col>
            </Row>
        </Container>
    )
}

export default CreatePost;
