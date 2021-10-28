import PostSummary from './PostSummary';

const PostList = ({posts}: any) => {

    console.log(posts);

    return (
        <div className="list-group">
            {posts && posts.map((post: any) => {
                return(<PostSummary key={post.id} post={post} />)
            })}
        </div>
    )
}

export default PostList;
