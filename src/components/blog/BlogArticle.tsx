import {FC} from 'react';
import moment from 'moment/moment';

import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faEdit} from '@fortawesome/free-solid-svg-icons';

import Comments from './comments/Comments';
import CommentForm from './comments/CommentForm';
import Map from './Map';

import {Post} from '../../store/types';
import useAuthSelector from '../../hooks/useAuthSelector';
import {Link} from 'react-router-dom';

export interface PostProps {
    post: Post
}

const BlogArticle: FC<Post> = (post) => {

    const {user} = useAuthSelector();

    return (
        <>
            <article>
                <Row>
                    <Col>
                        <h1>{post.title}</h1>
                        {post.subtitle && <h2 className="lead">{post.subtitle}</h2>}
                        <p><small>Posted on {moment.unix(post.created_at!.seconds).format('MMMM Do YYYY')}{ post.updated_at && ', edited'}</small></p>
                    </Col>
                    {user && user.admin && (
                        <Col xs={2}>
                            <div className="d-grip gap-0">
                            <Link to={`/dashboard/post/edit/${post.id}`}>
                                <Button variant="outline-primary" size="sm">
                                    <FontAwesomeIcon icon={faEdit} /> Edit
                                </Button>
                            </Link>
                            </div>
                        </Col>
                    )}
                </Row>



                <div dangerouslySetInnerHTML={{ __html: post.content }} />

            </article>

            <Map />

            <Comments/>

            <CommentForm/>

        </>
    )
}

export default BlogArticle;
