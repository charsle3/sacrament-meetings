import Link from 'next/link';
import type { SacramentMeeting } from '../lib/types';

function formatDate(value: string) {
  const [year, month, day] = value.split('-').map(Number);

  const date = new Date(year, month - 1, day);

  return new Intl.DateTimeFormat('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  }).format(date);
}

export default function MeetingCard({ meeting }: { meeting: SacramentMeeting }) {
  return (
    <article className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition hover:shadow-md">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-sky-700">
            {meeting.meetingType}
          </p>
          <h2 className="mt-2 text-xl font-semibold text-slate-900">{formatDate(meeting.date)}</h2>
        </div>

        <span className="rounded-full bg-slate-100 px-2 py-1 text-xs font-medium text-slate-700">
          #{meeting.id}
        </span>
      </div>

      <div className="mt-5 flex flex-wrap gap-3">
        <Link
          href={`/meetings/${meeting.id}`}
          className="rounded-full bg-slate-900 px-3 py-2 text-sm font-medium text-white transition hover:bg-slate-700"
        >
          View Meeting Details
        </Link>
      </div>
    </article>
  );
}
