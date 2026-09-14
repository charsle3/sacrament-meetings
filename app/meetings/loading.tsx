export default function Loading() {
  return (
    <main className="min-h-screen bg-slate-100 px-6 py-10">
      <div className="mx-auto max-w-5xl">
        <p className="text-sm font-semibold uppercase tracking-[0.25em] text-sky-700">
          Loading
        </p>
        <div className="mt-4 h-8 w-64 animate-pulse rounded bg-slate-200" />
        <div className="mt-6 space-y-4">
          <div className="h-28 animate-pulse rounded-xl bg-slate-200" />
          <div className="h-28 animate-pulse rounded-xl bg-slate-200" />
          <div className="h-28 animate-pulse rounded-xl bg-slate-200" />
        </div>
      </div>
    </main>
  );
}