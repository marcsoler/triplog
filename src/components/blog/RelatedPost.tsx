import moment from 'moment';
import {NavLink} from 'react-router-dom';
import ListGroup from 'react-bootstrap/ListGroup';
import usePostSelector from '../../hooks/usePostSelector';

const RelatedPost = ({post}: any) => {

    const activePost = usePostSelector();

    return (
        <ListGroup variant="flush" className="related-post">
            <ListGroup.Item as={NavLink} to={'/post/' + post.id} active={activePost.post && (post.id === activePost.post.id)}>
                <div className="d-flex w-100 justify-content-between">
                    <h5 className="mb-1">{post.title}</h5>
                    <small>{moment.unix(post.created_at.seconds).format('MMMM Do YYYY')}</small>
                </div>
                <small className="comment-count">(todo) comments</small>
            </ListGroup.Item>
        </ListGroup>

    )
}

export default RelatedPost;
