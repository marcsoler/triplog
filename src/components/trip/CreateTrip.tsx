import {FC, useState} from 'react';

import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button'
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';


import Loading from '../misc/Loading';

import {DirectionsRenderer, DirectionsService, GoogleMap, useJsApiLoader} from '@react-google-maps/api';
import {SubmitHandler, useForm} from 'react-hook-form';

interface ITripForm {
    origin: string;
    destination: string;

}


const CreateTrip: FC = () => {

    const { register, handleSubmit, getValues} = useForm();

    const [origin, setOrigin] = useState<string|google.maps.LatLng|google.maps.Place|google.maps.LatLngLiteral>('');
    const [destination, setDestination] = useState<string|google.maps.LatLng|google.maps.Place|google.maps.LatLngLiteral>('');
    const [travelMode, setTravelMode] = useState<google.maps.TravelMode>()

    const onSubmit: SubmitHandler<ITripForm> = data => {
        console.log('submittion...');
        console.log(data);

        const formValues = getValues();

        setOrigin(formValues.origin);
        setDestination(formValues.destination)

        switch (formValues.travelMode) {
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

    const containerStyle = {
        width: '100%',
        height: '400px',
    }

    const center = {
        lat: 47.2238663,
        lng: 8.8156291,
    }

    const [directionsLoaded, setDirectionsLoaded] = useState(false);
    const [response, setResponse] = useState(undefined);

    const directionCallback = (response: any) => {
        console.count('directionCallback');
        console.log(response.status);
        if(response.status === 'OK') {
            setDirectionsLoaded(true);
            setResponse(response);
        }
    }

    const onDirectionsChange = (): void => {
        setResponse(response);
        console.log('Directions changed...', response);
    }

    const renderMap = () => {
        return (
            <Container>

                <Row className="mt-3">
                    <Col md={8}>

                        <Form onSubmit={handleSubmit(onSubmit)}>
                            <Row className="mb-3">
                                <Col md={4} xs={12}>
                                    <Form.Group controlId="origin">
                                        <Form.Control type="text" placeholder="Origin" {...register('origin')} />
                                    </Form.Group>
                                </Col>
                                <Col md={4} xs={12}>
                                    <Form.Group controlId="origin">
                                        <Form.Control type="text" placeholder="Destination" {...register('destination')} />
                                    </Form.Group>
                                </Col>
                                <Col md={2} xs={8}>
                                    <Form.Group controlId="travelMode">
                                        <Form.Select aria-label="Travel mode selection" {...register('travelMode')}>
                                            <option disabled>Travel mode</option>
                                            <option value="DRIVING">Driving</option>
                                            <option value="BICICYLING">Bicycling</option>
                                            <option value="WALRKING">Walking</option>
                                        </Form.Select>
                                    </Form.Group>
                                </Col>
                                <Col md={2} xs={4}>
                                    <Button variant="primary" type="submit">Search</Button>
                                </Col>
                            </Row>

                        </Form>

                        <GoogleMap
                            id="gmap-planner"
                            mapContainerStyle={containerStyle}
                            center={center}
                            zoom={4}>

                            {!directionsLoaded && (origin && destination && travelMode) && (
                                <DirectionsService
                                    options={{
                                        destination: destination,
                                        origin: origin,
                                        travelMode: travelMode,
                                    }}
                                    callback={directionCallback}
                                />)}

                            { directionsLoaded && <DirectionsRenderer directions={response} options={{
                                draggable: true
                            }} onDirectionsChanged={onDirectionsChange} /> }
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
