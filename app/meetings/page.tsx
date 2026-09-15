import type { SacramentMeeting } from '../../lib/types.ts';
import MeetingCard from '../../components/MeetingCard';

export default async function Meetings() {
    const baseUrl = process.env.URL;
    const response = await fetch(`https://sacrament-meetings-git-peer-code-review-suburbians.vercel.app//api/meetings`, {
        cache: 'no-store',
    });

    if (!response.ok) {
        throw new Error('Failed to fetch meetings');
    }

    const meetings: SacramentMeeting[] = await response.json();

    return (
        <main className="max-w-4xl mx-auto px-4 py-12">
            <h2 className="mb-4 pl-2 pt-2 text-3xl font-bold text-slate-900">
                Sacrament Meetings
            </h2>
            {meetings.length === 0 ? (
                <p className="text-slate-200">No meetings found.</p>
            ) : (
                <ul className="space-y-4">
                {meetings.map((meeting) => (
                    <li key={meeting.id} className="">
                    <MeetingCard meeting={meeting} />
                    </li>
                ))}
                </ul>
            )}
        </main>
    );
}