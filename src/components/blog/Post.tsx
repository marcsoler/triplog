import moment from 'moment/moment';

const Post = ({post}: any) => {
  return (

      <article>
          <pre>
              <code>{JSON.stringify(post)}</code>
          </pre>
          <h2>{post.title}</h2>
          <p><small>Posted on {moment.unix(post.created_at.seconds).format('MMMM Do YYYY, h:mm:ss a')}</small></p>
          { post.content }
      </article>
  )
}

export default Post;
