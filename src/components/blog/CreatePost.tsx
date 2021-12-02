import {FC, FormEvent, useState, useEffect} from 'react';

import slugify from 'slugify';

import Button from 'react-bootstrap/Button'
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import InputGroup from 'react-bootstrap/InputGroup';
import {useDispatch} from 'react-redux';
import {createPost} from '../../store/actions/postActions';


const CreatePost: FC = () => {

    const [title, setTitle] = useState('');
    const [slug, setSlug] = useState('');
    const [subtitle, setSubtitle] = useState('');
    const [content, setContent] = useState('');
    const [status, setStatus] = useState('');

    const dispatch = useDispatch();

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();

        console.log(title, slug, subtitle, content, status);

        dispatch(createPost({
            title,
            slug,
            subtitle,
            content, status
        }, () => console.log('hmm?')));

    }

    useEffect(() => {
        return () => {
            setSlug(slugify(title, {
                lower: true
            }));
        };
    }, [title]);


    return (
        <Container>
            <Row>
                <Col xs={12} md={10} lg={8}>

                    <h2>New post</h2>

                    <Form onSubmit={handleSubmit}>

                        <Form.Group className="mb-3" controlId="title">
                            <Form.Label>Title</Form.Label>
                            <Form.Control type="text" required onChange={(e) => setTitle(e.currentTarget.value)} />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Slug</Form.Label>
                            <InputGroup>
                                <InputGroup.Text>{`${window.location.origin}/post/`}</InputGroup.Text>
                                <Form.Control type="text" value={slug} readOnly/>
                            </InputGroup>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="subtitle">
                            <Form.Label>Subtitle</Form.Label>
                            <Form.Control type="subtitle" onChange={(e) => setSubtitle(e.currentTarget.value)}/>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="content">
                            <Form.Label>Content</Form.Label>
                            <Form.Control as="textarea" rows={10} onChange={(e) => setContent(e.currentTarget.value)}/>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="status">
                            <Form.Label>Status</Form.Label>
                            <Form.Check type="switch" onChange={(e) => setStatus(e.currentTarget.value)}
                                        label="Publish"/>
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
