'use client';

import Link from 'next/link';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="p-4 bg-red-100 border border-red-400 text-red-700 rounded justify-center flex flex-col items-center">
      <h2>Something went wrong!</h2>
      <p>{error.message}</p>

      <button onClick={() => reset()}>
        Try Again
      </button>

      <Link href="/meetings">
        Back to Meetings
      </Link>
    </div>
  );
}

