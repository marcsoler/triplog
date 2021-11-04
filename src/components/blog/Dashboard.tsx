import { FC, useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';

import {setSuccess} from '../../store/actions/authActions';
import {RootState} from '../../store';

const Dashboard: FC = () => {

    const { success } = useSelector((state: RootState) => state.auth);
    const dispatch = useDispatch();

    useEffect(() => {
        if(success) {
            dispatch(setSuccess(''));
        }
    }, [success, dispatch]);


    return (
        <div>
            <h1>Welcome !!</h1>
        </div>
    )
}

export default Dashboard;
