import {NavLink} from 'react-router-dom';


const PostSummary = ({post}: any) => {
    return (
        <NavLink to={'/post/' + post.id} className="list-group-item list-group-item-action">
            <div className="d-flex w-100 justify-content-between">
                <h5 className="mb-1">{post.title}</h5>
                <small>{post.created_at}</small>
            </div>
            <p className="mb-1">Some placeholder content in a paragraph.</p>
            <small>x comments</small>
        </NavLink>
    )
}

export default PostSummary;
