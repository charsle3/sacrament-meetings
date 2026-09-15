import { redirect } from 'next/navigation';
import type { SacramentMeeting } from '../../../lib/types';

export default async function CurrentMeetingPage() {
    const response = await fetch(`/api/meetings`, {
        cache: 'no-store',
    });
    const meetings: SacramentMeeting[] = await response.json();

    const today = new Date();
    const dayOfWeek = today.getDay(); // 0 (Sun) through 6 (Sat)

    const lastSunday = new Date(today);
    lastSunday.setDate(today.getDate() - dayOfWeek); // roll back to Sunday

    const currentMeeting = meetings.find((meeting) => {
        const meetingDate = new Date(meeting.date);
        return meetingDate.toDateString() === lastSunday.toDateString();
    });

    if (!currentMeeting) {
        if (!(meetings.length - 1)) {
            redirect('/meetings');;
        }
        redirect(`/meetings/${meetings[meetings.length - 1].id}`);
    }

    redirect(`/meetings/${currentMeeting.id}`);
}