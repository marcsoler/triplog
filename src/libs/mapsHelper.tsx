const apiKey: string = process.env.REACT_APP_MAPS_API_KEY ? process.env.REACT_APP_MAPS_API_KEY : '';

export const isValidLocation = (location: google.maps.LatLng, isValid: () => void, onError: (msg: string) => void) => {
    const endpoint = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${location.lat()},${location.lng()}&key=${apiKey}`;
    fetch(endpoint).then((response) => {
        return response.json().then((response: google.maps.GeocoderResponse) => {
            let foundRoute = false;
            response.results.forEach((r) => {
                if(r.types.includes('route')) {
                    foundRoute = true;
                }
            });
            foundRoute ? isValid() : onError('The location you clicked has no nearby road. Try again.');
        });
    }).catch((error) => {
        console.error('An error happened!', error);
        onError(error);
    });
}

export const generateRoute = (waypoints: google.maps.LatLng[], mode: google.maps.TravelMode, routeResponse: (r: google.maps.DirectionsResult) => any, onError: (msg: string) => void) => {

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
        onError(error);
    })
}
