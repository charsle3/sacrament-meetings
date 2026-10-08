import { getMeetingById } from "@/lib/meetings-db";
import { notFound } from "next/navigation";
import EditForm from "@/components/EditForm";

export default async function EditMeeting({ params, }: { params: Promise<{ id: string }>; }) {
    const { id } = await params;
    const meetingId = Number(id);
    const meeting = await getMeetingById(meetingId);

    if (!meeting) {
        return notFound();
    }

    return <EditForm meeting={meeting} />;

}