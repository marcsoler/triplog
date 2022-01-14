import {FC, useEffect, useState} from 'react';

import moment from 'moment';
import {NavLink} from 'react-router-dom';
import ListGroup from 'react-bootstrap/ListGroup';
import {Post} from '../../store/types';
import useCommentsSelector from '../../hooks/useCommentsSelector';


const RelatedPost:FC<Post> = (post: Post) => {

    const [commentCount, setCommentCount] = useState<number>(0);

    const {comments} = useCommentsSelector();

    useEffect(() => {
        if(comments) {
            setCommentCount(comments.filter((c) => {
                return c.post_id === post.slug;
            }).length);
        }
    }, [comments, post]);


    return (
        <ListGroup variant="flush" className="related-post">
            <ListGroup.Item as={NavLink} to={'/post/' + post.slug}>
                <div className="d-flex w-100 justify-content-between">
                    <h5 className="mb-1">{post.title}</h5>
                    <small>{moment.unix(post.created_at.seconds).format('MMMM Do YYYY')}</small>
                </div>
                <small className="comment-count">{`${commentCount} ${commentCount === 1 ? 'comment' : 'comments'}`}</small>
            </ListGroup.Item>
        </ListGroup>

    )
}

export default RelatedPost;
