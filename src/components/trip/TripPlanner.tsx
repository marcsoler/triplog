import {ChangeEvent, FC, useCallback, useEffect, useState} from 'react';

import {Alert, Button, ButtonGroup, Col, Container, FloatingLabel, Form, Image, Row} from 'react-bootstrap';

import Loading from '../misc/Loading';

import {DirectionsRenderer, GoogleMap, useJsApiLoader} from '@react-google-maps/api';
import {mapContainerStyle, defaultMapCenter, defaultMapOptions} from './mapsOptions';
import mapStyle from './mapStyle.json';
import {useDispatch} from 'react-redux';
import {setTripModal, storeTrip} from '../../store/actions/tripActions';
import {ITripFormData, TripCoverImage} from '../../store/types';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faCheck, faTimes} from '@fortawesome/free-solid-svg-icons';

import {SubmitHandler, useForm} from 'react-hook-form';
import {generateRoute, isValidLocation} from '../../libs/mapsHelper';
import {compressedFileType, optimizeImages, uploadToStorage} from '../../libs/mediaHelper';


const TripPlanner: FC = () => {

    const [mapRef, setMapRef] = useState<google.maps.Map>();
    const [libraries] = useState<('drawing' | 'geometry' | 'localContext' | 'places' | 'visualization')[]>(['geometry']);
    const [mode, setMode] = useState<google.maps.TravelMode>();
    const [name, setName] = useState<string>('');
    const [uploadProgress, setUploadProgress] = useState<number>(0);
    const [imageUrl, setImageUrl] = useState<string>();
    const [waypoints, setWaypoints] = useState<google.maps.LatLng[]>([]);
    const [dirRef, setDirRef] = useState<google.maps.DirectionsRenderer>()
    const [dirResponse, setDirResponse] = useState<google.maps.DirectionsResult | null>();
    const [startMarker, setStartMarker] = useState<google.maps.Marker>();
    const [infoWindow, setInfoWindow] = useState<google.maps.InfoWindow>();
    const [processedFiles, setProcessedFiles] = useState<TripCoverImage[]>([]);

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
            }, (e) => {
                dispatch(setTripModal({
                    show: true,
                    variant: 'danger',
                    message: e,
                }));
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
                generateRoute(waypoints, mode, (r) => {
                    //setDirectionsLoaded(true);
                    setDirResponse(r);
                }, (error) => {
                    setTripModal({
                        show: true,
                        variant: 'danger',
                        message: 'An error happened from the direction-service (Google Maps API): ' + error
                    })
                });
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

    const {
        register,
        formState: {errors},
        handleSubmit,
        watch,
    } = useForm();

    const onSubmit: SubmitHandler<ITripFormData> = data => {

        if (dirRef) {
            const directions = dirRef.getDirections();
            if (directions) {
                dispatch(storeTrip(
                    {
                        ...data,
                        polyline: directions.routes[0].overview_polyline,
                        coverImg: processedFiles,
                    },
                ))

            }
        }


    }


    const coverImg = watch('imageUrl');
    useEffect(() => {
        if (coverImg && coverImg.length) {

            optimizeImages(coverImg as unknown as FileList, (result: compressedFileType[]) => {

                const newFiles: TripCoverImage[] = [];

                result.forEach((compressedFile) => {
                    uploadToStorage(compressedFile.file, compressedFile.variant, (url) => {
                        newFiles.push({url: url, variant: compressedFile.variant});
                    }).then();
                });


                setProcessedFiles(newFiles);

            }).then();
        }
    }, [coverImg]);

    useEffect(() => {
        if (processedFiles) {
            console.log(processedFiles);
        }
    }, [processedFiles]);


    const onMapLoad = useCallback(
        (map) => {
            setMapRef(map);
            map.mapTypes.set('styled_map', new google.maps.StyledMapType(mapStyle));
            map.setMapTypeId('styled_map');
            setInfoWindow(new google.maps.InfoWindow({
                content: `Don't forget a route!`
            }));
        },
        [],
    );

    const onCenterChanged = () => {
        if (infoWindow && mapRef) {
            infoWindow.setPosition({lat: mapRef.getCenter()!.lat(), lng: mapRef.getCenter()!.lng()})
        }
    }

    const renderMap = () => {
        return isLoaded ? (
            <GoogleMap
                mapContainerStyle={mapContainerStyle}
                center={defaultMapCenter}
                onLoad={onMapLoad}
                onClick={(e => drawPath(e))}
                onCenterChanged={onCenterChanged}
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
        if (window.confirm('Are you sure?')) { //todo: createAppConfirmModal
            if (startMarker) {
                startMarker.setMap(null);
            }
            setDirResponse(null);
            setWaypoints([]);
            setImageUrl(undefined);
        }
        return;
    }


    return (
        <Container className="trip-planner content">
            <h1>Create new Trip</h1>
            <h2 className="mt-5 color-darkcyan">Route planner</h2>

            <Row className="mt-3 mb-3">
                <Col xs={12}>
                    {renderMap()}
                    {errors.polyline && <p className="form-validation-failed">A route is required!</p>}
                </Col>
            </Row>

            <Form onSubmit={handleSubmit(onSubmit)} onReset={handleFormReset}>

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
                        <Form.Control type="file" placeholder="Cover image" size="lg"
                                      accept="image/*" {...register('imageUrl', {
                            required: 'A cover image is required',
                        })} />
                        {errors.imageUrl && <p className="form-validation-failed">{errors.imageUrl.message}</p>}
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
