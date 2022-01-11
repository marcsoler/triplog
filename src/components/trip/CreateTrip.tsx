import {ChangeEvent, FC, useCallback, useEffect, useState} from 'react';
import {Redirect, useHistory} from 'react-router-dom';

import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button'
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import Image from 'react-bootstrap/Image';
import Row from 'react-bootstrap/Row';


import Loading from '../misc/Loading';

import {DirectionsRenderer, GoogleMap, useJsApiLoader} from '@react-google-maps/api';
import {mapContainerStyle, mapsOptions} from './mapsOptions';
import mapStyle from './mapStyle.json';
import {useDispatch} from 'react-redux';
import {setTripModal, storeTrip} from '../../store/actions/tripActions';
import {Trip} from '../../store/types';
import {getDownloadURL, getStorage, ref, uploadBytesResumable} from 'firebase/storage';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faCheck} from '@fortawesome/free-solid-svg-icons/faCheck';
import {faTimes} from '@fortawesome/free-solid-svg-icons/faTimes';

import {SubmitHandler, useForm} from 'react-hook-form';

interface ITripForm {
    tripMode: string;
    tripName: string;
    tripImage: string;
    tripPolyline: string;
}


const CreateTrip: FC = () => {

    const [mapRef, setMapRef] = useState<google.maps.Map>();
    const [center] = useState<google.maps.LatLngLiteral>({lat: 47.2238663, lng: 8.8156291});
    const [libraries] = useState<('drawing' | 'geometry' | 'localContext' | 'places' | 'visualization')[]>(['geometry']);
    const [mode, setMode] = useState<google.maps.TravelMode>();
    const [name, setName] = useState<string>('');
    const [uploadProgress, setUploadProgress] = useState<number>(0);
    const [imageUrl, setImageUrl] = useState<string>();
    const [waypoints, setWaypoints] = useState<google.maps.LatLng[]>([]);
    const [dirRef, setDirRef] = useState<google.maps.DirectionsRenderer>()
    const [directionsLoaded, setDirectionsLoaded] = useState(false);
    const [dirResponse, setDirResponse] = useState<google.maps.DirectionsResult | null>();
    const [startMarker, setStartMarker] = useState<google.maps.Marker>();
    const history = useHistory();

    const {isLoaded, loadError} = useJsApiLoader({
        googleMapsApiKey: process.env.REACT_APP_MAPS_API_KEY ? process.env.REACT_APP_MAPS_API_KEY : '',
        libraries: libraries,
    });


    const setTravelMode = (e: ChangeEvent<HTMLSelectElement>): void => {
        switch (e.target.value) {
            case 'DRIVING':
                return setMode(google.maps.TravelMode.DRIVING);
            case 'WALKING':
                return setMode(google.maps.TravelMode.WALKING);
            default:
                return setMode(google.maps.TravelMode.BICYCLING);
        }
    }

    const drawPath = (e: google.maps.MapMouseEvent): void => {
        if (e.latLng) {
            setWaypoints(waypoints => [...waypoints, e.latLng!]);
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
            const betweenWps: google.maps.DirectionsWaypoint[] = [];
            if (startMarker) {
                startMarker.setMap(null);
            }

            if (waypoints.length > 2) {
                waypoints.slice(1, -1).forEach((wp) => {
                    betweenWps.push({
                        location: wp,
                        stopover: false,
                    });
                });
            }

            const directionService = new google.maps.DirectionsService();
            directionService.route({
                origin: waypoints[0],
                waypoints: betweenWps,
                optimizeWaypoints: true,
                destination: waypoints[waypoints.length - 1],
                travelMode: mode ? mode : google.maps.TravelMode.BICYCLING,
            }, (response, status) => {
                if (status === google.maps.DirectionsStatus.OK) {
                    setDirectionsLoaded(true);
                    setDirResponse(response);
                }
            }).then();
        }
    }, [waypoints, mode])

    const dispatch = useDispatch();

    const onSubmit: SubmitHandler<ITripForm> = data => {
        const newTrip: Trip = {
            name: data.tripName,
            mode: data.tripMode,
            imageUrl: imageUrl!,
            waypoints: waypoints,
            polyline: data.tripPolyline,
        }
        console.log('store trip...');
        dispatch(storeTrip(newTrip));
    }

    const {
        register,
        formState: {errors},
        handleSubmit,
        setValue,
        reset
    } = useForm<ITripForm>();

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
        if (dirRef) {
            const directions = dirRef.getDirections();
            if (directions) {
                setValue('tripPolyline', directions.routes[0].overview_polyline);
            }
        }
    }, [dirRef, waypoints]);

    const onMapLoad = useCallback(
        (map) => {
            setMapRef(map);
            map.mapTypes.set('styled_map', new google.maps.StyledMapType(mapStyle));
            map.setMapTypeId('styled_map');
        },
        [],
    );

    const renderMap = () => {
        return isLoaded ? (
            <GoogleMap
                mapContainerStyle={mapContainerStyle}
                center={center}
                onLoad={onMapLoad}
                onClick={(e => drawPath(e))}
                zoom={4}
                options={{...mapsOptions, draggableCursor: 'crosshair'}}>

                {dirResponse &&
                    <DirectionsRenderer onLoad={dir => setDirRef(dir)} directions={dirResponse}/>}
            </GoogleMap>
        ) : <Loading/>
    }

    if (loadError) {
        return <Alert variant="danger">Map cannot be loaded right now, sorry.</Alert>
    }

    const handleFormReset = () => {
        if (window.confirm('Are you sure?')) {
            reset({
                tripMode: '',
                tripName: '',
                tripImage: '',
                tripPolyline: '',
            });
            if(startMarker) {
                startMarker.setMap(null);
            }
            setDirResponse(null);
            setWaypoints([]);
        }
    }

    return (
        <Container className="trip-planner content">
            <h1>Create new Trip</h1>
            <h2 className="mt-5 color-darkcyan">Route planner</h2>
            <Form onSubmit={handleSubmit(onSubmit)} onReset={handleFormReset}>
                <Row className="mt-3 mb-3">
                    <Col xs={12}>
                        {renderMap()}
                        <input type="hidden" defaultValue={''} {...register('tripPolyline', {required: true})} />
                        {errors.tripPolyline && <p className="form-validation-failed">A route must be defined</p>}
                    </Col>
                </Row>

                <FloatingLabel label="Transport method" controlId="method" className="mb-3">
                    <Form.Select
                        aria-label="Select the transportation mode" {...register('tripMode', {required: true})}
                        onChange={(e) => setTravelMode(e)}>
                        <option value="">Select the transportation mode</option>
                        <option value="BICYCLE">Bicycle</option>
                        <option value="DRIVING">Driving</option>
                        <option value="WALKING">Walking</option>
                    </Form.Select>
                    {errors.tripMode && <p className="form-validation-failed">The transport method is required</p>}
                </FloatingLabel>
                <Form.Group className="mb-3" controlId="name">
                    <FloatingLabel label="Trip name" controlId="name">
                        <Form.Control type="text" placeholder="name" {...register('tripName', {required: true})}
                                      onChange={e => setName(e.currentTarget.value)}/>
                    </FloatingLabel>
                    {errors.tripName && <p className="form-validation-failed">The trip name is required</p>}
                </Form.Group>
                <Row>
                    <Col xs={12} md={6}>
                        <Form.Control type="file" placeholder="Cover image" size="lg" accept="image/*"
                                      {...register('tripImage', {required: true})}
                                      onChange={(e) => uploadCoverImage(e)}/>
                        {errors.tripImage && <p className="form-validation-failed">A cover image is required</p>}
                    </Col>
                    <Col xs={12} md={6}>

                        <ButtonGroup className="w-100" size="lg">
                            <Button type="reset" variant="outline-secondary"><FontAwesomeIcon
                                icon={faTimes}/> Reset</Button>
                            <Button type="submit" variant="outline-primary"><FontAwesomeIcon
                                icon={faCheck}/> Submit</Button>
                        </ButtonGroup>

                    </Col>
                </Row>
                {uploadProgress > 0 && uploadProgress < 100 &&
                    <Form.Text className="mt-3">{`Uploading... ${uploadProgress}%`}</Form.Text>}
                {imageUrl &&
                    <Image src={imageUrl} thumbnail={true} className="mt-3" style={{maxWidth: '350px', height: 'auto'}}/>}
            </Form>
        </Container>
    )
}

export default CreateTrip;
