import Navlinks from './Navlinks';

const wardName = 'Riverside Ward';

export default function Header() {
  const currentDate = new Intl.DateTimeFormat('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  }).format(new Date());

  return (
    <header className="border-b border-slate-200 bg-slate-900 text-white">
      <div className="mx-auto max-w-6xl px-6 pb-4 pt-8">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-slate-300">
              Sacrament Meeting
            </p>
            <h1 className="text-2xl font-semibold text-white">{wardName}</h1>
          </div>

          <div className="text-left md:text-right">
            <p className="text-xs uppercase tracking-[0.2em] text-slate-300">
              Current Date
            </p>
            <p className="text-sm font-medium text-slate-100">{currentDate}</p>
          </div>
        </div>

        <div className="mt-6">
          <Navlinks />
        </div>
      </div>
    </header>
  );
}
