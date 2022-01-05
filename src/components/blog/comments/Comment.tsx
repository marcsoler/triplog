import React, {FC} from 'react';
import {Comment as CommentType} from '../../../store/types';
import {Row, Col} from 'react-bootstrap';
import ReactionButton from './ReactionButton';
import CommentText from './CommentText';


interface CommentProps {
    key: string;
    comment: CommentType;
}

const Comment: FC<CommentProps> = ({comment}) => {


    return (
        <article className="comment mb-3">
            <Row>
                <Col xs={2} md={1} className="reactions">
                    <ReactionButton {...comment} />
                </Col>
                <Col xs={10} md={11}>
                    <h5>{comment.user ? comment.user.firstname : 'Anonymous'}</h5>
                    <CommentText {...comment} />
                </Col>
            </Row>
        </article>
    )
}

export default Comment;
