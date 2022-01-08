import {FC, useCallback, useEffect, useState} from 'react';

import {GoogleMap, Marker, Polyline, useJsApiLoader} from '@react-google-maps/api';
import Alert from 'react-bootstrap/Alert';
import Loading from '../misc/Loading';
import useTripSelector from '../../hooks/useTripSelector';

interface FormMapProps {
    position: any;
}

const FormMap: FC<FormMapProps> = ({position}: FormMapProps) => {


    const {trip} = useTripSelector();

    const [mapRef, setMapRef] = useState<google.maps.Map>();
    const [zoom] = useState<number>(4);
    const [markerRef, setMarkerRef] = useState<google.maps.Marker>();
    const [libraries] = useState<('drawing' | 'geometry' | 'localContext' | 'places' | 'visualization')[]>(['geometry']);
    const [markerPosition, setMarkerPosition] = useState<google.maps.LatLng>();

    useEffect(() => {
        console.log('trip changed, load new "route"', trip);
    }, [trip]);

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
            mapRef.setCenter(e.latLng);
        }
    }

    const updatePosiiton = () => {
        const newPosition = markerRef!.getPosition();
        if(mapRef && newPosition) {
            setMarkerPosition(newPosition);
            mapRef.setCenter(newPosition);
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
        position(markerPosition);
    }, [markerPosition, position])


    const renderMap = () => {

        return <GoogleMap
            mapContainerStyle={containerStyle}
            zoom={zoom}
            onLoad={onMapLoad}
            onClick={(e => onMapClick(e))}
            options={{
                draggableCursor: 'crosshair'
            }}>
            {trip && mapRef && <Polyline path={drawPolyline()}/>}
            {markerPosition && <Marker onLoad={(m) => setMarkerRef(m)} position={markerPosition} draggable={true} onDragEnd={updatePosiiton}/>}
        </GoogleMap>
    }


    if (loadError) {
        return <Alert variant="danger">Map cannot be loaded right now, sorry.</Alert>
    }

    return (isLoaded && trip) ? renderMap() : <Loading/>
}

export default FormMap;
