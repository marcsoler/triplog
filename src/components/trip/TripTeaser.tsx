import {FC, useEffect, useState} from 'react';
import Col from 'react-bootstrap/Col';
import Figure from 'react-bootstrap/Figure';
import { Link } from 'react-router-dom';
import {Post, Trip} from '../../store/types';
import usePostsSelector from '../../hooks/usePostsSelector';

const TripTeaser: FC<Trip> = (trip: Trip) => {

    const [latestPost, setLatestPost] = useState<Post>();

    const {posts} = usePostsSelector();

    useEffect(() => {
        const teaserPost = posts!.find((p) => {
            return p.trip === trip.id;
        })
        setLatestPost(teaserPost);
    }, [posts, trip]);

    return (
        <Col>
            <Link to={`/post/${latestPost && latestPost.id}`}>
                <Figure className="trip-cover-image tilted">
                    <Figure.Image src={trip.imageUrl} alt={`Cover image of ${trip.name}`} loading="lazy" />
                    <Figure.Caption className="trip-cover-name display-6">{trip.name}</Figure.Caption>
                </Figure>
            </Link>
        </Col>
    )
}

export default TripTeaser;
