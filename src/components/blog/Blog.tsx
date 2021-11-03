import {FC, useEffect} from 'react';

import Post from './Post';
import PostList from './PostList';
import Map from './Map';

import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../../store';
import {RouteComponentProps} from 'react-router-dom';
import {getPostById, getLatestPost} from '../../store/actions/postActions';


const Blog: FC<RouteComponentProps<{ id?: string }>> = (props) => {

    const postId = props.match.params.id;

    const dispatch = useDispatch();

    useEffect(() => {
        if (postId) {
            dispatch(getPostById(postId));
        } else {
            dispatch(getLatestPost());
        }
    }, [dispatch, postId]);

    const {post} = useSelector((state: RootState) => state.post);


    return (
        <>
            <div className="container">
                <div className="row">
                    <article className="col-8">
                        <Post post={post}/>
                    </article>
                    <aside className="col-4">
                        <h4>Recent posts</h4>
                        <PostList/>
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
