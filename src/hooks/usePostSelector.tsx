import {useSelector} from 'react-redux';
import {RootState} from '../store';
import {PostState} from '../store/types';

const usePostSelector = () => {
  const post: PostState = useSelector((state: RootState) => state.post);
  return post;
}

export default usePostSelector;
