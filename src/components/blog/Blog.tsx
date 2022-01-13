import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import {FC, useEffect} from 'react';

import BlogArticle from './BlogArticle';
import RelatedPost from './RelatedPost';

import {useDispatch} from 'react-redux';
import {RouteComponentProps} from 'react-router-dom';
import {getPostBySlug, getPosts} from '../../store/actions/postActions';
import usePostSelector from '../../hooks/usePostSelector';
import usePostsSelector from '../../hooks/usePostsSelector';
import {Post} from '../../store/types';


const Blog: FC<RouteComponentProps<{ id: string }>> = (props) => {

    const postId = props.match.params.id;

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getPostBySlug(postId));
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
                <Col as="article" className="article" xs={12} md={relatedPosts ? 8 : 12}>
                    {post && <BlogArticle {...post} />}
                </Col>
                {relatedPosts && (
                    <Col as="aside" className="blog-aside" md={4}>
                        <div className="related-posts sticky-md-top">
                            {relatedPosts.map((post: Post) => {
                                return (<RelatedPost key={post.slug} post={post}/>)
                            })}
                        </div>
                    </Col>
                )}
            </Row>
        </Container>
    )
}


export default Blog;
