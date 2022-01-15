import {FC, useEffect} from 'react';
import useAuthSelector from '../../../hooks/useAuthSelector';
import {SubmitHandler, useForm} from 'react-hook-form';
import {Button, FloatingLabel, Form} from 'react-bootstrap';
import usePostSelector from '../../../hooks/usePostSelector';
import {useDispatch} from 'react-redux';
import {storeComment} from '../../../store/actions/commentActions';
import {ICommentFormData} from '../../../store/types';

const CommentForm: FC = () => {

    const {user} = useAuthSelector();
    const {post} = usePostSelector();
    const dispatch = useDispatch();

    const {register, handleSubmit, reset} = useForm();

    useEffect(() => {
        return () => {
            reset();
        };
    }, [post, reset]);

    const onSubmit: SubmitHandler<ICommentFormData> = (data) => {
        if(post) {
            dispatch(storeComment({...data, user, post_id: post.slug}));
        }

    }

    return (
        <Form onSubmit={handleSubmit(onSubmit)}>
            <FloatingLabel controlId="text" label="Leave a comment here">
                <Form.Control
                    as="textarea"
                    placeholder="Leave a comment here"
                    style={{height: '100px'}}
                    {...register('text', {required: true})}
                />
            </FloatingLabel>
            <Button variant="primary" type="submit">Submit</Button>
        </Form>
    )
}

export default CommentForm;
