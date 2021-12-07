import moment from 'moment/moment';
import ReactMarkdown from 'react-markdown';

export interface PostProps {
    post: {
        id: string;
        title: string;
        subtitle?: string;
        content: string;
        created_at: {
            seconds: number;
            nanoseconds: number;
        },
    }
}

const Post = ({post: {id, title, created_at, content, subtitle}}: PostProps) => {
    return (
        <article>
            <h2>{title}</h2>
            <p><small>Posted on {moment.unix(created_at.seconds).format('MMMM Do YYYY, h:mm:ss a')}</small></p>
            {subtitle && <p className="lead">{subtitle}</p> }
            <ReactMarkdown>{content}</ReactMarkdown>
        </article>
    )
}

export default Post;
