import {FC} from 'react';
import moment from 'moment/moment';

import {Button, Col, Row} from 'react-bootstrap';

import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faEdit} from '@fortawesome/free-solid-svg-icons';

import CommentList from './comments/CommentList';
import CommentForm from './comments/CommentForm';
import BlogMap from '../trip/BlogMap';

import {Post} from '../../store/types';
import useAuthSelector from '../../hooks/useAuthSelector';
import {Link} from 'react-router-dom';

export interface PostProps {
    post: Post
}

const BlogArticle: FC<Post> = (post) => {

    const {user} = useAuthSelector();

    return (
            <article className="blog-article">

                <Row>
                    <Col>
                        <Row>
                            <Col>
                                <h1 className="mb-5">{post.title}</h1>
                            </Col>
                            {user && user.admin && (
                                <Col xs={2} className="text-end">
                                    <Link to={`/dashboard/post/edit/${post.slug}`}>
                                        <Button variant="outline-primary" size="sm">
                                            <FontAwesomeIcon icon={faEdit} /> Edit
                                        </Button>
                                    </Link>
                                </Col>
                            )}
                        </Row>
                        <BlogMap />
                        <p className="article-date"><small>Posted on {moment.unix(post.created_at!.seconds).format('MMMM Do YYYY')}{ post.updated_at && ', edited'}</small></p>
                        {post.subtitle && <h2 className="lead">{post.subtitle}</h2>}
                    </Col>
                </Row>
                <div dangerouslySetInnerHTML={{ __html: post.content }} />

                <CommentList/>

                <CommentForm/>

            </article>
    )
}

export default BlogArticle;
