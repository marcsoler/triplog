import { FC } from 'react';
import moment from 'moment/moment';
import ReactMarkdown from 'react-markdown';

import Comments from './comments/Comments';
import CommentForm from './comments/CommentForm';
import {Post} from '../../store/types';

export interface PostProps {
    post: Post
}

const Article: FC<Post> = (post) => {
    return (
        <>
            <article>
                <h2>{post.title}</h2>
                <p><small>Posted on {moment.unix(post.created_at!.seconds).format('MMMM Do YYYY, h:mm:ss a')}</small></p>
                {post.subtitle && <p className="lead">{post.subtitle}</p> }
                <ReactMarkdown>{post.content}</ReactMarkdown>
            </article>

            <Comments />

            <CommentForm />

        </>
    )
}

export default Article;
