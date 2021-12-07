import moment from 'moment';
import {NavLink} from 'react-router-dom';
import ListGroup from 'react-bootstrap/ListGroup';
import {useSelector} from 'react-redux';
import {RootState} from '../../store';


const PostSummary = ({post}: any) => {

    const activePost = useSelector((state: RootState) => state.post);

    return (
        <ListGroup.Item as={NavLink} to={'/post/' + post.id} active={activePost.post && (post.id === activePost.post.id)}>
            <div className="d-flex w-100 justify-content-between">
                <h5 className="mb-1">{post.title}</h5>
                <small>{moment.unix(post.created_at.seconds).format('MMMM Do YYYY')}</small>
            </div>
            <p className="mb-1">{post.subtitle}</p>
            <small>(todo) comments</small>
        </ListGroup.Item>
    )
}

export default PostSummary;
