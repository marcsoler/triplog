import {ChangeEvent, FC, useCallback, useEffect, useState} from 'react';

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
import {mapContainerStyle, defaultMapCenter, defaultMapOptions} from './mapsOptions';
import mapStyle from './mapStyle.json';
import {useDispatch} from 'react-redux';
import {storeTrip} from '../../store/actions/tripActions';
import {ITripFormData} from '../../store/types';
import {getDownloadURL, getStorage, ref, uploadBytesResumable} from 'firebase/storage';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faCheck} from '@fortawesome/free-solid-svg-icons/faCheck';
import {faTimes} from '@fortawesome/free-solid-svg-icons/faTimes';

import {SubmitHandler, useForm} from 'react-hook-form';
import {generateRoute, isValidLocation} from '../../libs/mapsHelper';


const TripPlanner: FC = () => {

    const [mapRef, setMapRef] = useState<google.maps.Map>();
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

    const {isLoaded, loadError} = useJsApiLoader({
        googleMapsApiKey: process.env.REACT_APP_MAPS_API_KEY ? process.env.REACT_APP_MAPS_API_KEY : '',
        libraries: libraries,
    });


    const setTravelMode = (e: ChangeEvent<HTMLSelectElement>) => {
        switch (e.target.value) {
            case 'DRIVING':
                return setMode(google.maps.TravelMode.DRIVING);
            case 'WALKING':
                return setMode(google.maps.TravelMode.WALKING);
            default:
                return setMode(google.maps.TravelMode.BICYCLING);
        }
    }

    const drawPath = (e: google.maps.MapMouseEvent) => {
        if (e.latLng) {
            isValidLocation(e.latLng, () => {
                setWaypoints(waypoints => [...waypoints, e.latLng!]);
                return;
            });
        }
    }

    useEffect(() => {
        if (!mode && isLoaded) {
            setMode(google.maps.TravelMode.BICYCLING);
        }
    }, [isLoaded, mode]);

    useEffect(() => {
        if (waypoints.length > 1) {
            if (mode) {
                generateRoute(waypoints, mode, ((r) => {
                    console.log('response (r)', r);
                    setDirectionsLoaded(true);
                    setDirResponse(r);
                }));
            }
        }
    }, [waypoints, mode])

    useEffect(() => {
        if (waypoints.length === 1 && !startMarker) {
            setStartMarker(new google.maps.Marker({
                position: waypoints[0],
                map: mapRef,
                title: 'Starting point',
            }));
        } else {
            if (startMarker) {
                startMarker.setMap(null);
            }
        }
    }, [waypoints, startMarker, mapRef]);


    const dispatch = useDispatch();

    const onSubmit: SubmitHandler<ITripFormData> = data => {
        dispatch(storeTrip(data));
    }

    const {
        register,
        formState: {errors},
        handleSubmit,
        setValue,
        reset
    } = useForm<ITripFormData>();

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
                setValue('polyline', directions.routes[0].overview_polyline);
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
                center={defaultMapCenter}
                onLoad={onMapLoad}
                onClick={(e => drawPath(e))}
                zoom={4}
                options={{...defaultMapOptions, draggableCursor: 'crosshair'}}>

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
                mode: '',
                name: '',
                imageUrl: '',
                polyline: '',
            });
            if (startMarker) {
                startMarker.setMap(null);
            }
            setDirResponse(null);
            setWaypoints([]);
            setImageUrl(undefined);


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
                        <input type="hidden" defaultValue={''} {...register('polyline', {required: true})} />
                        {errors.polyline && <p className="form-validation-failed">A route must be defined</p>}
                    </Col>
                </Row>

                <FloatingLabel label="Transport method" controlId="method" className="mb-3">
                    <Form.Select
                        aria-label="Select the transportation mode" {...register('mode', {required: true})}
                        onChange={(e) => setTravelMode(e)}>
                        <option value="">Select the transportation mode</option>
                        <option value="BICYCLE">Bicycle</option>
                        <option value="DRIVING">Driving</option>
                        <option value="WALKING">Walking</option>
                    </Form.Select>
                    {errors.mode && <p className="form-validation-failed">The transport method is required</p>}
                </FloatingLabel>
                <Form.Group className="mb-3" controlId="name">
                    <FloatingLabel label="Trip name" controlId="name">
                        <Form.Control type="text" placeholder="name" {...register('name', {required: true})}
                                      onChange={e => setName(e.currentTarget.value)}/>
                    </FloatingLabel>
                    {errors.name && <p className="form-validation-failed">The trip name is required</p>}
                </Form.Group>
                <Row>
                    <Col xs={12} md={6}>
                        <Form.Control type="file" placeholder="Cover image" size="lg" accept="image/*"
                                      {...register('imageUrl', {required: true})}
                                      onChange={(e) => uploadCoverImage(e)}/>
                        {errors.imageUrl && <p className="form-validation-failed">A cover image is required</p>}
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
                    <Image src={imageUrl} thumbnail={true} className="mt-3"
                           style={{maxWidth: '350px', height: 'auto'}}/>}
            </Form>
        </Container>
    )
}

export default TripPlanner;
