import Post from './Post';
import PostList from './PostList';
import Map from './Map';

type BlogProps = {
    id: number,
}

const Blog = (props: any) => {
    const id = props.match.params.id;
    console.log('ID: #' + id);
    return (
        <>
            <div className="container">
                <div className="row">
                    <article className="col-8">
                        <Post id={id} />
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
