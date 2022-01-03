import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import {FC, useEffect} from 'react';

import Article from './Article';
import PostList from './PostList';
import Map from './Map';

import {useDispatch} from 'react-redux';
import {RouteComponentProps} from 'react-router-dom';
import {getPostById, getLatestPost, getPosts} from '../../store/actions/postActions';
import usePostSelector from '../../hooks/usePostSelector';
import usePostsSelector from '../../hooks/usePostsSelector';
import {getTripByPost} from '../../store/actions/tripActions';
import useTripSelector from '../../hooks/useTripSelector';



const Blog: FC<RouteComponentProps<{ id?: string }>> = (props) => {

    const postId = props.match.params.id;

    const dispatch = useDispatch();

    useEffect(() => {
        if (postId) {
            dispatch(getPostById(postId));
        } else {
            dispatch(getLatestPost());
        }
        dispatch(getPosts());
    }, [dispatch, postId]);

    const {post} = usePostSelector();
    const {posts} = usePostsSelector();

    return (
        <>
            <Container>
                <Row>
                    <Col as="article" md={8}>
                        { post && <Article {...post} /> }
                    </Col>
                    <Col as="aside" md={4}>
                        { posts && <PostList posts={posts} /> }
                    </Col>
                </Row>
            </Container>
            {post && (
                <div className="map">
                    {
                        <Map />
                    }
                </div>
            )}

        </>
    )
}


export default Blog;
