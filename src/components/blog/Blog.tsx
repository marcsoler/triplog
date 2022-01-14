import {FC, useEffect, useState} from 'react';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

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

    const [relatedPosts, setRelatedPosts] = useState<Post[]>([]);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getPostBySlug(postId));
        dispatch(getPosts());
    }, [dispatch, postId]);

    const {post} = usePostSelector();
    const {posts} = usePostsSelector();

    useEffect(() => {
        if(posts && post) {
            setRelatedPosts(posts.filter((p) => {
                return p.trip === post.trip;
            }));
        }
    }, [post, posts]);

    return (
        <Container className="blog content">
            <Row>
                <Col as="article" className="article" xs={12} md={relatedPosts ? 8 : 12}>
                    {post && <BlogArticle {...post} />}
                </Col>
                {post && relatedPosts && (
                    <Col as="aside" className="blog-aside" md={4}>
                        <div className="related-posts sticky-md-top">
                            {relatedPosts.map((p) => {
                                return (
                                    <RelatedPost key={p.slug} {...p} />
                                )
                            })}
                        </div>
                    </Col>
                )}
            </Row>
        </Container>
    )
}


export default Blog;
