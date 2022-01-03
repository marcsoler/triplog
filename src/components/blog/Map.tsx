import {FC, useEffect, useState} from 'react';

import {GoogleMap, Polyline, useJsApiLoader} from '@react-google-maps/api';
import {useCallback} from 'react';
import Alert from 'react-bootstrap/Alert';
import Loading from '../misc/Loading';
import useTripSelector from '../../hooks/useTripSelector';
import {useDispatch} from 'react-redux';
import usePostSelector from '../../hooks/usePostSelector';
import {getTripByPost} from '../../store/actions/tripActions';
import {Post} from '../../store/types';

const Map: FC = () => {

    const dispatch = useDispatch();
    const {post} = usePostSelector();
    useEffect(() => {
        if(post) {
            dispatch(getTripByPost(post));
        }
    }, [dispatch, post]);

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

    const center = {
        lat: 47.2238663,
        lng: 8.8156291,
    }

    const onMapLoad = useCallback(
        (map) => {
            setMapRef(map);
        },
        [],
    );



    const {trip} = useTripSelector();



    const onPolylineLoad = useCallback(
        () => {
            ///callback
        },
        [],
    );


    const drawPolyline = () => {

        const encodedPolyline = trip!.polyline;

        const decodedPath = google.maps.geometry.encoding.decodePath(encodedPolyline);

        const bounds = new google.maps.LatLngBounds();

        decodedPath.forEach((point) => {
            bounds.extend(point);
        });

        mapRef?.fitBounds(bounds);

        return decodedPath;
    }



    const renderMap = () => {
        return <GoogleMap
            mapContainerStyle={containerStyle}
            zoom={4}
            onLoad={onMapLoad}>
            { /* Child components, such as markers, info windows, etc. */}
            <></>
            <Polyline onLoad={onPolylineLoad} path={drawPolyline()}  />
        </GoogleMap>
    }

    if (loadError) {
        return <Alert variant="danger">Map cannot be loaded right now, sorry.</Alert>
    }

    return isLoaded ? renderMap() : <Loading/>
}

export default Map;
