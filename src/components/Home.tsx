import {FC, useEffect, useRef, useState} from 'react';

import {Button, Col, Container, Row} from 'react-bootstrap';

import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faChevronDown, faMapMarkedAlt} from '@fortawesome/free-solid-svg-icons'

import {Link} from 'react-router-dom';

import TripTeaser from './trip/TripTeaser';

import {getPosts} from '../store/actions/postActions';
import {useDispatch} from 'react-redux';
import {getTrips} from '../store/actions/tripActions';
import useTripsSelector from '../hooks/useTripsSelector';
import moment from 'moment/moment';
import usePostsSelector from '../hooks/usePostsSelector';
import {Post, Trip} from '../store/types';


const Home: FC = () => {

    const dispatch = useDispatch();

    const [latestPost, setLatestPost] = useState<Post>();
    const [latestPostTrip, setLatestPostTrip] = useState<Trip>();
    const [otherTrips, setOtherTrips] = useState<Trip[]>();

    useEffect(() => {
        dispatch(getTrips());
        dispatch(getPosts());
    }, [dispatch]);

    const {posts} = usePostsSelector();
    const {trips} = useTripsSelector();

    useEffect(() => {
        if(posts && posts.length) {
            const post = posts[posts!.length-1]
            setLatestPost(post);
            if(trips && trips.length) {
                setLatestPostTrip(trips.find((t) => {
                    return t.id === post.trip;
                }));
                setOtherTrips(trips.filter((t) => {
                    return t.id !== post.trip;
                }))
            }
        }
    }, [posts, trips]);

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
                            {latestPost && (<Row>
                                <Col className="text-center mt-md-5">
                                    <FontAwesomeIcon icon={faChevronDown} size="2x" onClick={executeScroll}
                                                     style={{cursor: 'pointer'}}/>
                                </Col>
                            </Row>)
                            }
                        </Col>
                    </Row>
                </Container>
            </section>

            {latestPost && latestPostTrip && (
                <section className="content last-post" ref={articlesRef}>

                    <Container className="text-right">

                        <Row>
                            <Col>
                                <h2 className="color-darkcyan">Our latest article</h2>
                                <hr/>
                            </Col>
                        </Row>

                        <Row>

                            <Col md={6} sm={12}>
                                <article className="article-teaser">
                                    <h3 className="h1 article-title"><Link to={`/post/${latestPost.slug}`}>{latestPost.title}</Link></h3>
                                    <p><small>Posted on {moment.unix(latestPost.created_at!.seconds).format('MMMM Do YYYY')}{ latestPost.updated_at && ', edited'}</small></p>
                                    <p className="lead">{latestPost.subtitle}</p>
                                    <p><Button href={`/post/${latestPost.slug}`} variant="primary">Read more...</Button></p>
                                </article>
                            </Col>
                            <Col>
                                <TripTeaser {...latestPostTrip} />
                            </Col>
                        </Row>

                    </Container>
                </section>
            )}

            {otherTrips?.length && (
                <section className="content latest-trips">
                    <Container>
                        <Row>
                            <Col className="text-right">
                                <h2 className="color-darkcyan">Past trips</h2>
                                <hr/>
                            </Col>
                        </Row>
                        <Row xs={1} md={3} lg={7}>
                            {otherTrips.map((t) => {
                                return (
                                    <TripTeaser key={t.id} {...t} />
                                )
                            })}
                        </Row>
                    </Container>
                </section>
            )}

            {!latestPost && (

                <section className="content">
                    <Container>
                        <Row>
                            <Col className="text-center">
                                <p className="lead">No posts found! Try later again&hellip;</p>
                            </Col>
                        </Row>
                    </Container>
                </section>
            )}

        </div>
    )
}

export default Home;
