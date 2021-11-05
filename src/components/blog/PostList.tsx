import ListGroup from 'react-bootstrap/ListGroup';

import PostSummary from './PostSummary';

const PostList = ({posts}: any) => {
    return (
        <ListGroup>
            {posts && posts.map((post: any) => {
                return(<PostSummary key={post.id} post={post} />)
            })}
        </ListGroup>
    )
}

export default PostList;
