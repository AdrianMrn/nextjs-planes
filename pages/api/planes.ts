// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import { convertApiResponseToPlane } from '../../helpers/util';

type Data = {
    planes: Array<Plane>;
};

type ErrorMessage = {
    message: string;
};

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data | ErrorMessage>) {
    const { latitude, longitude, radius } = req.query;

    // todo: radius

    if (!latitude || !longitude) {
        return res.status(422).json({ message: 'Invalid request, latitude and longitude are required' });
    }

    const url = process.env
        .API!.replace('_minLat_', `${(Number(latitude) - 0.1).toFixed(3)}`)
        .replace('_maxLat_', `${(Number(latitude) + 0.1).toFixed(3)}`)
        .replace('_minLng_', `${(Number(longitude) - 0.1).toFixed(3)}`)
        .replace('_maxLng_', `${(Number(longitude) + 0.1).toFixed(3)}`);

    const apiResult = (await (await fetch(url)).json()) as APIResponse;

    const planes: Array<Plane> = [];
    Object.entries(apiResult).forEach(([key, value]) => {
        if (!['full_count', 'version', 'stats'].includes(key)) {
            planes.push(convertApiResponseToPlane(key, value));
        }
    });

    res.status(200).json({ planes });
}
