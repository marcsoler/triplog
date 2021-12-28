import {FC, memo, useEffect, useMemo, useRef, useState} from 'react';

import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button'
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';


import Loading from '../misc/Loading';

import {DirectionsRenderer, DirectionsService, GoogleMap, Marker, useJsApiLoader} from '@react-google-maps/api';
import {SubmitHandler, useForm} from 'react-hook-form';

interface ITripForm {
    origin: string;
    destination: string;

}


const CreateTrip: FC = () => {

    const {register, getValues} = useForm();

    const [mapRef, setMapRef] = useState<google.maps.Map>();
    const [dirRef, setDirRef] = useState<google.maps.DirectionsRenderer>()
    const [travelMode, setTravelMode] = useState<google.maps.TravelMode>()

    const [waypoints, setWaypoints] = useState<google.maps.LatLng[]>([]);

    const [directionsLoaded, setDirectionsLoaded] = useState(false);
    const [response, setResponse] = useState(undefined);

    const onSubmit: SubmitHandler<ITripForm> = data => {
        switch (travelMode) {
            case 'BICYCLING':
                setTravelMode(google.maps.TravelMode.BICYCLING);
                break;
            case 'WALKING':
                setTravelMode(google.maps.TravelMode.WALKING);
                break;
            case 'DRIVING':
            default:
                setTravelMode(google.maps.TravelMode.DRIVING);
                break;
        }
    }

    const {isLoaded, loadError} = useJsApiLoader({
        googleMapsApiKey: process.env.REACT_APP_MAPS_API_KEY ? process.env.REACT_APP_MAPS_API_KEY : '',
    });

    const onMapClick = (e: google.maps.MapMouseEvent): void => {

        //first click ist start/second click is finished...
        const wp = e.latLng;

        if (wp && waypoints.length < 2) {
            waypoints.push(wp);
        }

        if (waypoints.length > 1) {
            console.log('draw route...');
            displayRoute();
        }
    }

    const displayRoute = () => {
        const directionService = new google.maps.DirectionsService();

        directionService.route({
            origin: waypoints[0],
            destination: waypoints[waypoints.length - 1],
            travelMode: google.maps.TravelMode.BICYCLING,
        }, directionCallback);
    }


    const directionCallback = (response: any) => {
        console.log('directionCallback');
        if (response.status === 'OK') {
            setDirectionsLoaded(true);
            setResponse(response);
        }
    }

    const onDirectionsChange = () => {

        const dir = dirRef!.getDirections();

        console.log('onDirectionsChange()', dir);

    }

    const containerStyle = {
        width: '100%',
        height: '400px',
    }

    const center = {
        lat: 47.2238663,
        lng: 8.8156291,
    }


    const renderMap = () => {
        return (
            <Container>

                <Row className="mt-3">
                    <Col md={8}>

                        <h1>Route planner</h1>

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
                        <h3>Route info</h3>
                    </Col>
                </Row>
            </Container>
        )
    }

    if (loadError) {
        return <Alert variant="danger">Map cannot be loaded right now, sorry.</Alert>
    }

    return isLoaded ? renderMap() : <Loading/>
}

export default CreateTrip;
