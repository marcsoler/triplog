import {FC, useState} from 'react';
import Image from 'react-bootstrap/Image';
import Col from 'react-bootstrap/Col';
import { Link } from 'react-router-dom';

const TripTeaser: FC<any> = (trip) => {

    const [count, setCount] = useState(0);

    const tmp = '500x500';


    return (
        <Col>
            <Link to={`/trip/${trip.id}`}>
                <figure className="trip-cover-image tilted">

                    <Image src={`https://via.placeholder.com/${tmp}`} />
                    <figcaption className="trip-cover-name display-6">
                        {trip.name}
                    </figcaption>
                </figure>
            </Link>
        </Col>
    )
}

export default TripTeaser;