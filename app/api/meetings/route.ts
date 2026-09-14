import { getMeetings } from '../../../lib/meetings-db';

export async function GET(request: Request) {
    const date = new URL(request.url).searchParams.get('date'); // for example, "2026-05-03" or null
    if (!date) {
        return Response.json(getMeetings());
    }
    return Response.json(getMeetings(date));
}