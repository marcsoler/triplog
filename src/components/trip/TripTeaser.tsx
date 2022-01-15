import {FC, useEffect, useState} from 'react';

import {Col, Figure} from 'react-bootstrap';
import {Link} from 'react-router-dom';
import {Post, Trip, TripCoverImage} from '../../store/types';
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


    const getFallbackImg = (trip: Trip) => {
        if (trip.coverImg) {
            const imgs = trip.coverImg;

            // @ts-ignore
            const originalCI: TripCoverImage = imgs.find((i) => {
                return i.variant === 'original';
            });

            return originalCI.url;
        }

        // @ts-ignore
        return trip.imageUrl; //todo: clear legacy data...
    }

    const getSrcSet = (trip: Trip) => {

        const sizes = [
            'small', 'medium', 'large'
        ];

        if (trip.coverImg) {

            const srcset: string[] = [];

            sizes.forEach((size) => {

                const ci = trip.coverImg.find((i) => { return i.variant === size} );


                if(ci) {
                    switch (size) {
                        case 'small':
                            srcset.push(ci.url + ' 340w');
                            break
                        case 'medium':
                            srcset.push(ci.url + ' 450w');
                            break
                        case 'large':
                            srcset.push(ci.url + ' 640w');
                            break;
                    }
                }

            });

            return srcset.join(', ');

        }
        return '';

    }


    return (
        <Col>
            <Link to={`/post/${latestPost && latestPost.slug}`}>
                <Figure className="trip-cover-image tilted">
                    <Figure.Image src={getFallbackImg(trip)} srcSet={getSrcSet(trip)}
                                  alt={`Cover image of ${trip.name}`} loading="lazy"/>
                    <Figure.Caption className="trip-cover-name display-6">{trip.name}</Figure.Caption>
                </Figure>
            </Link>
        </Col>
    )
}

export default TripTeaser;
