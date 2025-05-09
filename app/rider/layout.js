'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

export default function RiderLayout({ children }) {
  const router = useRouter();
  const user = useSelector(state => state.user.user);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user || user.role !== 'rider') {
      router.push('/login');
    } else {
      setLoading(false);
    }
  }, [user, router]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex">
      <aside className="w-64 h-screen bg-gray-900 text-white p-4">
        <h2 className="text-xl font-bold mb-4">Rider Panel</h2>
        <ul className="space-y-2">
          <li><a href="/rider/orders" className="hover:underline">Assigned Orders</a></li>
          {/* Add other sections like profile, past orders etc. */}
        </ul>
      </aside>
      <main className="ml-64 p-4 w-full">{children}</main>
    </div>
  );
}
