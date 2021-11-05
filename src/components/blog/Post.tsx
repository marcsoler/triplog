import moment from 'moment/moment';

interface PostProps {
    post: {
        id: string;
        title: string;
        content: string;
        created_at: {
            seconds: number;
            nanoseconds: number;
        },
    }
}

const Post = ({post: {id, title, created_at, content}}: PostProps) => {
  return (

      <article>
          <h2>{title}</h2>
          <p><small>Posted on {moment.unix(created_at.seconds).format('MMMM Do YYYY, h:mm:ss a')}</small></p>
          { content }
      </article>
  )
}

export default Post;
