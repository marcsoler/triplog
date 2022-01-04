import {FC, useEffect, useState} from 'react';
import useAuthSelector from '../../../hooks/useAuthSelector';
import {SubmitHandler, useForm} from 'react-hook-form';
import {Button, FloatingLabel, Form, Modal} from 'react-bootstrap';
import usePostSelector from '../../../hooks/usePostSelector';
import {useDispatch} from 'react-redux';
import {storeComment} from '../../../store/actions/commentActions';
import {Comment} from '../../../store/types';

type CommentFormInputs = {
    comment: string,
}


const CommentForm: FC = () => {

    const {authenticated, user} = useAuthSelector();

    const {register, handleSubmit, reset} = useForm<CommentFormInputs>({
        defaultValues: {
            comment: '',
        }
    });

    const {post} = usePostSelector();
    const dispatch = useDispatch();

    useEffect(() => {
        return () => {
            reset();
        };
    }, [post, reset]);



    const onSubmit: SubmitHandler<CommentFormInputs> = (data) => {
        const comment: Comment = {
            comment: data.comment,
            user: authenticated ? user : undefined,
            post_id: post!.id!,
            reactions: [],
        }

        dispatch(storeComment(comment));


    }

    const [showModal, setShowModal] = useState(false);


    return (
        <>
            <p>Comments</p>

            <Form onSubmit={handleSubmit(onSubmit)}>
                <FloatingLabel controlId="comment" label="Leave a comment here">
                    <Form.Control
                        as="textarea"
                        placeholder="Leave a comment here"
                        style={{height: '100px'}}
                        {...register('comment', {required: true})}
                    />
                </FloatingLabel>
                <Button variant="primary" type="submit">Submit</Button>
            </Form>

            <Modal show={showModal} onHide={() => setShowModal(false)}>
                <Modal.Header>Are you a robot?</Modal.Header>
                <Modal.Body>

                </Modal.Body>
            </Modal>

        </>
    )
}

export default CommentForm;
