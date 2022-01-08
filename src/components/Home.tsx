import {useEffect, useRef} from 'react';

import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faChevronDown, faMapMarkedAlt} from '@fortawesome/free-solid-svg-icons'

import {Link} from 'react-router-dom';

import TripTeaser from './TripTeaser';

import {getLatestPost, getPosts} from '../store/actions/postActions';
import {useDispatch} from 'react-redux';
import usePostSelector from '../hooks/usePostSelector';
import {getTrips} from '../store/actions/tripActions';
import useTripsSelector from '../hooks/useTripsSelector';
import moment from 'moment/moment';


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

    const articlesRef = useRef<HTMLElement | null>(null);

    const executeScroll = () => {
        if (articlesRef) {
            articlesRef.current?.scrollIntoView();
        }

    };

    return (
        <div className="home">
            <section className="teaser">
                <Container>
                    <Row style={{height: '100%'}} className="align-items-center">
                        <Col xs={12}>
                            <Row>
                                <Col className="text-center mb-3">
                                    <h1 className="display-1 handwrite mt-3 fade-in">Where am I?</h1>
                                    <FontAwesomeIcon icon={faMapMarkedAlt} size="8x" className="mb-3" />
                                    <h2>Welcome to my Triplog</h2>
                                    <blockquote className="blockquote mt-3">
                                        <p className="lead mb-3">Life is either a daring adventure or nothing at all</p>
                                        <footer className="blockquote-footer">Helen Keller</footer>
                                    </blockquote>
                                </Col>
                            </Row>
                            <Row>
                                <Col className="text-center mt-md-5">
                                    <FontAwesomeIcon icon={faChevronDown} size="2x" onClick={executeScroll}
                                                     style={{cursor: 'pointer'}}/>
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                </Container>
            </section>

            {post && postTrip && (
                <section className="content last-post" ref={articlesRef}>

                    <Container className="text-right">

                        <Row>
                            <Col>
                                <h2>Our latest article</h2>
                                <hr/>
                            </Col>
                        </Row>

                        <Row>

                            <Col lg={8} md={6} sm={12}>
                                <article className="article-teaser">
                                    <h3 className="h1 article-title"><Link to={`/post/${post.id}`}>{post.title}</Link></h3>
                                    <p><small>Posted on {moment.unix(post.created_at!.seconds).format('MMMM Do YYYY')}{ post.updated_at && ', edited'}</small></p>
                                    <p className="lead">{post.subtitle}</p>
                                    <p><Button href={`/post/${post.id}`} variant="primary">Read more...</Button></p>
                                </article>
                            </Col>
                            <Col lg={4} md={6} sm={12}>
                                <TripTeaser {...postTrip} />
                            </Col>
                        </Row>

                    </Container>
                </section>
            )}

            <section className="content latest-trips">
                <Container>
                    <Row>
                        <Col className="text-right">
                            <h2>Past trips</h2>
                            <hr/>
                        </Col>
                    </Row>
                    <Row xs={1} md={3} lg={7}>
                        {trips && trips.filter((t) => {
                            return t.id !== post!.trip
                        }).map((t) => {
                            return (
                                <TripTeaser key={t.id} {...t} />
                            )
                        })}
                    </Row>
                </Container>
            </section>
        </div>
    )
}

export default Home;
