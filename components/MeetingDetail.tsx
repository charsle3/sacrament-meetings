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

function renderHymn(title: string, hymn: SacramentMeeting['openingHymn']) {
  return (
    <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
      <p className="text-xs uppercase tracking-[0.2em] text-slate-500">{title}</p>
      <p className="mt-2 text-lg font-semibold text-slate-900">#{hymn.number}</p>
      <p className="text-slate-700">{hymn.title}</p>
    </div>
  );
}

export default function MeetingDetail({ meeting }: { meeting: SacramentMeeting }) {
  return (
    <article className="mx-auto max-w-4xl px-6 py-10 text-slate-800">
      <header className="mb-8 border-b border-slate-200 pb-6">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-sky-700">
          {meeting.meetingType} Meeting
        </p>
        <h1 className="mt-2 text-3xl font-bold text-slate-900">{formatDate(meeting.date)}</h1>
      </header>

      <section className="grid gap-6 md:grid-cols-2">
        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
          <h2 className="text-lg font-semibold text-slate-900">Meeting Leadership</h2>
          <dl className="mt-4 space-y-3 text-sm">
            <div>
              <dt className="font-medium text-slate-500">Presiding</dt>
              <dd className="text-slate-900">{meeting.presiding}</dd>
            </div>
            <div>
              <dt className="font-medium text-slate-500">Conducting</dt>
              <dd className="text-slate-900">{meeting.conducting}</dd>
            </div>
            <div>
              <dt className="font-medium text-slate-500">Stake Business</dt>
              <dd className="text-slate-900">{meeting.stakeBusiness ? 'Yes' : 'No'}</dd>
            </div>
          </dl>
        </div>

        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
          <h2 className="text-lg font-semibold text-slate-900">Prayers</h2>
          <dl className="mt-4 space-y-3 text-sm">
            <div>
              <dt className="font-medium text-slate-500">Opening Prayer</dt>
              <dd className="text-slate-900">{meeting.openingPrayer}</dd>
            </div>
            <div>
              <dt className="font-medium text-slate-500">Closing Prayer</dt>
              <dd className="text-slate-900">{meeting.closingPrayer}</dd>
            </div>
          </dl>
        </div>
      </section>

      <section className="mt-8">
        <h2 className="text-xl font-semibold text-slate-900">Hymns</h2>
        <div className="mt-4 grid gap-4 md:grid-cols-3">
          {renderHymn('Opening Hymn', meeting.openingHymn)}
          {renderHymn('Sacrament Hymn', meeting.sacramentHymn)}
          {renderHymn('Closing Hymn', meeting.closingHymn)}
        </div>
      </section>

      <section className="mt-8 grid gap-8 md:grid-cols-2">
        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
          <h2 className="text-xl font-semibold text-slate-900">Ward Business</h2>
          {meeting.wardBusiness.length > 0 ? (
            <ul className="mt-4 list-disc space-y-2 pl-5 text-slate-700">
              {meeting.wardBusiness.map((item, index) => (
                <li key={`${item.description}-${index}`}>{item.description}</li>
              ))}
            </ul>
          ) : (
            <p className="mt-4 text-slate-600">No ward business announced.</p>
          )}
        </div>

        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
          <h2 className="text-xl font-semibold text-slate-900">Announcements</h2>
          {meeting.announcements && meeting.announcements.length > 0 ? (
            <ul className="mt-4 list-disc space-y-2 pl-5 text-slate-700">
              {meeting.announcements.map((item, index) => (
                <li key={`${item}-${index}`}>{item}</li>
              ))}
            </ul>
          ) : (
            <p className="mt-4 text-slate-600">No announcements.</p>
          )}
        </div>
      </section>

      <section className="mt-8 rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
        <h2 className="text-xl font-semibold text-slate-900">Speakers</h2>
        {meeting.speakers.length > 0 ? (
          <ul className="mt-4 space-y-3">
            {meeting.speakers.map((speaker, index) => (
              <li key={`${speaker.name}-${index}`} className="rounded-lg border border-slate-200 bg-slate-50 p-3">
                <div className="flex items-center justify-between gap-4">
                  <p className="font-semibold text-slate-900">{speaker.name}</p>
                  <span className="rounded-full bg-slate-200 px-2 py-1 text-xs uppercase tracking-wide text-slate-700">
                    {speaker.type === 'musical-number' ? 'Musical Number' : 'Speaker'}
                  </span>
                </div>
                {speaker.topic ? (
                  <p className="mt-2 text-sm text-slate-600">Topic: {speaker.topic}</p>
                ) : (
                  <p className="mt-2 text-sm text-slate-500">No topic provided.</p>
                )}
              </li>
            ))}
          </ul>
        ) : (
          <p className="mt-4 text-slate-600">No speakers listed.</p>
        )}
      </section>
    </article>
  );
}
