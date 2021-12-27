import {FC, useState} from 'react';

import {DirectionsRenderer, DirectionsService, GoogleMap} from '@react-google-maps/api';

const CreateTrip: FC = () => {

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
        setResponse(response);
    }

    return (
        <>
            <GoogleMap
                mapContainerStyle={containerStyle}
                center={center}
                zoom={4}
            />
        </>
    )
}

export default CreateTrip;
