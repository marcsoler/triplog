import {FC, useState, useEffect} from 'react';
import {useDispatch} from 'react-redux';

import {deletePost, getPosts} from '../../store/actions/postActions';

import Badge from 'react-bootstrap/Badge';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Modal from 'react-bootstrap/Modal';
import Row from 'react-bootstrap/Row';
import Table from 'react-bootstrap/Table';

import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faSearch} from '@fortawesome/free-solid-svg-icons/faSearch';
import {faEdit} from '@fortawesome/free-solid-svg-icons';
import {faTrash} from '@fortawesome/free-solid-svg-icons/faTrash';
import {faUndo} from '@fortawesome/free-solid-svg-icons/faUndo';
import {faTimes} from '@fortawesome/free-solid-svg-icons/faTimes';
import {faExclamationTriangle} from '@fortawesome/free-solid-svg-icons/faExclamationTriangle';

import moment from 'moment';
import usePostsSelector from '../../hooks/usePostsSelector';
import useTripsSelector from '../../hooks/useTripsSelector';
import {getTrips} from '../../store/actions/tripActions';
import {Post, Trip} from '../../store/types';
import Image from 'react-bootstrap/Image';
import {Link} from 'react-router-dom';

const Dashboard: FC = () => {

    const [tripFilter, setTripFilter] = useState<Trip | null>(null);
    const [filteredPosts, setFilteredPosts] = useState<Post[]>();
    const [postToDelete, setPostToDelete] = useState<Post>();

    const {posts} = usePostsSelector();
    const {trips} = useTripsSelector();

    const dispatch = useDispatch();


    const promptPostDeletion = (postId: string) => {
        const post = posts!.find((p) => {
            return p.id === postId;
        })
        setPostToDelete(post);
        setShowModal(true);
        return;
    }

    const handlePostDeletion = () => {
        if(postToDelete) {
            dispatch(deletePost(postToDelete));
        }
        setShowModal(false);
    }

    const staticMapSrc = (trip: Trip): string => {
        const start = trip.waypoints[0];
        const end = trip.waypoints[trip.waypoints.length - 1];
        // @ts-ignore
        return `https://maps.googleapis.com/maps/api/staticmap?autoscale=1&size=600x300&path=enc%3A${trip.polyline}&maptype=roadmap&key=${process.env.REACT_APP_MAPS_API_KEY ? process.env.REACT_APP_MAPS_API_KEY : ''}&format=png&visual_refresh=true&markers=size:mid%7C${start._lat},${start._long}&markers=size:mid%7C${end._lat},${end._long}`;
    }

    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        dispatch(getPosts());
        dispatch(getTrips());
    }, [dispatch]);

    const filterTable = (trip: Trip): void => {
        setTripFilter(trip);
    }

    const resetFilter = () => {
        setTripFilter(null);
    }

    useEffect(() => {
        if (tripFilter) {
            setFilteredPosts(posts?.filter((p) => {
                return p.trip === tripFilter.id;
            }))
        } else {
            setFilteredPosts(posts);
        }
    }, [tripFilter, posts]);


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
                            <td scope="col" colSpan={5}>No posts found!</td>
                        </tr>
                    )}

                    {
                        filteredPosts && filteredPosts.map((p) => {

                            return (<tr key={p.id}>
                                <td>
                                    {p.title} {(p.draft && <Badge bg="secondary">Draft</Badge>)}
                                </td>
                                <td>
                                    {
                                        trips!.find((t) => {
                                            return (t.id === p.trip)
                                        })!.name
                                    }
                                </td>
                                <td>{p.created_at && moment.unix(p.created_at.seconds).format('DD.MM.YYYY')}</td>
                                <td>{p.updated_at ? moment.unix(p.updated_at.seconds).format('DD.MM.YYYY') : 'Never'}</td>
                                <td>
                                    <ButtonGroup size="sm" aria-label={`Actions for post ${p.title}`}>
                                        <Link className="btn btn-outline-primary" role="button"
                                              to={`/post/${p.id}`}><FontAwesomeIcon
                                            icon={faSearch}/>View</Link>
                                        <Link className="btn btn-outline-secondary" role="button" to={`/post/edit/${p.id}`}><FontAwesomeIcon
                                            icon={faSearch}/> Edit</Link>
                                        <Button variant="outline-danger"
                                                onClick={(e) => promptPostDeletion(p.id!)}><FontAwesomeIcon
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


            <h2 className="color-darkcyan mt-5">Trips</h2>

            <Row xs={1} md={3} lg={7}>
                {trips && trips.map((trip) => {
                    return (
                        <Col key={trip.id}>

                            <div className="dashboard-trip mb-3" onClick={(e) => filterTable(trip)}>
                                <Image src={staticMapSrc(trip)} style={{maxWidth: '100%'}}/>
                                <div className="dashboard-trip-overlay">
                                    <div className="dashboard-trip-overlay-inner">
                                        <h3 className="dashboard-trip-name">{trip.name}</h3>
                                        <p className="text-white">Click to filter</p>
                                    </div>
                                </div>
                            </div>
                        </Col>
                    );
                })}
            </Row>

            <Modal show={showModal} onHide={() => setShowModal(false)}>
                <Modal.Header><strong>{postToDelete?.title}</strong></Modal.Header>
                <Modal.Body>
                    Are you sure you want to delete this post?
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={e => setShowModal(false)}><FontAwesomeIcon icon={faTimes} /> Cancel</Button>
                    <Button variant="danger" onClick={handlePostDeletion}><FontAwesomeIcon icon={faExclamationTriangle} /> Yes</Button>
                </Modal.Footer>
            </Modal>


        </Container>
    )
}

export default Dashboard;
