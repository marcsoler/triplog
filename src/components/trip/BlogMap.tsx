import {FC, useCallback, useEffect, useState} from 'react';

import {GoogleMap, Marker, Polyline, useJsApiLoader} from '@react-google-maps/api';
import Alert from 'react-bootstrap/Alert';
import Loading from '../misc/Loading';
import useTripSelector from '../../hooks/useTripSelector';
import {useDispatch} from 'react-redux';
import usePostSelector from '../../hooks/usePostSelector';
import {getTripByPost} from '../../store/actions/tripActions';
import {Post} from '../../store/types';

import {defaultMapOptions, mapContainerStyle} from './mapsOptions';
import mapStyle from './mapStyle.json';

const BlogMap: FC = () => {

    const dispatch = useDispatch();
    const {post} = usePostSelector();

    useEffect(() => {
        if (post) {
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

    const onMapLoad = useCallback(
        (map) => {
            setMapRef(map);
            map.mapTypes.set('styled_map', new google.maps.StyledMapType(mapStyle));
            map.setMapTypeId('styled_map');
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

    const getPostPosition = (p: Post): google.maps.LatLng => {
        return new google.maps.LatLng(post?.position._lat, post?.position._long);
    }


    const renderMap = () => {
        return (<GoogleMap
            mapContainerStyle={mapContainerStyle}
            zoom={4}
            onLoad={onMapLoad}
            options={defaultMapOptions}>
            <Polyline path={drawPolyline()} options={{strokeColor: '#600'}} />
            {post && <Marker position={getPostPosition(post)} animation={google.maps.Animation.BOUNCE}/>}
        </GoogleMap>)
    }

    if (loadError) {
        return <Alert variant="danger">Map cannot be loaded right now, sorry.</Alert>
    }

    return (isLoaded && trip) ? renderMap() : <Loading/>
}

export default BlogMap;
