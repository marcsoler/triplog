import Post from './Post';
import PostList from './PostList';
import Map from './Map';
import {connect} from 'react-redux';


const Blog = (props: any) => {
    console.log(props);
    const id = props.match.params.id ? props.match.params.id : 1; //Todo: get latest post if none defined



    return (
        <>
            <div className="container">
                <div className="row">
                    <article className="col-8">
                        <Post id={id}/>
                    </article>
                    <aside className="col-4">
                        <h4>Recent posts</h4>
                        <PostList posts={props.posts}/>
                    </aside>
                </div>
            </div>
            <div className="map">
                <Map/>
            </div>
        </>
    )
}


export default Blog;
