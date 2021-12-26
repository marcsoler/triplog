import {FC, FormEvent, useEffect, useState} from 'react';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';
import InputGroup from 'react-bootstrap/InputGroup';
import Row from 'react-bootstrap/Row';
import ReactMarkdown from 'react-markdown';
import Button from 'react-bootstrap/Button';
import {SubmitHandler, useForm} from 'react-hook-form';
import {createPost, getLatestPost, getPostById, getPosts} from '../../store/actions/postActions';
import slugify from 'slugify';
import {useDispatch} from 'react-redux';
import usePostSelector from '../../hooks/usePostSelector';

interface IPostFormInput {
    title: string;
    slug: string;
    subtitle: string;
    content: string;
    route: string;
    progress: string;
    published: boolean;
}

interface PostFormProps {
    postId?: string;
}

const PostForm: FC<PostFormProps> = ({postId}) => {

    if(postId) {
        console.log('editing...', postId);
    }


    const [title, setTitle] = useState('');
    const [subtitle, setSubtitle] = useState('');
    const [content, setContent] = useState('');

    const dispatch = useDispatch();

    useEffect(() => {
        if (postId) {
            dispatch(getPostById(postId));
        } else {
            dispatch(getLatestPost());
        }
        dispatch(getPosts());
    }, [dispatch, postId]);


    const {register, formState: {errors}, handleSubmit, setValue, getValues} = useForm<IPostFormInput>();

    const {post} = usePostSelector();

    useEffect(() => {
        if(postId) {
            setValue('title', post!.title);
            setValue('slug', post!.id);
            setValue('subtitle', post!.subtitle);
            setValue('content', post!.content);
            setValue('route', post!.route);
            setValue('published', post!.published);
        }
    }, [postId, setValue, post]);

    const onSubmit: SubmitHandler<IPostFormInput> = data => {
        dispatch(createPost(data, () => console.error('An error happened!')));
    };

    const slugifyTitle = (title: string): void => {
        setValue('slug', slugify(title, {
            lower: true,
            strict: true,
        }), {shouldValidate: true});
    }

    const generatePreview = (e: FormEvent): void => {
        const formValues = getValues();
        setTitle(formValues.title);
        setSubtitle(formValues.subtitle);
        setContent(formValues.content);
    }

    return (
        <Row>
            <Col xs={12}>
                <Form onSubmit={handleSubmit(onSubmit)} onChange={(e) => generatePreview(e)}>

                    <Tabs defaultActiveKey="write" id="uncontrolled-tab-example" className="mt-3 mb-3">
                        <Tab eventKey="write" title="Write">


                            <Form.Group className="mb-3" controlId="title">
                                <Form.Label>Title</Form.Label>
                                <Form.Control className={(errors.title && 'is-invalid')}
                                              type="text" {...register('title', {
                                    required: true,
                                    onChange: (e) => !postId ? slugifyTitle(e.currentTarget.value) : void(0)
                                })} />
                                {errors.title &&
                                    <div className="invalid-feedback">The title is a required field!</div>}
                            </Form.Group>

                            <Form.Group className="mb-3">
                                <Form.Label>Slug</Form.Label>
                                <InputGroup>
                                    <InputGroup.Text>{`${window.location.origin}/post/`}</InputGroup.Text>
                                    <Form.Control type="text"
                                                  readOnly {...register('slug')} />
                                </InputGroup>
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="subtitle">
                                <Form.Label>Subtitle</Form.Label>
                                <Form.Control type="subtitle" {...register('subtitle', {required: true})} />
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="content">
                                <Form.Label>Content</Form.Label>
                                <Form.Control as="textarea" rows={10} {...register('content', {required: true})} />
                            </Form.Group>

                            <Row>
                                <Col xs={12} md={6}>
                                    <Form.Group className="mb-3" controlId="route">
                                        <Form.Label>Route</Form.Label>
                                        <Form.Select
                                            aria-label="Select the route" {...register('route', {required: true})}>
                                            <option disabled>Route list</option>
                                            <option value="1">Iceland</option>
                                            <option value="2">Trip across America</option>
                                        </Form.Select>
                                    </Form.Group>
                                </Col>
                                <Col xs={12} md={6}>
                                    <Form.Group className="mb-3" controlId="progress">
                                        <Form.Label>Progress</Form.Label>
                                        <Form.Range className="mt-1" {...register('progress', {required: true})} />
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

                    <Form.Group className="mb-3" controlId="published">
                        <Form.Label>Published</Form.Label>
                        <Form.Check type="switch" label="Publish" {...register('published')} />
                    </Form.Group>

                    <Button variant="primary" type="submit">
                        Submit
                    </Button>
                </Form>


            </Col>
        </Row>
    )
}

export default PostForm;
