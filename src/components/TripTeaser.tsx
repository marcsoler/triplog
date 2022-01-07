import {FC, useState, useEffect} from 'react';
import Image from 'react-bootstrap/Image';
import Col from 'react-bootstrap/Col';
import {useDispatch} from 'react-redux';
import usePostsSelector from '../hooks/usePostsSelector';

const TripTeaser: FC<any> = (trip) => {

    const { posts } = usePostsSelector();

    console.log('posts', posts);

    const [count, setCount] = useState(0);

    useEffect(() => {
        posts!.forEach((p) => {
            if(p.trip === trip.id) {
                setCount(count+1);
            }
        })
    }, []);


    const tmp = '350x350';



    return (
        <Col>
            <div>
                <Image thumbnail={true} src={`https://via.placeholder.com/${tmp}`} />
                <h2>{trip.name}</h2>
                <p>{count} articles</p>
            </div>
        </Col>
    )
}

export default TripTeaser;
