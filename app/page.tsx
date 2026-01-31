'use client';

import { useState, useEffect } from 'react';

import { useRole } from '@/context/RoleContext';
import ConcertCard from '@/components/ConcertCard';
import CreateConcertForm from '@/components/CreateConcertForm';
import AdminStats from '@/components/AdminStats';

export default function HomePage() {
  const { role } = useRole();
  const [activeTab, setActiveTab] = useState<'Overview' | 'Create'>('Overview');
  const [concerts, setConcerts] = useState<any[]>([]);
  const [stats, setStats] = useState({ totalSeats: 0, reserved: 0, cancelled: 0 });
  const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [concertRes, statsRes] = await Promise.all([
          fetch(`${backendUrl}/concerts`),
          fetch(`${backendUrl}/reservations/stats`),
        ]);

        setConcerts(await concertRes.json());
        setStats(await statsRes.json());
      } catch (err) {
        console.error("Failed to fetch data", err);
      }
    };
    fetchData();
  }, []);

  const fetchConcerts = async () => {
    const res = await fetch(`${backendUrl}/concerts`);
    setConcerts(await res.json());
  };

  return (
    <div className="flex bg-gray-50 min-h-screen">

      <main className="flex-1 p-8">
        {role === 'Admin' && (
          <>
            <AdminStats
              totalSeats={stats.totalSeats}
              reserved={stats.reserved}
              cancelled={stats.cancelled}
            />

            <div className="border-b mb-6 flex gap-8">
              <button
                onClick={() => setActiveTab('Overview')}
                className={`pb-2 font-medium transition-all ${activeTab === 'Overview' ? 'border-b-2 border-blue-500 text-blue-600' : 'text-gray-400'}`}
              >
                Overview
              </button>
              <button
                onClick={() => setActiveTab('Create')}
                className={`pb-2 font-medium transition-all ${activeTab === 'Create' ? 'border-b-2 border-blue-500 text-blue-600' : 'text-gray-400'}`}
              >
                Create
              </button>
            </div>
          </>
        )}

        {role === 'Admin' ? (
          activeTab === 'Overview' ? (
            <div className="grid gap-6">
              {concerts.map((concert: any) => (
                <ConcertCard key={concert.id} concert={concert} role="Admin" onRefresh={fetchConcerts} />
              ))}
            </div>
          ) : (
            <CreateConcertForm />
          )
        ) : (
          <div className="grid gap-6">
            <h2 className="text-xl font-bold mb-4 text-blue-600">Concert List</h2>
            {concerts.map((concert: any) => (
              <ConcertCard key={concert.id} concert={concert} role="User" onRefresh={fetchConcerts} />
            ))}
          </div>
        )}
      </main>
    </div>
  );
}