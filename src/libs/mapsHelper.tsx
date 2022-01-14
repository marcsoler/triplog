const apiKey: string = process.env.REACT_APP_MAPS_API_KEY ? process.env.REACT_APP_MAPS_API_KEY : '';

export const isValidLocation = (location: google.maps.LatLng, isValid: () => void) => {
    const endpoint = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${location.lat()},${location.lng()}&key=${apiKey}`;
    fetch(endpoint).then((response) => {
        return response.json().then((response: google.maps.GeocoderResponse) => {
            return response.results.forEach((r) => {
                if(r.types.includes('route')) {
                    isValid();
                }
            })
        });
    }).catch((error) => {
        console.error('Error here!', error);
    })
}

export const generateRoute = (waypoints: google.maps.LatLng[], mode: google.maps.TravelMode, routeResponse: (r: google.maps.DirectionsResult) => any) => {

    const directionService = new google.maps.DirectionsService();

    const betweenWps: google.maps.DirectionsWaypoint[] = [];

    waypoints.slice(1, -1).forEach((wp) => {
        betweenWps.push({
            location: wp,
            stopover: false,
        });
    });
    directionService.route({
        origin: waypoints[0],
        waypoints: betweenWps,
        optimizeWaypoints: true,
        destination: waypoints[waypoints.length - 1],
        travelMode: mode ? mode : google.maps.TravelMode.BICYCLING,
    }, (response, status) => {
        if (status === google.maps.DirectionsStatus.OK && response) {
            routeResponse(response);
        }
    }).catch((error) => {
        console.log('Error here!', error);
    })
}
