'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const links = [
  { href: '/', label: 'Home' },
  { href: '/meetings', label: 'Meetings' },
  { href: '/meetings/current', label: 'Current Meeting' },
];

export default function Navlinks() {
  const pathname = usePathname();

  return (
    <nav aria-label="Main navigation" className="mt-4 md:mt-0">
      <ul className="flex flex-wrap items-center gap-3 text-sm font-medium text-slate-200">
        {links.map(({ href, label }) => {
          const isActive = href === '/' ? pathname === '/' : pathname.startsWith(href);

          return (
            <li key={href}>
              <Link
                href={href}
                className={[
                  'rounded-full border px-3 py-1.5 transition',
                  isActive
                    ? 'border-sky-400 bg-sky-500 text-black shadow-sm'
                    : 'border-slate-700 text-slate-200 hover:border-slate-500 hover:bg-slate-800 hover:text-white',
                ].join(' ')}
              >
                {label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
