import {useSelector} from 'react-redux';
import {RootState} from '../store';
import {TripsState} from '../store/types';

const useTripSelector = () => {
  const trips: TripsState = useSelector((state: RootState) => state.trips);
  return trips;
}

export default useTripSelector;
