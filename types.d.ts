type Coordinates = { latitude: number; longitude: number };

type Plane = {
    id: string;
    callsign: string;
    latitude: number;
    longitude: number;
    track: number;
    speed: number;
    altitude: number;
    type: string;
    origin: string;
    destination: string;
    verticalSpeed: number;
    airline: string;
    transponderCode: string;
};

type APIResponse = {
    /* full_count: number;
    version: number;
    stats: {}; */
    [id: string]: ApiResponsePlane;
};

type ApiResponsePlane = [
    icao_address: string,
    lat: number,
    lng: number,
    track: number,
    altitude: number,
    ground_speed: number,
    transponder_code: string, // Would be cool to include the status: https://en.wikipedia.org/wiki/List_of_transponder_codes
    source_id: string, // radar/feeder/…
    aircraft_type: string,
    registration: string,
    timestamp: number,
    origin: string,
    destination: string,
    flight_number: string,
    unknown: number,
    vertical_speed: number, // < -128 = descending, > 128 = ascending
    callsign: string,
    unknown: number,
    airline: string
];
