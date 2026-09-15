import { NextRequest, NextResponse } from 'next/server';
import { getMeetingById } from '../../../../lib/meetings-db';

export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {

    const { id } = await params;
    const meetingId = Number(id);
    if (Number.isNaN(meetingId)) {
        return NextResponse.json({ error: 'Invalid id' }, { status: 400 });
    }

    const meeting = getMeetingById(meetingId);
    
    if (!meeting) {
        return NextResponse.json(null);
    }

    return NextResponse.json(meeting);
}