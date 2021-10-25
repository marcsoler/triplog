import Post from './Post';
import PostList from './PostList';
import Map from './Map';

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
                <Map />
            </div>
        </>
    )
}

export default Blog;
