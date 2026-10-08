import Link from "next/link";
import { SignOutButton } from "../../components/sign-out-button";
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Admin Dashboard',
};

export default function DashboardPage() {
  return (
    <div className="p-8">
      <Link href="/admin/meetings/new" className="bg-blue-500 text-white ml-10 px-4 py-2 mb-2 rounded">
        Create New Meeting
      </Link>
      <SignOutButton />
    </div>
  );
}