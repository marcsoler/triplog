import {useEffect, useRef} from 'react';

import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronDown } from '@fortawesome/free-solid-svg-icons'

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

    const articlesRef = useRef(null);

    // @ts-ignore
    const executeScroll = () => articlesRef.current.scrollIntoView();

    return <>
        <div className="home">
            <section className="teaser">
                <Container>
                    <Row style={{height: '100%'}} className="align-items-center">
                        <Col>
                            <Row>
                                <Col>
                                    <h1 className="display-1 handwrite text-center">Welcome to my blog</h1>
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <blockquote className="blockquote">
                                        <p className="lead mb-3">Lorem ipsum dolor sit amet, consectetur adipiscing
                                            elit. Integer posuere erat a ante.</p>
                                        <footer className="blockquote-footer">Someone famous in <cite
                                            title="Source Title">Source
                                            Title</cite></footer>
                                    </blockquote>
                                </Col>
                            </Row>
                            <Row>
                                <Col className="text-center mt-md-5">
                                    <FontAwesomeIcon icon={faChevronDown} size="2x" onClick={executeScroll} style={{cursor: 'pointer'}} />
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                </Container>
            </section>

            {post && (
                <section className="content last-post" ref={articlesRef}>

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
                </section>)}

            <section className="content latest-trips">

                <Container>
                    <Row>
                        <Col>
                            <h2>More trips</h2>
                        </Col>
                    </Row>
                    <Row>

                        <Row xs={1} md={3} lg={7}>

                            {trips && trips.filter((t) => {
                                return t.id !== post!.trip
                            }).map((t) => {
                                return (
                                    <TripTeaser key={t.id} {...t} />
                                )
                            })}

                        </Row>

                    </Row>
                </Container>


            </section>


        </div>
    </>
}

export default Home;
