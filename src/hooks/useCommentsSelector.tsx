import {useSelector} from 'react-redux';
import {RootState} from '../store';
import {CommentsState} from '../store/types';

const useCommentsSelector = () => {
  const comments: CommentsState = useSelector((state: RootState) => state.comments);
  return comments;
}

export default useCommentsSelector;
