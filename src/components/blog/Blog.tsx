import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import {FC, useEffect} from 'react';

import BlogArticle from './BlogArticle';
import PostList from './PostList';

import {useDispatch} from 'react-redux';
import {RouteComponentProps} from 'react-router-dom';
import {getPostById, getLatestPost, getPosts} from '../../store/actions/postActions';
import usePostSelector from '../../hooks/usePostSelector';
import usePostsSelector from '../../hooks/usePostsSelector';


const Blog: FC<RouteComponentProps<{ id: string }>> = (props) => {

    const postId = props.match.params.id;

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getPostById(postId));
        dispatch(getPosts());
    }, [dispatch, postId]);

    const {post} = usePostSelector();
    const {posts} = usePostsSelector();

    const relatedPosts = posts?.filter((p) => {
        return p.trip === post?.trip;
    })

    return (
            <Container className="blog content">
                <Row>
                    <Col as="article" md={8}>
                        {post && <BlogArticle {...post} />}
                    </Col>
                    {relatedPosts && (
                        <Col as="aside" md={4}>
                            {relatedPosts && <PostList posts={relatedPosts}/>}
                        </Col>
                    )}
                </Row>
            </Container>
    )
}


export default Blog;
