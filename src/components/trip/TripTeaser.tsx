import {FC} from 'react';
import Col from 'react-bootstrap/Col';
import Figure from 'react-bootstrap/Figure';
import { Link } from 'react-router-dom';
import {Trip} from '../../store/types';

const TripTeaser: FC<Trip> = (trip: Trip) => {
    return (
        <Col>
            <Link to={`/trip/${trip.id}`}>
                <Figure className="trip-cover-image tilted">
                    <Figure.Image src={trip.imageUrl} alt={`Cover image of ${trip.name}`} loading="lazy" />
                    <Figure.Caption className="trip-cover-name display-6">{trip.name}</Figure.Caption>
                </Figure>
            </Link>
        </Col>
    )
}

export default TripTeaser;
