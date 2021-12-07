import {FC, FormEvent, useState, useEffect} from 'react';

import slugify from 'slugify';

import Button from 'react-bootstrap/Button'
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import InputGroup from 'react-bootstrap/InputGroup';
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';
import {useDispatch} from 'react-redux';
import {createPost} from '../../store/actions/postActions';
import ReactMarkdown from 'react-markdown';


const CreatePost: FC = () => {

    const [title, setTitle] = useState('');
    const [slug, setSlug] = useState('');
    const [subtitle, setSubtitle] = useState('');
    const [content, setContent] = useState('');
    const [route, setRoute] = useState('');
    const [progress, setProgress] = useState('');
    const [status, setStatus] = useState('');

    const dispatch = useDispatch();

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();

        dispatch(createPost({
            title,
            slug,
            subtitle,
            content,
            route,
            progress,
            status
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
                <Col xs={12}>
                    <Form onSubmit={handleSubmit}>

                        <Tabs defaultActiveKey="write" id="uncontrolled-tab-example" className="mt-3 mb-3">
                            <Tab eventKey="write" title="Write">


                                <Form.Group className="mb-3" controlId="title">
                                    <Form.Label>Title</Form.Label>
                                    <Form.Control type="text" required
                                                  onChange={(e) => setTitle(e.currentTarget.value)}/>
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
                                    <Form.Control as="textarea" rows={10}
                                                  onChange={(e) => setContent(e.currentTarget.value)}/>
                                </Form.Group>

                                <Row>
                                    <Col xs={12} md={6}>
                                        <Form.Group className="mb-3" controlId="route">
                                            <Form.Label>Route</Form.Label>
                                            <Form.Select aria-label="Select the route">
                                                <option disabled>Route list</option>
                                                <option value="1">Iceland</option>
                                                <option value="2">Trip across America</option>
                                            </Form.Select>
                                        </Form.Group>
                                    </Col>
                                    <Col xs={12} md={6}>
                                        <Form.Group className="mb-3" controlId="progress">
                                            <Form.Label>Progress</Form.Label>
                                            <Form.Range className="mt-1"/>
                                        </Form.Group>
                                    </Col>
                                </Row>


                            </Tab>
                            <Tab eventKey="profile" title="Preview">
                                {title && <h1>{title}</h1>}
                                {subtitle && <p className="lead">{subtitle}</p>}
                                {content && <ReactMarkdown>{content}</ReactMarkdown>}
                            </Tab>
                        </Tabs>

                        <hr className="mb-3 mt-5"/>

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
