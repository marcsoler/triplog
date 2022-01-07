import {useEffect} from 'react';

import './Home.scss';

import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import TripTeaser from './TripTeaser';

import {getLatestPost, getPosts} from '../store/actions/postActions';
import {useDispatch} from 'react-redux';
import usePostSelector from '../hooks/usePostSelector';
import {getTrips} from '../store/actions/tripActions';
import useTripsSelector from '../hooks/useTripsSelector';


const Home = () => {

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getLatestPost());
        dispatch(getTrips());
        dispatch(getPosts());
    }, [dispatch]);

    const {post} = usePostSelector();
    const {trips} = useTripsSelector();

    const postTrip = trips!.find((t) => {
        return t.id === post?.trip
    });

    return <>
        <div className="home">
            <div className="teaser">
                <Container>
                    <Row>
                        <Col>
                            <h1>Welcome to my blog</h1>
                        </Col>
                    </Row>
                </Container>
            </div>

            {post && (
                <div className="last-post">

                    <Container>
                        <Row>

                            <Col lg={8} md={6} sm={12}>
                                <h2>Our latest article from Iceland</h2>
                                <h3>{post.title}</h3>
                                <p className="lead">{post.subtitle}</p>
                                <p><Button href={`/post/${post.id}`} variant="primary">Read</Button></p>

                            </Col>
                            <Col lg={4} md={6} sm={12}>
                                <TripTeaser {...postTrip} />
                            </Col>
                        </Row>

                    </Container>
                </div>)}

            <div className="latest-trips">

                <Container>
                    <Row>
                        <Col>
                            <h2>More trips</h2>
                        </Col>
                    </Row>
                    <Row>

                        <Row xs={1} md={3} lg={7}>

                            {trips && trips.filter((t) => { return t.id !== post!.trip}).map((t) => {
                                return (
                                    <TripTeaser key={t.id} {...t} />
                                )
                            }) }

                        </Row>

                    </Row>
                </Container>


            </div>


        </div>
    </>
}

export default Home;
