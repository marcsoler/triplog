import {FC, useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';

import {setSuccess} from '../../store/actions/authActions';
import {RootState} from '../../store';
import {Container} from 'react-bootstrap';

const Dashboard: FC = () => {

    const {success} = useSelector((state: RootState) => state.auth);
    const {posts} = useSelector((state: RootState) => state.posts);
    const dispatch = useDispatch();

    useEffect(() => {
        if (success) {
            dispatch(setSuccess(''));
        }
    }, [success, dispatch]);


    return (
        <Container>
            <h1>Dashboard</h1>

            <table>
                <tbody>

                {
                    // @ts-ignore
                    posts.map((p) => {
                    return (<tr>
                        <td>{p.title}</td>
                        <td>sd</td>
                    </tr>)
                }) }
                </tbody>
            </table>

        </Container>
    )
}

export default Dashboard;
