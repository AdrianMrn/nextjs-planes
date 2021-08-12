export async function getLocation(): Promise<Coordinates> {
    return new Promise(resolve => {
        navigator.geolocation?.getCurrentPosition(
            success => {
                const { latitude, longitude } = success.coords;
                resolve({ latitude, longitude });
            },
            error => {
                console.error(error);

                throw error;
            }
        );
    });
}

export async function getPlanes(coordinates: Coordinates, radius: string) {
    const response = await fetch(
        `/api/planes?latitude=${coordinates.latitude}&longitude=${coordinates.longitude}&radius=${radius}`
    );
    const { planes } = await response.json();

    return planes;
}

export function convertApiResponseToPlane(id: string, apiPlane: ApiResponsePlane): Plane {
    const [
        _icao_address, // Not used
        lat,
        lng,
        track,
        altitude,
        ground_speed,
        transponder_code,
        _source_id, // Not used
        aircraft_type,
        _registration, // Not used
        _timestamp, // Not used
        origin,
        destination,
        _flight_number, // Not used
        _unknown1, // Not used
        vertical_speed,
        callsign,
        _unknown2, // Not used
        airline,
    ] = apiPlane;

    return {
        id,
        callsign,
        latitude: lat,
        longitude: lng,
        track, // TODO: give wind direction
        speed: ground_speed,
        altitude,
        type: aircraft_type, // TODO: get more info about plane + image?
        origin,
        destination,
        verticalSpeed: vertical_speed,
        airline,
        transponderCode: transponder_code,
    };
}
