import {FC, useEffect, useState} from 'react';

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

import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

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

    const [unsaved, setUnsaved] = useState(true);

    const dispatch = useDispatch();

    useEffect(() => {
        if (postId) {
            console.log('editing... dispatch to get last one...');
            dispatch(getPostById(postId));
        }
    }, [dispatch, postId]);


    const {register, control, formState: {errors, isDirty}, handleSubmit, setValue} = useForm<IPostFormInput>({
        defaultValues: {
            title: 'yolo',
            subtitle: 'yolo',
        }
    });

    useEffect(() => {
        if (isDirty) {
            window.onbeforeunload = () => {
                return 'Do you really want to close?';
            }
        }
    }, [isDirty]);

    const {post} = usePostSelector();
    const {trips} = useTripsSelector();

    useEffect(() => {
        if (postId && post) {
            setValue('title', post!.title);
            setValue('slug', post!.id!);
            setValue('subtitle', post!.subtitle);
            setValue('content', post!.content);
            setValue('trip', post!.trip);
            setValue('published', post!.published);
        }
    }, [setValue, post, postId]);

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
                            onChange: (e) => !postId ? slugifyTitle(e.currentTarget.value) : void (0)
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

                        <Controller control={control} name="content" render={({field: {onChange, value}}) => (
                            <ReactQuill onChange={onChange} value={value} modules={{
                                toolbar: {
                                    container: [
                                        [{'header': [3, 4, 5, 6, false]}],
                                        ['bold', 'italic', 'underline'],
                                        [{'list': 'ordered'}, {'list': 'bullet'}],
                                        [{'align': []}],
                                        ['link', 'image'],
                                        ['clean'],
                                        [{'color': []}]
                                    ]
                                }
                            }}/>
                        )}/>

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
                                <Form.Range className="mt-1" min={0}
                                            max={100} {...register('progress', {required: true})} />
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
