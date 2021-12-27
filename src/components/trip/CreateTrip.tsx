import {FC, useCallback, useState} from 'react';

import Alert from 'react-bootstrap/Alert';
import Loading from '../misc/Loading';

import {DirectionsRenderer, DirectionsService, GoogleMap, useJsApiLoader} from '@react-google-maps/api';

const CreateTrip: FC = () => {

    const [directionsLoaded, setDirectionsLoaded] = useState(false);

    const {isLoaded, loadError} = useJsApiLoader({
        googleMapsApiKey: process.env.REACT_APP_MAPS_API_KEY ? process.env.REACT_APP_MAPS_API_KEY : '',
    });

    const [response, setResponse] = useState(undefined);

    const containerStyle = {
        width: '100%',
        height: '400px',
    }

    const center = {
        lat: 47.2238663,
        lng: 8.8156291,
    }


    const directionCallback = (response: any) => {
        console.log('loaded dir');
        if(response.status === 'OK') {
            setDirectionsLoaded(true);
            setResponse(response);
        }
    }


    const renderMap = () => {
        console.log('renders..');

        return (
            <GoogleMap
                id="gmap-planner"
                mapContainerStyle={containerStyle}
                center={center}
                zoom={4}>
                { /* Child components, such as markers, info windows, etc. */}

                {!directionsLoaded && (
                    <DirectionsService
                        options={{
                            destination: 'Steinhausen, Switzerland',
                            origin: 'Ilanz, Switzerland',
                            travelMode: google.maps.TravelMode.DRIVING,
                        }}
                        callback={directionCallback}
                    />)}

                { directionsLoaded && <DirectionsRenderer directions={response} /> }

            </GoogleMap>
        )
    }

    if (loadError) {
        return <Alert variant="danger">Map cannot be loaded right now, sorry.</Alert>
    }

    return isLoaded ? renderMap() : <Loading/>
}

export default CreateTrip;
