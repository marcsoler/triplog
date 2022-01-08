import {FC} from 'react';
import Image from 'react-bootstrap/Image';
import Col from 'react-bootstrap/Col';
import { Link } from 'react-router-dom';

const TripTeaser: FC<any> = (trip) => {
    return (
        <Col>
            <Link to={`/trip/${trip.id}`}>
                <figure className="trip-cover-image tilted">
                    <Image src={trip.imageUrl} />
                    <figcaption className="trip-cover-name display-6">{trip.name}</figcaption>
                </figure>
            </Link>
        </Col>
    )
}

export default TripTeaser;
