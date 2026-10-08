'use client';

import { useActionState } from 'react';
import { authenticate } from '@/lib/actions';

export function LoginForm() {
  const [errorMessage, formAction, isPending] = useActionState(
    authenticate,
    undefined,
  );

  return (
    <form action={formAction}>
      <div>
        <label htmlFor="email">Email</label>
        <input className="border border-gray-300 rounded px-3 py-2 w-full" id="email" type="email" name="email" required />
      </div>
      <div>
        <label htmlFor="password">Password</label>
        <input className="border border-gray-300 rounded px-3 py-2 w-full" id="password" type="password" name="password" minLength={6} required />
      </div>
      <button className="bg-blue-500 text-white px-4 py-2 mt-2 rounded" aria-disabled={isPending} type="submit">
        {isPending ? 'Signing in...' : 'Sign In'}
      </button>
      {errorMessage && <p role="alert">{errorMessage}</p>}
    </form>
  );
}