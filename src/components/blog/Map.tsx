import {FC, useCallback, useEffect, useState} from 'react';

import {GoogleMap, Marker, Polyline, useJsApiLoader} from '@react-google-maps/api';
import Alert from 'react-bootstrap/Alert';
import Loading from '../misc/Loading';
import useTripSelector from '../../hooks/useTripSelector';
import {useDispatch} from 'react-redux';
import usePostSelector from '../../hooks/usePostSelector';
import {getTripByPost} from '../../store/actions/tripActions';

const Map: FC = () => {

    const dispatch = useDispatch();
    const {post} = usePostSelector();
    useEffect(() => {
        if(post) {
            dispatch(getTripByPost(post));
        }
    }, [dispatch, post]);
    const {trip} = useTripSelector();

    const [mapRef, setMapRef] = useState<google.maps.Map>();
    const [libraries] = useState<('drawing' | 'geometry' | 'localContext' | 'places' | 'visualization')[]>(['geometry']);


    const {isLoaded, loadError} = useJsApiLoader({
        googleMapsApiKey: process.env.REACT_APP_MAPS_API_KEY ? process.env.REACT_APP_MAPS_API_KEY : '',
        libraries: libraries,
    });


    const containerStyle = {
        width: '100%',
        height: '400px',
    }

    const onMapLoad = useCallback(
        (map) => {
            setMapRef(map);
        },
        [],
    );



    const drawPolyline = (): google.maps.LatLng[] => {

        const encodedPolyline = trip!.polyline;

        const decodedPath = google.maps.geometry.encoding.decodePath(encodedPolyline);

        const bounds = new google.maps.LatLngBounds();

        decodedPath.forEach((point) => {
            bounds.extend(point);
        });

        mapRef?.fitBounds(bounds);

        return decodedPath;
    }

    const loadMarker = () => {

        const encodedPolyline = trip!.polyline;

        const decodedPath = google.maps.geometry.encoding.decodePath(encodedPolyline);

        const progressedPath = Math.ceil(Number(post?.progress) * decodedPath.length / 100);

        return decodedPath[progressedPath];
    }



    const renderMap = () => {


        return <GoogleMap
            mapContainerStyle={containerStyle}
            zoom={4}
            onLoad={onMapLoad}>
            <Polyline path={drawPolyline()} />
            <Marker position={loadMarker()} animation={google.maps.Animation.BOUNCE} />
        </GoogleMap>
    }

    if (loadError) {
        return <Alert variant="danger">Map cannot be loaded right now, sorry.</Alert>
    }

    return (isLoaded && trip) ? renderMap() : <Loading/>
}

export default Map;
