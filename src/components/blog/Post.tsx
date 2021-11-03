const Post = ({post}: any) => {
  return (

      <article>
          <pre>
              <code>{JSON.stringify(post)}</code>
          </pre>
          <h2>{post.title}</h2>
          <p><small>Posted on {post.created_at.seconds}</small></p>
          { post.content }
      </article>
  )
}

export default Post;
