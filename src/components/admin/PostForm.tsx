import {FC, FormEvent, useEffect, useState} from 'react';

import {Col, Container, FloatingLabel, Form, InputGroup, Row, Button, ButtonGroup} from 'react-bootstrap';

import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faSignature, faCheck, faExclamationTriangle} from '@fortawesome/free-solid-svg-icons';

import {Controller, SubmitHandler, useForm} from 'react-hook-form';
import {createPost, getPostBySlug} from '../../store/actions/postActions';
import slugify from 'slugify';
import {useDispatch} from 'react-redux';
import usePostSelector from '../../hooks/usePostSelector';
import useTripsSelector from '../../hooks/useTripsSelector';
import {IPostFormData, Trip} from '../../store/types';

import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import FormMap from '../trip/FormMap';
import usePostsSelector from '../../hooks/usePostsSelector';

interface PostFormProps {
    slug?: string;
}

const PostForm: FC<PostFormProps> = ({slug}) => {

    const dispatch = useDispatch();

    const [selectedTrip, setSelectedTrip] = useState<Trip>();
    const [selectedSlug, setSelectedSlug] = useState<string>();
    const [postSlugTaken, setPostSlugTaken] = useState<boolean>(false);

    const {trips} = useTripsSelector();

    useEffect(() => {
        if (slug) {
            dispatch(getPostBySlug(slug));
        }
    }, [dispatch, slug]);

    const {posts} = usePostsSelector();
    const {post} = usePostSelector();

    useEffect(() => {
        if (trips && post && slug) {
            const trip = trips?.find((t) => {
                return t.id === post.trip;
            });
            setSelectedTrip(trip);
        }
    }, [post, trips, slug]);

    const {
        register,
        control,
        formState: {errors},
        handleSubmit,
        setValue,
        getValues,
        reset
    } = useForm<IPostFormData>();

    useEffect(() => {
        if(post) {
            reset(post);
        }
    }, [post, reset]);



    const onSubmit: SubmitHandler<IPostFormData> = data => {
        dispatch(createPost(data));
    };

    const slugifyTitle = (title: string): void => {
        const generatedSlug = slugify(title, {
            lower: true,
            strict: true,
        });
        setValue('slug', generatedSlug);
        setSelectedSlug(generatedSlug);
    }

    useEffect(() => {
        setPostSlugTaken(!!posts?.find((p) => {
            return p.slug === selectedSlug
        }));
    }, [selectedSlug, posts]);


    const loadTrip = (e: FormEvent<HTMLSelectElement>) => {
        const tripId = e.currentTarget.value;
        if (trips) {
            const trip = trips.find((t) => {
                return t.id === tripId;
            });
            setSelectedTrip(trip);
        }
    }

    useEffect(() => {
        register('position', {required: true});
    }, [register]);


    return (
        <Container className="post-form content">
            <Row>
                <Col xs={12}>

                    <h1 className="mb-3">{slug ? 'Edit post' : 'New post'}</h1>

                    <Form onSubmit={handleSubmit(onSubmit)}>

                        <Form.Group className="mb-3" controlId="title">
                            <FloatingLabel controlId="title" label="Title">
                                <Form.Control className={(errors.title && 'is-invalid')}
                                              type="text" placeholder="Title" {...register('title', {
                                    required: true,
                                    onChange: (e) => !slug ? slugifyTitle(e.currentTarget.value) : void (0)
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
                                {getValues('title') && <InputGroup.Text><FontAwesomeIcon
                                    icon={postSlugTaken ? faExclamationTriangle : faCheck}
                                    style={{color: postSlugTaken ? 'red' : 'green'}}/></InputGroup.Text>}
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
                                     preDefinedPosition={slug && post && post.position}/>}
                        {!errors.trip && errors.position &&
                            <p className="form-validation-failed">Add a position by clicking on the map</p>}

                        <hr className="mb-5 mt-5"/>

                        <ButtonGroup className="w-100" size="lg">
                            <Button variant="outline-secondary" type="submit" onClick={() => setValue('draft', true)}>
                                <FontAwesomeIcon icon={faSignature}/> Save as Draft
                            </Button>
                            <Button variant="outline-primary" type="submit" onClick={() => setValue('draft', false)}>
                                <FontAwesomeIcon icon={faCheck}/> {slug ? 'Update post' : 'Submit post'}
                            </Button>
                        </ButtonGroup>


                    </Form>
                </Col>
            </Row>
        </Container>
    )
}

export default PostForm;
