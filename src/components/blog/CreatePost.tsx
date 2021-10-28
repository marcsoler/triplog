import {FormEvent} from 'react';

const CreatePost = () => {

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();

        console.log(e);

    }

    return (

        <div className="row justify-content-center">
            <div className="col-sm-12 col-md-10 col-lg-8">
                <form onSubmit={handleSubmit}>

                    <div className="row g-3">
                        <div className="col-12">
                            <label htmlFor="title" className="form-label">Title</label>
                            <input type="text" className="form-control" id="title" required/>
                        </div>
                        <div className="col-12">
                            <label htmlFor="content" className="form-label">Content</label>
                            <textarea id="content" className="form-control"/>
                        </div>
                    </div>

                </form>
            </div>
        </div>
    )
}

export default CreatePost;
