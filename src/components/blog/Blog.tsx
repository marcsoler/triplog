import Post from './Post';
import PostList from './PostList';
import Map from './Map';
import {RouteComponentProps} from 'react-router-dom';

type BlogParams = {
    id?: string,
}

const Blog = ({match}: RouteComponentProps<BlogParams>) => {
    const id = match.params.id ? match.params.id : 1; //Todo: get latest post if none defined
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
