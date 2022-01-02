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

    const {register, formState: {errors}, handleSubmit, setValue, getValues, reset} = useForm<CommentFormInputs>({
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
        console.log(data);


        let displayName;
        if(authenticated) {
            console.log('user', user);
            displayName = user?.firstname ? user.firstname : 'Anonymous';
        } else {
            console.log('todo: show popup');
            displayName = 'Anonymous';
        }

        console.log(displayName, data.comment, post);

        const comment: Comment = {
            comment: data.comment,
            user_id: authenticated ? user?.id : undefined,
            post_id: post!.id,
        }

        console.log('storing comment...', comment);
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
