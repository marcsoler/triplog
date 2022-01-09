import {FC, useEffect, useState} from 'react';

import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button'
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Image from 'react-bootstrap/Image';
import Row from 'react-bootstrap/Row';


import Loading from '../misc/Loading';
import {DirectionsRenderer, GoogleMap, useJsApiLoader} from '@react-google-maps/api';
import Modal from 'react-bootstrap/Modal';
import {useDispatch} from 'react-redux';
import {storeTrip} from '../../store/actions/tripActions';
import {Trip} from '../../store/types';
import {useHistory} from 'react-router-dom';
import {getStorage, ref, uploadBytesResumable, getDownloadURL} from 'firebase/storage';
import mapsOptions from './mapsOptions';


const CreateTrip: FC = () => {

    const [mapRef, setMapRef] = useState<google.maps.Map>();
    const [center] = useState<google.maps.LatLngLiteral>({lat: 47.2238663, lng: 8.8156291});
    const [libraries] = useState<('drawing' | 'geometry' | 'localContext' | 'places' | 'visualization')[]>(['geometry']);
    const [mode, setMode] = useState<string>();
    const [name, setName] = useState<string>('');
    const [uploadProgress, setUploadProgress] = useState<number>(0);
    const [imageUrl, setImageUrl] = useState<string>();
    const [waypoints, setWaypoints] = useState<google.maps.LatLng[]>([]);
    const [dirRef, setDirRef] = useState<google.maps.DirectionsRenderer>()
    const [polyline, setPolyline] = useState<string>('');
    const [directionsLoaded, setDirectionsLoaded] = useState(false);
    const [dirResponse, setDirResponse] = useState<google.maps.DirectionsResult | null>();
    const [startMarker, setStartMarker] = useState<google.maps.Marker>();
    const history = useHistory();

    const {isLoaded, loadError} = useJsApiLoader({
        googleMapsApiKey: process.env.REACT_APP_MAPS_API_KEY ? process.env.REACT_APP_MAPS_API_KEY : '',
        libraries: libraries,
    });


    const getTravelMode = (): google.maps.TravelMode => {
        switch (mode) {
            case 'DRIVING':
                return google.maps.TravelMode.DRIVING;
            case 'WALKING':
                return google.maps.TravelMode.WALKING;
            default:
                return google.maps.TravelMode.BICYCLING;
        }
    }

    const setPath = (e: google.maps.MapMouseEvent): void => {
        const position = e.latLng;
        if (position) {
            setWaypoints(waypoints => [...waypoints, position]);
        }
    }

    useEffect(() => {
        if (waypoints.length === 1) {
            setStartMarker(new google.maps.Marker({
                position: waypoints[0],
                map: mapRef,
                title: 'Starting point',
            }));
        }

        if (waypoints.length > 1) {
            const directionService = new google.maps.DirectionsService();
            const betweenWps: google.maps.DirectionsWaypoint[] = [];
            if (startMarker) {
                setStartMarker(undefined);
            }

            if (waypoints.length > 2) {
                waypoints.slice(1, -1).forEach((wp) => {
                    betweenWps.push({
                        location: wp,
                        stopover: true,
                    });
                })
            }

            directionService.route({
                origin: waypoints[0],
                waypoints: betweenWps,
                optimizeWaypoints: true,
                destination: waypoints[waypoints.length - 1],
                travelMode: getTravelMode(),
            }, (response, status) => {
                if (status === google.maps.DirectionsStatus.OK) {
                    setDirectionsLoaded(true);
                    setDirResponse(response);
                }
            }).then();

        }

    }, [waypoints, mode, getTravelMode])


    const containerStyle = {
        width: '100%',
        height: '400px',
    }

    const [showModal, setShowModal] = useState(false);

    const dispatch = useDispatch();
    const handleTripSubmission = () => {

        const newTrip: Trip = {
            name: name,
            imageUrl: imageUrl!,
            waypoints: waypoints,
            polyline: polyline,
        }

        dispatch(storeTrip(newTrip));

        setShowModal(false);

        history.push('/dashboard');

    }

    const uploadCoverImage = (e: any) => {

        const file = e.target.files[0];

        const storage = getStorage();
        const storageRef = ref(storage, `/trips/${file.name}`);
        const uploadTask = uploadBytesResumable(storageRef, file);

        uploadTask.on('state_changed', (snapshot) => {
            setUploadProgress(Math.ceil((snapshot.bytesTransferred / snapshot.totalBytes) * 100));
        }, (error) => {
            console.error('An error happened during the upload', error.code);
            console.error('https://firebase.google.com/docs/storage/web/handle-errors');
        }, () => {
            getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                setImageUrl(downloadURL);
            })
        });
    }

    useEffect(() => {
        setUploadProgress(0);
    }, [imageUrl]);

    useEffect(() => {
        if (dirRef) {
            const directions = dirRef.getDirections();

            if (directions) {
                setPolyline(directions.routes[0].overview_polyline)
            }
        }
    }, [dirRef, waypoints]);

    const renderMap = () => {
        return (
            <Container className="trip-planner content">

                <h1>Route planner</h1>

                <Row className="mt-3">
                    <Col md={8}>
                        <GoogleMap
                            mapContainerStyle={containerStyle}
                            center={center}
                            onLoad={map => setMapRef(map)}
                            onClick={(e => setPath(e))}
                            zoom={4}
                            options={{...mapsOptions, draggableCursor: 'crosshair'}}>
                            {dirResponse &&
                                <DirectionsRenderer onLoad={dir => setDirRef(dir)} directions={dirResponse}/>}
                        </GoogleMap>


                    </Col>
                    <Col as="aside" md={4}>
                        <Form>

                            <Form.Label>Traveling method</Form.Label>
                            <Form.Select aria-label="Select the transportation mode" onChange={(e) => {
                                setMode(e.target.value)
                            }}>
                                <option value="BICYCLE">Bicycle</option>
                                <option value="DRIVING">Driving</option>
                                <option value="WALKING">Walking</option>
                            </Form.Select>

                            <Form.Label>Cover Image</Form.Label>
                            <Form.Control type="file" accept="image/*" onChange={(e) => uploadCoverImage(e)}/>
                            {uploadProgress > 0 && <Form.Text>{`Uploading... ${uploadProgress}%`}</Form.Text>}
                            {imageUrl &&
                                <Image src={imageUrl} thumbnail={true} style={{maxWidth: '100px', height: 'auto'}}/>}
                        </Form>

                        <hr/>
                        {directionsLoaded && <Button variant="success" onClick={e => setShowModal(true)}>Save</Button>}

                    </Col>
                </Row>

                <Modal show={showModal} onHide={() => setShowModal(false)}>
                    <Modal.Header>New trip</Modal.Header>
                    <Modal.Body>
                        <Form>
                            <Form.Group className="mb-3" controlId="name">
                                <Form.Label>Trip name</Form.Label>
                                <Form.Control type="text" onChange={e => setName(e.currentTarget.value)}/>
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
