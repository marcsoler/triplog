import {FC, FormEvent, useEffect} from 'react';

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
import {getTripById} from '../../store/actions/tripActions';
import FormMap from '../trip/FormMap';
import useTripSelector from '../../hooks/useTripSelector';
import Container from 'react-bootstrap/Container';

interface IPostFormInput {
    title: string;
    slug: string;
    subtitle: string;
    content: string;
    trip: string;
    position: google.maps.LatLng;
    published: boolean;
}

interface PostFormProps {
    postId?: string;
}

const PostForm: FC<PostFormProps> = ({postId}) => {

    const dispatch = useDispatch();


    useEffect(() => {
        if (postId) {
            dispatch(getPostById(postId));
        }
    }, [dispatch, postId]);


    const {post} = usePostSelector();
    const {trips} = useTripsSelector();


    const {
        register,
        control,
        formState: {errors, isDirty},
        handleSubmit,
        setValue,
    } = useForm<IPostFormInput>({
        defaultValues: postId ? {
            title: post?.title,
            slug: post?.id,
            subtitle: post?.subtitle,
            content: post?.content,
            trip: post?.trip,
            position: post?.position,
            published: post?.published,
        } : {}
    });

    useEffect(() => {
        const confirmDiscard = (e: BeforeUnloadEvent) => {
            e.preventDefault();
            e.returnValue = ''; //required by chrome
        }
        if (isDirty) {
            window.addEventListener('beforeunload', confirmDiscard);
        } else {
            window.removeEventListener('beforeunload', confirmDiscard);
        }
    }, [isDirty]);


    const onSubmit: SubmitHandler<IPostFormInput> = data => {
        const post: Post = {
            id: data.slug,
            title: data.title,
            subtitle: data.subtitle,
            content: data.content,
            trip: data.trip,
            position: data.position,
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

    const loadTrip = (e: FormEvent<HTMLSelectElement>) => {

        const tripId = e.currentTarget.value;

        dispatch(getTripById(tripId));

    }

    const {trip} = useTripSelector();

    useEffect(() => {
        console.log('current trip', trip);
    }, [trip]);


    return (
        <Container className="post-form content">
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

                        <Form.Group className="mb-3" controlId="trip">
                            <Form.Label>Trip</Form.Label>
                            <Form.Select
                                aria-label="Select the route" {...register('trip', {required: true})}
                                onChange={(e) => loadTrip(e)}>
                                <option disabled>Trip list</option>
                                {trips?.map((t) => {
                                    return <option value={t.id} key={t.id}>{t.name}</option>
                                })}
                            </Form.Select>
                        </Form.Group>

                        {trip && <FormMap position={(p: google.maps.LatLng) => setValue('position', p)}/>}

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
        </Container>
    )
}

export default PostForm;
