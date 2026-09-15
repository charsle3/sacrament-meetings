import { redirect } from 'next/navigation';
import MeetingDetail from '../../../components/MeetingDetail';
import { SacramentMeeting } from '@/lib/types';

export default async function MeetingDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
    const { id } = await params;
    const meetingId = Number(id);
    
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
    const response = await fetch(`${baseUrl}/api/meetings/${meetingId}`, {
        cache: 'no-store',
    });

    const meeting: SacramentMeeting = await response.json();

    if (!meeting) {
        redirect('/meetings');
    }

  return <MeetingDetail meeting={meeting} />;
}
