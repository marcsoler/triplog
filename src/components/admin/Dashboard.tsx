import {FC, useState, useEffect} from 'react';

import {useDispatch} from 'react-redux';

import {Badge, Button, ButtonGroup, Col, Container, Dropdown, Image, Modal, Row, Table} from 'react-bootstrap'

import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {
    faSearch,
    faEdit,
    faTrash,
    faUndo,
    faTimes,
    faExclamationTriangle,
    faFilter,
    faPlus
} from '@fortawesome/free-solid-svg-icons';

import moment from 'moment';
import {deletePost, getPosts} from '../../store/actions/postActions';
import usePostsSelector from '../../hooks/usePostsSelector';
import useTripsSelector from '../../hooks/useTripsSelector';
import {deleteTrip, getTrips} from '../../store/actions/tripActions';
import {Post, Trip} from '../../store/types'
import {Link} from 'react-router-dom';
import {generateStaticMap} from '../../libs/mapsHelper';

const Dashboard: FC = () => {

    const [tripFilter, setTripFilter] = useState<Trip | null>(null);
    const [filteredPosts, setFilteredPosts] = useState<Post[]>();
    const [postToDelete, setPostToDelete] = useState<Post>();
    const [tripToDelete, setTripToDelete] = useState<Trip>();
    const [showPostModal, setShowPostModal] = useState(false);
    const [showTripModal, setShowTripModal] = useState(false);
    const {posts} = usePostsSelector();
    const {trips} = useTripsSelector();

    const dispatch = useDispatch();


    const promptPostDeletion = (slug: string) => {
        if (posts) {
            const post = posts.find((p) => {
                return p.slug === slug;
            })
            setPostToDelete(post);
            setShowPostModal(true);
        }
    }

    const handlePostDeletion = () => {
        if (postToDelete) {
            dispatch(deletePost(postToDelete));
        }
        setShowPostModal(false);
    }

    useEffect(() => {
        dispatch(getPosts());
        dispatch(getTrips());
    }, [dispatch]);

    const filterTable = (trip: Trip) => {
        setTripFilter(trip);
    }

    const resetFilter = () => {
        setTripFilter(null);
    }

    useEffect(() => {
        if (tripFilter && posts) {
            setFilteredPosts(posts.filter((p) => {
                return p.trip === tripFilter.id;
            }))
        } else {
            setFilteredPosts(posts);
        }
    }, [tripFilter, posts]);

    const promptTripDeletion = (tripId: string) => {
        if (trips) {
            const trip = trips.find((t) => {
                return t.id === tripId;
            })
            setTripToDelete(trip);
            setShowTripModal(true);
        }
        return;
    }

    const handleTripDeletion = () => {
        if (tripToDelete) {
            dispatch(deleteTrip(tripToDelete));
        }
        setShowTripModal(false);
    }

    return (
        <Container className="dashboard content">
            <h1>Dashboard</h1>

            <h2 className="color-darkcyan mt-5">Posts</h2>
            {filteredPosts &&
                <Table hover>
                    <caption className="sr-only">Posts</caption>
                    <thead>
                    <tr>
                        <th scope="col">Title</th>
                        <th scope="col">Trip</th>
                        <th scope="col">Created</th>
                        <th scope="col">Last updated</th>
                        <th scope="col"><></>
                        </th>
                    </tr>
                    </thead>
                    <tbody>

                    {!filteredPosts.length && (
                        <tr>
                            <td colSpan={5}>No posts found!</td>
                        </tr>
                    )}

                    {
                        filteredPosts && filteredPosts.map((p) => {

                            return (<tr key={p.slug}>
                                <td>
                                    {p.title} {(p.draft && <Badge bg="secondary">Draft</Badge>)}
                                </td>
                                <td>
                                    {
                                        trips!.find((t) => {
                                            return (t.id === p.trip)
                                        })?.name
                                    }
                                </td>
                                <td>{p.created_at && moment.unix(p.created_at.seconds).format('DD.MM.YYYY')}</td>
                                <td>{p.updated_at ? moment.unix(p.updated_at.seconds).format('DD.MM.YYYY') : 'Never'}</td>
                                <td className="text-end">
                                    <ButtonGroup size="sm" aria-label={`Actions for post ${p.title}`}>
                                        <Link className="btn btn-outline-primary" role="button"
                                              to={`/post/${p.slug}`}><FontAwesomeIcon
                                            icon={faSearch}/>View</Link>
                                        <Link className="btn btn-outline-secondary" role="button"
                                              to={`/dashboard/post/edit/${p.slug}`}><FontAwesomeIcon
                                            icon={faEdit}/> Edit</Link>
                                        <Button variant="outline-danger"
                                                onClick={(e) => promptPostDeletion(p.slug!)}><FontAwesomeIcon
                                            icon={faTrash}/> Delete</Button>
                                    </ButtonGroup>
                                </td>
                            </tr>)
                        })}
                    </tbody>
                </Table>}
            {tripFilter && (
                <Row>
                    <Col>
                        <div className="d-inline">
                            <span><small>{`${filteredPosts!.length} of ${posts!.length}`}</small></span>
                        </div>
                        <div className="d-inline m-3">
                            <Button variant="primary" size="sm" onClick={resetFilter}><FontAwesomeIcon
                                icon={faUndo}/> Reset
                                filter</Button>
                        </div>
                    </Col>
                </Row>
            )}
            <Row>
                <Col className="text-md-end">
                    <Link role="button" to="/dashboard/post/create" className="btn btn-outline-primary"><FontAwesomeIcon
                        icon={faPlus}/> Create Post</Link>
                </Col>
            </Row>


            <h2 className="color-darkcyan mt-5">Trips</h2>
            <Row xs={1} md={3} lg={7}>
                {trips && trips.map((trip) => {
                    return (
                        <Col key={trip.id}>

                            <div className="dashboard-trip mb-3">
                                <Image src={generateStaticMap(trip)} style={{maxWidth: '100%'}} loading="lazy"/>
                                <div className="dashboard-trip-overlay">
                                    <div className="dashboard-trip-overlay-inner">
                                        <h4 className="dashboard-trip-name color-black">{trip.name}</h4>
                                        <Dropdown>
                                            <Dropdown.Toggle variant="primary" size="sm" id={`${trip.id}-dropdown`}>
                                                Dropdown Button
                                            </Dropdown.Toggle>

                                            <Dropdown.Menu>
                                                <Dropdown.Item onClick={(e) => filterTable(trip)}><FontAwesomeIcon
                                                    icon={faFilter}/> Filter posts table</Dropdown.Item>
                                                <Dropdown.Divider/>
                                                <Dropdown.Item
                                                    onClick={(e) => promptTripDeletion(trip.id)}><FontAwesomeIcon
                                                    icon={faTrash}/> Delete</Dropdown.Item>
                                            </Dropdown.Menu>
                                        </Dropdown>
                                    </div>
                                </div>
                            </div>
                        </Col>
                    );
                })}
            </Row>
            <Row>
                <Col className="text-md-end">
                    <Link role="button" to="/dashboard/trip/create" id="createTripButton" className="btn btn-outline-primary"><FontAwesomeIcon
                        icon={faPlus}/> Create Trip</Link>
                </Col>
            </Row>

            <Modal show={showPostModal} onHide={() => setShowPostModal(false)}>
                <Modal.Header><strong>{postToDelete?.title}</strong></Modal.Header>
                <Modal.Body>
                    Are you sure you want to delete this post?
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={e => setShowPostModal(false)}><FontAwesomeIcon
                        icon={faTimes}/> Cancel</Button>
                    <Button variant="danger" onClick={handlePostDeletion}><FontAwesomeIcon
                        icon={faExclamationTriangle}/> Yes</Button>
                </Modal.Footer>
            </Modal>

            <Modal show={showTripModal} onHide={() => setShowTripModal(false)}>
                <Modal.Header><strong>{tripToDelete?.name}</strong></Modal.Header>
                <Modal.Body>
                    Are you sure you want to delete this trip?
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={e => setShowTripModal(false)}><FontAwesomeIcon
                        icon={faTimes}/> Cancel</Button>
                    <Button variant="danger" onClick={handleTripDeletion}><FontAwesomeIcon
                        icon={faExclamationTriangle}/> Yes</Button>
                </Modal.Footer>
            </Modal>


        </Container>
    )
}

export default Dashboard;
