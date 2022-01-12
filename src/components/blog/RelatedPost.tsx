import {FC, useEffect, useState} from 'react';

import moment from 'moment';
import {NavLink} from 'react-router-dom';
import ListGroup from 'react-bootstrap/ListGroup';
import useCommentsSelector from '../../hooks/useCommentsSelector';
import {Post} from '../../store/types';
import {useDispatch} from 'react-redux';
import {getComments} from '../../store/actions/commentActions';

const RelatedPost: FC<Post> = (post: Post) => {

    const dispatch = useDispatch();

    const [commentsCount, setCommentsCount] = useState<number>(0);

    dispatch(getComments());

    const {comments} = useCommentsSelector();

    useEffect(() => {
        if(comments){
            setCommentsCount(comments.filter((c) => {
                return c.post_id === post.id;
            }).length);
        }
    }, [comments, post]);

    //active={activePost.post && (post.id === activePost.post.id)}


    return (
        <ListGroup variant="flush" className="related-post">
            <ListGroup.Item as={NavLink} to={'/post/' + post.id}>
                <div className="d-flex w-100 justify-content-between">
                    <h5 className="mb-1">{post.title}</h5>
                    <small>{moment.unix(post.created_at!.seconds).format('MMMM Do YYYY')}</small>
                </div>
                <small className="comment-count">{commentsCount} comments</small>
            </ListGroup.Item>
        </ListGroup>

    )
}

export default RelatedPost;
