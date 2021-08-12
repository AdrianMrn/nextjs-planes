import Head from 'next/head';
import { useEffect, useState } from 'react';
import { getLocation, getPlanes } from '../helpers/util';

export default function Home() {
    const [isLoading, setIsLoading] = useState(false);
    const [coordinates, setCoordinates] = useState<Coordinates | null>(null);
    const [errorMessage, setErrorMessage] = useState('');
    const [planes, setPlanes] = useState<Array<Plane>>([]);
    const [radius, setRadius] = useState('10000');

    async function boot() {
        setIsLoading(true);
        setErrorMessage('');

        try {
            setCoordinates(await getLocation());
        } catch (error) {
            setErrorMessage(error.message);
        } finally {
            setIsLoading(false);
        }
    }

    useEffect(() => {
        // todo: refresh every x seconds
        if (coordinates) {
            try {
                getPlanes(coordinates, radius).then(setPlanes);
            } catch (error) {
                setErrorMessage(error.message);
            }
        }
    }, [coordinates, radius]);

    return (
        <div>
            <Head>
                <title>Next Planes</title>
                <meta name="description" content="Planes!" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <main className="p-4">
                <div>
                    <label htmlFor="radius">Radius in meters (todo):</label>
                    <input
                        id="radius"
                        className="ml-2 p-1 border"
                        type="text"
                        value={radius}
                        onChange={e => setRadius(e.target.value)}
                    />
                </div>

                <button className="border rounded p-2 text-white shadow bg-blue-500 hover:bg-blue-600" onClick={boot}>
                    Start
                </button>

                <ul>
                    {planes.map((plane, i) => (
                        <li key={i}>{plane.callsign}</li>
                    ))}
                </ul>

                {isLoading && <p>Loading…</p>}
                {errorMessage && <p className="text-red-500">{errorMessage}</p>}
            </main>
        </div>
    );
}
