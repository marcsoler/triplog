import {FormEvent, useState} from 'react';
import {connect} from 'react-redux';
import { createPost} from '../../store/actions/postActions';

const CreatePost = (props: any) => {

    const [title, setTitle] = useState<string | null>(null);
    const [content, setContent] = useState<string | null>(null);

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();

        props.createPost({
            title,
            content,
        });

    }

    return (

        <div className="row justify-content-center">
            <div className="col-sm-12 col-md-10 col-lg-8">

                <h3>Create new Post</h3>

                <form onSubmit={handleSubmit}>

                    <div className="row g-3">
                        <div className="col-12">
                            <label htmlFor="title" className="form-label">Title</label>
                            <input type="text" className="form-control" id="title" required
                                   onChange={(e) => setTitle(e.target.value)}/>
                        </div>
                        <div className="col-12">
                            <label htmlFor="content" className="form-label">Content</label>
                            <textarea id="content" className="form-control"
                                      onChange={(e) => setContent(e.target.value)}/>
                        </div>
                    </div>

                    <hr className="my-4"/>

                    <button className="w-100 btn btn-primary btn-lg" type="submit">Post</button>

                </form>
            </div>
        </div>
    )
}

const mapDispatchToProps = (dispatch: any) => {
    return {
        createPost: (post: any) => dispatch(createPost(post))
    }
}

export default connect(null, mapDispatchToProps)(CreatePost);
