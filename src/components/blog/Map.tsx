import {GoogleMap, LoadScript} from '@react-google-maps/api';
import {useState} from 'react';

const Map = () => {

    const containerStyle = {
        width: '100%',
        height: '400px',
    }

    const center = {
        lat: 47.2238663,
        lng: 8.8156291,
    }

    return (
        // @ts-ignore
        <LoadScript googleMapsApiKey={process.env.REACT_APP_MAPS_API_KEY}>
            <GoogleMap
                mapContainerStyle={containerStyle}
                center={center}
                zoom={14}
            />
        </LoadScript>
    )
}

export default Map;
