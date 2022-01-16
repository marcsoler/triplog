import {FC} from 'react';
import {RouteComponentProps} from 'react-router-dom';
import PostForm from './PostForm';


const EditPost: FC<RouteComponentProps<{ slug: string }>> = (props) => {

    const slug = props.match.params.slug;
    return (
        <PostForm slug={slug}/>
    )
}

export default EditPost;
