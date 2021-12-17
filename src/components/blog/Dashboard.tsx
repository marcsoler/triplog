import {FC, useState} from 'react';
import {useDispatch} from 'react-redux';

//import {setSuccess} from '../../store/actions/authActions';
import {deletePost} from '../../store/actions/postActions';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Container from 'react-bootstrap/Container';
import Modal from 'react-bootstrap/Modal';
import Table from 'react-bootstrap/Table';

import moment from 'moment';
import usePostsSelector from '../../hooks/usePostsSelector';

const Dashboard: FC = () => {

    const {posts} = usePostsSelector();

    const dispatch = useDispatch();
    const [postToDelete, setPostToDelete] = useState<any>(null);

    const promptPostDeletion = (postId: string) => {
        setPostToDelete(posts?.find((post) => post.id === postId));
        setShowModal(true);
        return;
    }

    const handlePostDeletion = () => {
        dispatch(deletePost(postToDelete.id));
        setShowModal(false);
    }

    const closeModal = () => {
        setShowModal(false);
    }

    const [showModal, setShowModal] = useState(false);

    return (
        <Container>
            <h1>Dashboard</h1>

            { posts &&
            <Table hover>
                <caption>Posts</caption>
                <thead>
                <tr>
                    <th scope="col">Post</th>
                    <th scope="col">Created</th>
                    <th scope="col">Actions</th>
                </tr>

                </thead>
                <tbody>

                {
                    // @ts-ignore
                    posts.map((p) => {
                        return (<tr key={p.id}>
                            <td>{p.title}</td>
                            <td>{moment.unix(p.created_at.seconds).format('DD.MM.YYYY')}</td>
                            <td>
                                <ButtonGroup size="sm" aria-label={`Actions for post ${p.title}`}>
                                    <Button href={'/post/' + p.id} variant="primary">View</Button>
                                    <Button variant="secondary">Edit</Button>
                                    <Button variant="danger" onClick={(e) => promptPostDeletion(p.id)}>Delete</Button>
                                </ButtonGroup>
                            </td>
                        </tr>)
                    })}
                </tbody>
            </Table> }

            <Modal show={showModal} onHide={closeModal}>
                <Modal.Header>{postToDelete?.title}</Modal.Header>
                <Modal.Body>
                    Are you sure you want to delete this post?
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={closeModal}>Cancel</Button>
                    <Button variant="danger" onClick={handlePostDeletion}>Yes</Button>
                </Modal.Footer>
            </Modal>


        </Container>
    )
}

export default Dashboard;
