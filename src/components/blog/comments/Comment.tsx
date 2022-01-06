import React, {FC} from 'react';
import {Comment as CommentType} from '../../../store/types';
import {Row, Col} from 'react-bootstrap';
import moment from 'moment/moment';
import ReactionButton from './ReactionButton';
import CommentText from './CommentText';


interface CommentProps {
    key: string;
    comment: CommentType;
}

const Comment: FC<CommentProps> = ({comment}) => {

    const metaStyle = {
        display: 'flex',
        justifyContent: 'space-between',
    }

    return (
        <article className="comment mb-3">
            <Row>
                <Col xs={2} md={1} className="reactions">
                    <ReactionButton {...comment} />
                </Col>
                <Col xs={10} md={11}>
                    <div style={metaStyle}>
                        <h5>{comment.user ? comment.user.firstname : 'Anonymous'}</h5>
                        <p><small>{moment.unix(comment.created_at!.seconds).format('MMMM Do YYYY')}</small></p>
                    </div>


                    <CommentText {...comment} />
                </Col>
            </Row>
        </article>
    )
}

export default Comment;
