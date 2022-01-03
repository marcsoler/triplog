import {FC, useState, useEffect} from 'react';
import {useDispatch} from 'react-redux';

//import {setSuccess} from '../../store/actions/authActions';
import {deletePost, getPosts} from '../../store/actions/postActions';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Modal from 'react-bootstrap/Modal';
import Row from 'react-bootstrap/Row';
import Table from 'react-bootstrap/Table';

import moment from 'moment';
import usePostsSelector from '../../hooks/usePostsSelector';
import useTripsSelector from '../../hooks/useTripsSelector';
import {getTrips} from '../../store/actions/tripActions';
import {Trip} from '../../store/types';

const Dashboard: FC = () => {

    const {posts} = usePostsSelector();
    const {trips} = useTripsSelector();

    const dispatch = useDispatch();
    const [postToDelete, setPostToDelete] = useState<any>(null);

    const promptPostDeletion = (postId: string) => {
        setPostToDelete(posts?.find((post) => post.id === postId));
        setShowModal(true);
        return;
    }

    const handlePostDeletion = () => {
        dispatch(deletePost(postToDelete.id));
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


    return (
        <Container>
            <h1>Dashboard</h1>

            <h3>Posts</h3>

            {posts &&
                <Table hover>
                    <caption>Posts</caption>
                    <thead>
                    <tr>
                        <th scope="col">Title</th>
                        <th scope="col">Created</th>
                        <th scope="col">Last updated</th>
                        <th scope="col">Actions</th>
                    </tr>

                    </thead>
                    <tbody>

                    {
                        posts.map((p) => {
                            return (<tr key={p.id}>
                                <td>{p.title}</td>
                                <td>{p.created_at && moment.unix(p.created_at.seconds).format('DD.MM.YYYY')}</td>
                                <td>{p.updated_at ? moment.unix(p.updated_at.seconds).format('DD.MM.YYYY') : 'Never'}</td>
                                <td>
                                    <ButtonGroup size="sm" aria-label={`Actions for post ${p.title}`}>
                                        <Button href={`/post/${p.id}`} variant="primary">View</Button>
                                        <Button href={`/dashboard/post/edit/${p.id}`} variant="secondary">Edit</Button>
                                        <Button variant="danger"
                                                onClick={(e) => promptPostDeletion(p.id!)}>Delete</Button>
                                    </ButtonGroup>
                                </td>
                            </tr>)
                        })}
                    </tbody>
                </Table>}

            <h3>Trips</h3>
            <Row xs={1} md={3} lg={7}>
                {trips && trips.map((trip) => {
                    return (
                        <Col key={trip.id}>
                            <Card>
                                <Card.Header>{trip.name}</Card.Header>
                                <Card.Img variant="top" src={staticMapSrc(trip)}/>
                                <Card.Body>


                                    <p><strong>Distance:</strong> x KM</p>
                                    <p><strong>Approx. travel time:</strong> x hours</p>


                                    <Card.Link href="#">Edit</Card.Link>
                                    <Card.Link href="#">Delete</Card.Link>
                                </Card.Body>

                            </Card>
                        </Col>
                    );
                })}
            </Row>

            <Modal show={showModal} onHide={() => setShowModal(false)}>
                <Modal.Header>{postToDelete?.title}</Modal.Header>
                <Modal.Body>
                    Are you sure you want to delete this post?
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={e => setShowModal(false)}>Cancel</Button>
                    <Button variant="danger" onClick={handlePostDeletion}>Yes</Button>
                </Modal.Footer>
            </Modal>


        </Container>
    )
}

export default Dashboard;
