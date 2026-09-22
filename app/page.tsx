import Image from 'next/image';
import Link from 'next/link';

export default function Home() {
  return (
    <main className="min-h-screen text-slate-900">
      <section className="mx-auto grid max-w-6xl gap-8 px-6 py-12 md:grid-cols-2 md:items-center md:py-20">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-sky-700">
            Riverside Ward
          </p>
          <h1 className="mt-4 text-4xl font-bold tracking-tight text-slate-900 md:text-6xl">
            Sacrament Meeting Schedule
          </h1>
          <p className="mt-5 max-w-xl text-lg text-slate-600">
            Stay connected with upcoming worship services, meeting details, and the latest
            announcements from the ward.
          </p>

          <div className="mt-8 flex flex-wrap gap-4">
            <Link
              href="/meetings"
              className="rounded-full bg-slate-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-700"
            >
              View Meetings
            </Link>
            <Link
              href="/meetings/current"
              className="rounded-full border border-slate-300 bg-white px-5 py-3 text-sm font-semibold text-slate-700 transition hover:border-slate-400 hover:bg-slate-50"
            >
              Current Meeting
            </Link>
          </div>
        </div>

        <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-xl">
          <Image
            src="/chapel.webp"
            alt="Ward chapel"
            width={1200}
            height={900}
            fetchPriority="high"
            className="h-[420px] w-full object-cover md:h-[560px]"
          />
        </div>
      </section>
    </main>
  );
}
