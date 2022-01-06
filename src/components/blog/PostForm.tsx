import {FC, FormEvent, useEffect, useState} from 'react';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import {SubmitHandler, useForm, Controller} from 'react-hook-form';
import {createPost, getPostById} from '../../store/actions/postActions';
import slugify from 'slugify';
import {useDispatch} from 'react-redux';
import usePostSelector from '../../hooks/usePostSelector';
import useTripsSelector from '../../hooks/useTripsSelector';
import {Post} from '../../store/types';

import { EditorState, convertToRaw } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

interface IPostFormInput {
    title: string;
    slug: string;
    subtitle: string;
    content: string;
    trip: string;
    progress: string;
    published: boolean;
}

interface PostFormProps {
    postId?: string;
}

const PostForm: FC<PostFormProps> = ({postId}) => {

    console.log('Editing post #' + postId);

    const [editorState, setEditorState] = useState(() => EditorState.createEmpty());

    const dispatch = useDispatch();

    useEffect(() => {
        if (postId) {
            dispatch(getPostById(postId));
        }
    }, [dispatch, postId]);


    const {register, formState: {errors}, handleSubmit, setValue, getValues} = useForm<IPostFormInput>();

    const {post} = usePostSelector();
    const {trips} = useTripsSelector();

    useEffect(() => {
        if(post && post.id) {
            setValue('title', post!.title);
            setValue('slug', post!.id);
            setValue('subtitle', post!.subtitle);
            setValue('content', post!.content);
            setValue('trip', post!.trip);
            setValue('published', post!.published);
        }
    }, [setValue, post]);

    const onSubmit: SubmitHandler<IPostFormInput> = data => {
        const post: Post = {
            id: data.slug,
            title: data.title,
            subtitle: data.subtitle,
            content: data.content,
            trip: data.trip,
            progress: data.progress,
            published: data.published,
        }
        dispatch(createPost(post, () => console.error('An error happened!')));
    };

    const slugifyTitle = (title: string): void => {
        setValue('slug', slugify(title, {
            lower: true,
            strict: true,
        }), {shouldValidate: true});
    }


    return (
        <Row>
            <Col xs={12}>
                <Form onSubmit={handleSubmit(onSubmit)}>

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
                        <Editor editorState={editorState}
                                wrapperClassName="demo-wrapper"
                                editorClassName="demo-editor border rounded-bottom"
                                onEditorStateChange={setEditorState}
                        />

                        {
                            //<Form.Control as="textarea" rows={10} {...register('content', {required: true})} />
                        }
                    </Form.Group>

                    <Row>
                        <Col xs={12} md={6}>
                            <Form.Group className="mb-3" controlId="trip">
                                <Form.Label>Trip</Form.Label>
                                <Form.Select
                                    aria-label="Select the route" {...register('trip', {required: true})}>
                                    <option disabled>Trip list</option>
                                    {trips?.map((t) => {
                                        return <option value={t.id} key={t.id}>{t.name}</option>
                                    })}
                                </Form.Select>
                            </Form.Group>
                        </Col>
                        <Col xs={12} md={6}>
                            <Form.Group className="mb-3" controlId="progress">
                                <Form.Label>Progress</Form.Label>
                                <Form.Range className="mt-1" min={0} max={100} {...register('progress', {required: true})} />
                            </Form.Group>
                        </Col>
                    </Row>

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
