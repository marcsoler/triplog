import {useSelector} from 'react-redux';
import {RootState} from '../store';
import {TripsState} from '../store/types';

const useTripsSelector = () => {
  const trips: TripsState = useSelector((state: RootState) => state.trips);
  return trips;
}

export default useTripsSelector;
