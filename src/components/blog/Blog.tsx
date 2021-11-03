import {FC, useEffect, useState} from 'react';

import Post from './Post';
import PostList from './PostList';
import Map from './Map';

import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../../store';
import {RouteComponentProps} from 'react-router-dom';
import {getPostById, getLatestPost} from '../../store/actions/postActions';
import {setLoading} from '../../store/actions/authActions';



const Blog: FC<RouteComponentProps<{ id?: string}>> = (props) => {

    const postId = props.match.params.id;

    const [post, setPost] = useState(null);
    const dispatch = useDispatch();

    // if postId
    // getPostById
    // else
    // getLatestPost

    useEffect(() => {
        if(postId) {
            dispatch(getPostById(postId));
        } else {
            dispatch(getLatestPost());
        }
    }, [dispatch, postId]);



    return (
        <>
            <div className="container">
                <div className="row">
                    <article className="col-8">
                        <Post post={post} />
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
