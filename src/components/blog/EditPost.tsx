import {FC} from 'react';
import {RouteComponentProps} from 'react-router-dom';
//import {useDispatch} from 'react-redux';
//import {getPostById} from '../../store/actions/postActions';

const EditPost: FC<RouteComponentProps<{ id: string }>> = (props) => {

    const postId = props.match.params.id;

    //const dispatch = useDispatch();
    //dispatch(getPostById(postId));

    return <p>Edit {postId}</p>
}

export default EditPost;
