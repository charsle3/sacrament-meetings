import { signOut } from '@/auth';

export function SignOutButton() {
  return (
    <form
      action={async () => {
        'use server';
        await signOut({ redirectTo: '/' });
      }}
    >
      <button className="bg-red-500 text-white px-4 py-2 mt-2 ml-10 rounded" type="submit">Sign Out</button>
    </form>
  );
}