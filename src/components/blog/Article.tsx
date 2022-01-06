import {FC} from 'react';
import moment from 'moment/moment';
import ReactMarkdown from 'react-markdown';

import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faEdit} from '@fortawesome/free-solid-svg-icons';

import Comments from './comments/Comments';
import CommentForm from './comments/CommentForm';

import {Post} from '../../store/types';
import useAuthSelector from '../../hooks/useAuthSelector';
import Button from 'react-bootstrap/Button';
import {Link} from 'react-router-dom';

export interface PostProps {
    post: Post
}

const Article: FC<Post> = (post) => {

    const {user} = useAuthSelector();

    return (
        <>
            <article>
                <Row>
                    <Col>
                        <h2>{post.title}</h2>
                        <p><small>Posted on {moment.unix(post.created_at!.seconds).format('MMMM Do YYYY, h:mm:ss a')}</small></p>
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


                {post.subtitle && <p className="lead">{post.subtitle}</p>}
                {post.content}

            </article>

            <Comments/>

            <CommentForm/>

        </>
    )
}

export default Article;
