import {FC, useCallback, useEffect, useState} from 'react';

import {GoogleMap, Marker, Polyline, useJsApiLoader} from '@react-google-maps/api';
import Alert from 'react-bootstrap/Alert';
import Loading from '../misc/Loading';
import {Trip} from '../../store/types';
import mapsOptions from './mapsOptions';

interface FormMapProps {
    trip: Trip,
    position: any;
    preDefinedPosition: any;
}

const FormMap: FC<FormMapProps> = ({trip, position, preDefinedPosition}: FormMapProps) => {

    const [mapRef, setMapRef] = useState<google.maps.Map>();
    const [zoom] = useState<number>(4);
    const [markerRef, setMarkerRef] = useState<google.maps.Marker>();
    const [libraries] = useState<('drawing' | 'geometry' | 'localContext' | 'places' | 'visualization')[]>(['geometry']);
    const [markerPosition, setMarkerPosition] = useState<google.maps.LatLng>();

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

    const onMapClick = (e: google.maps.MapMouseEvent) => {
        if (mapRef && e.latLng) {
            setMarkerPosition(e.latLng);
        }
    }

    const updatePosition = () => {
        const newPosition = markerRef!.getPosition();
        if (mapRef && newPosition) {
            setMarkerPosition(newPosition);
        }
    }

    const drawPolyline = (): google.maps.LatLng[] => {
        const encodedPolyline = trip!.polyline;
        const decodedPath = google.maps.geometry.encoding.decodePath(encodedPolyline);
        const bounds = new google.maps.LatLngBounds();
        decodedPath.forEach((point) => {
            bounds.extend(point);
        });
        mapRef!.fitBounds(bounds);
        return decodedPath;
    }

    useEffect(() => {
        if (isLoaded && preDefinedPosition) {
            setMarkerPosition(new google.maps.LatLng(preDefinedPosition.latitude, preDefinedPosition.longitude));
        }
    }, [isLoaded, preDefinedPosition]);


    useEffect(() => {
        position(markerPosition);
    }, [markerPosition, position])


    const renderMap = () => {

        return <GoogleMap
            mapContainerStyle={containerStyle}
            zoom={zoom}
            onLoad={onMapLoad}
            onClick={(e => onMapClick(e))}
            options={
                {...mapsOptions, draggableCursor: 'crosshair'}}>
            {trip && mapRef && <Polyline path={drawPolyline()}/>}
            {markerPosition && <Marker onLoad={(m) => setMarkerRef(m)} position={markerPosition} draggable={true}
                                       onDragEnd={updatePosition}/>}
        </GoogleMap>
    }


    if (loadError
    ) {
        return <Alert variant="danger">Map cannot be loaded right now, sorry.</Alert>
    }

    return (isLoaded && trip) ? renderMap() : <Loading/>
}

export default FormMap;
