import {FC, useState} from 'react';

import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button'
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';


import Loading from '../misc/Loading';
import {DirectionsRenderer, GoogleMap, useJsApiLoader} from '@react-google-maps/api';
import Modal from 'react-bootstrap/Modal';
import {useDispatch} from 'react-redux';
import {storeTrip} from '../../store/actions/tripActions';
import {Trip} from '../../store/types';
import {useHistory} from 'react-router-dom';


const CreateTrip: FC = () => {

    const [mapRef, setMapRef] = useState<google.maps.Map>();
    const [dirRef, setDirRef] = useState<google.maps.DirectionsRenderer>()
    const [travelMode, setTravelMode] = useState<google.maps.TravelMode>()
    const [name, setName] = useState<string>('');
    const [waypoints, setWaypoints] = useState<google.maps.LatLng[]>([]);
    const [polyline, setPolyline] = useState<string>('');
    const [directionsLoaded, setDirectionsLoaded] = useState(false);
    const [response, setResponse] = useState();
    const [startMarker, setStartMarker] = useState<google.maps.Marker>();
    const [distance, setDistance] = useState<number>();
    const [duration, setDuration] = useState<string>()

    const history = useHistory();


    const updateTravelMode = (mode: string) => {
        switch (mode) {
            case 'DRIVING':
                setTravelMode(google.maps.TravelMode.DRIVING);
                break;
            case 'WALKING':
                setTravelMode(google.maps.TravelMode.WALKING);
                break;
            case 'BICYCLING':
            default:
                setTravelMode(google.maps.TravelMode.BICYCLING);
                break;
        }
    }

    const {isLoaded, loadError} = useJsApiLoader({
        googleMapsApiKey: process.env.REACT_APP_MAPS_API_KEY ? process.env.REACT_APP_MAPS_API_KEY : '',
    });

    const onMapClick = (e: google.maps.MapMouseEvent): void => {
        const wp = e.latLng;
        if (wp && waypoints.length < 2) {
            waypoints.push(wp);
            if (waypoints.length === 1) {
                setStartMarker(new google.maps.Marker({
                    position: wp,
                    map: mapRef,
                    title: 'Starting point',
                }));
                return;
            }
            displayRoute();
        }
    }

    const displayRoute = () => {
        const directionService = new google.maps.DirectionsService();
        directionService.route({
            origin: waypoints[0],
            destination: waypoints[waypoints.length - 1],
            travelMode: travelMode ? travelMode : google.maps.TravelMode.BICYCLING,
        }, directionCallback);
        if (startMarker) {
            startMarker.setMap(null);
        }

    }


    const directionCallback = (res: any) => {
        if (res.status === 'OK') {
            setDirectionsLoaded(true);
            setResponse(res);
        }
    }

    const onDirectionsChange = () => {
        const dir: any = dirRef!.getDirections();
        // Get and print metadata
        const route = dir?.routes[0];

        console.log(route);

        setDistance(route?.legs[0].distance.text);
        setDuration(route?.legs[0].duration.text);
        setPolyline(route.overview_polyline);

        //Update waypoints
        const wps: google.maps.LatLng[] = [];

        //origin:
        wps.push(route.legs[0].start_location);

        //
        if(route.legs[0].via_waypoints.length > 0) {
            route.legs[0].via_waypoints.forEach((wp: google.maps.LatLng) => {
                wps.push(wp);
            })
        }
        //destination:
        wps.push(route.legs[0].end_location);
        setWaypoints(wps);

    }

    const containerStyle = {
        width: '100%',
        height: '400px',
    }

    const center = {
        lat: 47.2238663,
        lng: 8.8156291,
    }

    const [showModal, setShowModal] = useState(false);

    const dispatch = useDispatch();
    const handleTripSubmission = () => {

        const newTrip: Trip = {
            name: name,
            waypoints: waypoints,
            polyline: polyline,
        }

        console.log('todo', name, waypoints);


        //dispatch(createPost(data, () => console.error('An error happened!')));

        dispatch(storeTrip(newTrip));

        setShowModal(false);

        history.push('/dashboard');







    }


    const renderMap = () => {
        return (
            <Container>

                <h1>Route planner</h1>

                <Row className="mt-3">
                    <Col md={8}>
                        <GoogleMap
                            id="gmap-planner"
                            mapContainerStyle={containerStyle}
                            center={center}
                            onLoad={map => setMapRef(map)}
                            onClick={(e => onMapClick(e))}
                            zoom={4}
                            options={{
                                draggableCursor: 'crosshair'
                            }}
                        >
                            {directionsLoaded &&
                                <DirectionsRenderer onLoad={dir => setDirRef(dir)} directions={response} options={{
                                    draggable: true
                                }} onDirectionsChanged={onDirectionsChange}/>}
                        </GoogleMap>


                    </Col>
                    <Col as="aside" md={4}>
                        <Form>
                            <Form.Select aria-label="Select the transportation mode" onChange={(e) => {
                                updateTravelMode(e.target.value)
                            }}>
                                <option value="BICYCLE">Bicycle</option>
                                <option value="DRIVING">Driving</option>
                                <option value="WALKING">Walking</option>
                            </Form.Select>
                        </Form>

                        <hr/>

                        {distance && <p><strong>Distance:</strong> {distance}</p>}
                        {duration && <p><strong>Duration:</strong> {duration}</p>}
                        {directionsLoaded && <Button variant="success" onClick={e => setShowModal(true)}>Save</Button>}

                    </Col>
                </Row>

                <Modal show={showModal} onHide={() => setShowModal(false)}>
                    <Modal.Header>New trip</Modal.Header>
                    <Modal.Body>
                        <Form>
                            <Form.Group className="mb-3" controlId="name">
                                <Form.Label>Trip name</Form.Label>
                                <Form.Control type="text" onChange={e => setName(e.currentTarget.value)} />
                            </Form.Group>
                        </Form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={e => setShowModal(false)}>Keep editing</Button>
                        <Button variant="success" onClick={handleTripSubmission}>Save</Button>
                    </Modal.Footer>
                </Modal>

            </Container>

        )
    }

    if (loadError) {
        return <Alert variant="danger">Map cannot be loaded right now, sorry.</Alert>
    }

    return isLoaded ? renderMap() : <Loading/>
}

export default CreateTrip;
