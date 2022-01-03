import {useSelector} from 'react-redux';
import {RootState} from '../store';
import {TripState} from '../store/types';

const useTripSelector = () => {
  const trips: TripState = useSelector((state: RootState) => state.trip);
  return trips;
}

export default useTripSelector;
