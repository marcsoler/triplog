import {useSelector} from 'react-redux';
import {RootState} from '../store';
import {PostsState} from '../store/types';

const usePostsSelector = () => {
  const posts: PostsState = useSelector((state: RootState) => state.posts);
  return posts;
}

export default usePostsSelector;
