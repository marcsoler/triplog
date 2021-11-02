import {FC} from 'react';

import Post from './Post';
import PostList from './PostList';
import Map from './Map';

import { useSelector } from 'react-redux';
import {RootState} from '../../store';


const Blog: FC = () => {

    const { posts } = useSelector((state: RootState) => state.posts);

    return (
        <>
            <div className="container">
                <div className="row">
                    <article className="col-8">
                        <Post />
                    </article>
                    <aside className="col-4">
                        <h4>Recent posts</h4>
                        <PostList />
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
