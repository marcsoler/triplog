import Post from './layout/blog/Post';
import PostList from './layout/blog/PostList';

const Blog = () => {
    return (
        <>
            <div className="container">
                <div className="row">
                    <article className="col-8">
                        <Post/>
                    </article>
                    <aside className="col-4">
                        <PostList/>
                    </aside>
                </div>
            </div>
            <div className="map">
                <h3>Map comes here</h3>
            </div>
        </>
    )
}

export default Blog;
