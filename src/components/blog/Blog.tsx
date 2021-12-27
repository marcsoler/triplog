import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import {FC, useEffect} from 'react';

import Post from './Post';
import PostList from './PostList';
import Map from './Map';

import {useDispatch} from 'react-redux';
import {RouteComponentProps} from 'react-router-dom';
import {getPostById, getLatestPost, getPosts} from '../../store/actions/postActions';
import usePostSelector from '../../hooks/usePostSelector';
import usePostsSelector from '../../hooks/usePostsSelector';



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
                        { post && <Post post={post} /> }
                    </Col>
                    <Col as="aside" md={4}>
                        { posts && <PostList posts={posts} /> }
                    </Col>
                </Row>
            </Container>
            <div className="map">
                {
                    //pseudo code:
                    //post && <Map route={post.routeId} progress={post.progress} />
                    post && <Map />
                }
            </div>
        </>
    )
}


export default Blog;
