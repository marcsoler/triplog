import {GoogleMap, useJsApiLoader} from '@react-google-maps/api';
import {useCallback} from 'react';
import Alert from 'react-bootstrap/Alert';
import Loading from '../misc/Loading';

const Map = () => {

    const {isLoaded, loadError} = useJsApiLoader({
        googleMapsApiKey: process.env.REACT_APP_MAPS_API_KEY ? process.env.REACT_APP_MAPS_API_KEY : '',
    });


    const containerStyle = {
        width: '100%',
        height: '400px',
    }

    const center = {
        lat: 47.2238663,
        lng: 8.8156291,
    }

    const onLoad = useCallback(
        () => {
            console.log('Google maps loaded...');
        },
        [],
    );

    const renderMap = () => {
        return <GoogleMap
            mapContainerStyle={containerStyle}
            center={center}
            zoom={4}
            onLoad={onLoad}>
            { /* Child components, such as markers, info windows, etc. */ }
            <></>
        </GoogleMap>
    }

    if (loadError) {
        return <Alert variant="danger">Map cannot be loaded right now, sorry.</Alert>
    }

    return isLoaded ? renderMap() : <Loading />
}

export default Map;
