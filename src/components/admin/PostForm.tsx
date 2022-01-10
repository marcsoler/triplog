import {FC, FormEvent, useEffect, useState} from 'react';

import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';

import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faSignature} from '@fortawesome/free-solid-svg-icons/faSignature';
import {faCheck} from '@fortawesome/free-solid-svg-icons/faCheck';

import {Controller, SubmitHandler, useForm} from 'react-hook-form';
import {createPost, getPostById} from '../../store/actions/postActions';
import slugify from 'slugify';
import {useDispatch} from 'react-redux';
import usePostSelector from '../../hooks/usePostSelector';
import useTripsSelector from '../../hooks/useTripsSelector';
import {Post, Trip} from '../../store/types';

import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import FormMap from '../trip/FormMap';


interface IPostFormInput {
    title: string;
    slug: string;
    subtitle: string;
    content: string;
    trip: string;
    position: google.maps.LatLng;
    draft: boolean;
}

interface PostFormProps {
    postId?: string;
}

const PostForm: FC<PostFormProps> = ({postId}) => {

    const dispatch = useDispatch();

    const [selectedTrip, setSelectedTrip] = useState<Trip>();

    const {trips} = useTripsSelector();


    useEffect(() => {
        if (postId) {
            dispatch(getPostById(postId));
        }
    }, [dispatch, postId]);


    const {post} = usePostSelector();

    useEffect(() => {
        if (trips && post && postId) {
            const trip = trips?.find((t) => {
                return t.id === post.trip;
            });
            setSelectedTrip(trip);
        }
    }, [post, trips, postId]);


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
            draft: post?.draft,
        } : {}
    });

    /*
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
     */


    const onSubmit: SubmitHandler<IPostFormInput> = data => {
        const post: Post = {
            id: data.slug,
            title: data.title,
            subtitle: data.subtitle,
            content: data.content,
            trip: data.trip,
            position: data.position,
            draft: data.draft,
        }
        dispatch(createPost(post, () => console.error('An error happened!')));
    };

    const slugifyTitle = (title: string): void => {
        setValue('slug', slugify(title, {
            lower: true,
            strict: true,
        }), {shouldValidate: true});
    }

    const loadTrip = (e: FormEvent<HTMLSelectElement>): void => {

        const tripId = e.currentTarget.value;

        const trip = trips?.find((t) => {
            return t.id === tripId;
        });
        setSelectedTrip(trip);
    }

    useEffect(() => {
        register('position', {required: true});
    }, [register]);


    return (
        <Container className="post-form content">
            <Row>
                <Col xs={12}>

                    <h1 className="mb-3">{postId ? 'Edit post' : 'New post'}</h1>

                    <Form onSubmit={handleSubmit(onSubmit)}>

                        <Form.Group className="mb-3" controlId="title">
                            <FloatingLabel controlId="title" label="Title">
                                <Form.Control className={(errors.title && 'is-invalid')}
                                              type="text" placeholder="Title" {...register('title', {
                                    required: true,
                                    onChange: (e) => !postId ? slugifyTitle(e.currentTarget.value) : void (0)
                                })} />
                            </FloatingLabel>
                            {errors.title && <p className="form-validation-failed">The title is a required field!</p>}
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <InputGroup>
                                <InputGroup.Text>{`${window.location.origin}/post/`}</InputGroup.Text>
                                <Form.Control className={(errors.slug && 'is-invalid')}
                                              type="text"
                                              readOnly {...register('slug', {
                                    required: true,
                                })} />
                                <InputGroup.Text>todo (check of duplicates)</InputGroup.Text>
                            </InputGroup>
                            {errors.slug &&
                                <p className="form-validation-failed">The slug is a required field and must be an unique
                                    identifier!</p>}
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="subtitle">
                            <FloatingLabel controlId="subtitle" label="Subtitle">
                                <Form.Control className={(errors.subtitle && 'is-invalid')}
                                              type="subtitle"
                                              placeholder="Subtitle" {...register('subtitle', {required: true})} />
                            </FloatingLabel>
                            {errors.subtitle &&
                                <p className="form-validation-failed">The subtitle is a required field!</p>}
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="content">
                            <Controller control={control} name="content"
                                        rules={{required: true}}
                                        render={({field: {onChange, value}}) => (
                                            <ReactQuill placeholder="Write here your story&hellip;" onChange={onChange}
                                                        value={value}
                                                        className={(errors.content && 'is-invalid')}
                                                        modules={{
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

                            {errors.content &&
                                <p className="form-validation-failed">Please add some content</p>}
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="trip">
                            <FloatingLabel controlId="trip" label="Trip">
                                <Form.Select
                                    aria-label="Select the trip" {...register('trip', {required: true})}
                                    onChange={(e) => loadTrip(e)}>
                                    <option value="">Select the trip&hellip;</option>
                                    {trips?.map((t) => {
                                        return <option value={t.id} key={t.id}>{t.name}</option>
                                    })}
                                </Form.Select>
                            </FloatingLabel>
                            {errors.trip &&
                                <p className="form-validation-failed">Please select a trip</p>}
                        </Form.Group>

                        {selectedTrip &&
                            <FormMap trip={selectedTrip} position={(p: google.maps.LatLng) => setValue('position', p)}
                                     preDefinedPosition={postId && post && post.position}/>}
                        {!errors.trip && errors.position &&
                            <p className="form-validation-failed">Add a position by clicking on the map</p>}

                        <hr className="mb-5 mt-5"/>

                        <ButtonGroup className="w-100" size="lg">
                            <Button variant="outline-secondary" type="submit" onClick={() => setValue('draft', true)}>
                                <FontAwesomeIcon icon={faSignature}/> Save as Draft
                            </Button>
                            <Button variant="outline-primary" type="submit" onClick={() => setValue('draft', false)}>
                                <FontAwesomeIcon icon={faCheck}/> {postId ? 'Update post' : 'Submit post'}
                            </Button>
                        </ButtonGroup>


                    </Form>
                </Col>
            </Row>
        </Container>
    )
}

export default PostForm;
