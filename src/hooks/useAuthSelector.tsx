import {useSelector} from 'react-redux';
import {RootState} from '../store';
import {AuthState} from '../store/types';

const useAuthSelector = () => {
    const auth: AuthState = useSelector((state: RootState) => state.auth);
    return auth;
}

export default useAuthSelector;
