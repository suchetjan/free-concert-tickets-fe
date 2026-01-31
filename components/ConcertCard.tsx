'use client';

import { useState } from 'react';
import { Users } from 'lucide-react';

interface ConcertCardProps {
  concert: any;
  role: 'Admin' | 'User';
  onRefresh: () => void;
}

export default function ConcertCard({ concert, role, onRefresh }: ConcertCardProps) {
  const [loading, setLoading] = useState(false);
  const userId = process.env.NEXT_PUBLIC_USER_ID;
  const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

  const userReservation = concert.reservations?.find(
    (r: any) => r.userId === userId && r.status === 'reserved'
  );
  
  const isReserved = !!userReservation;

  const activeReservationsCount = concert.reservations?.filter(
    (r: any) => r.status === 'reserved'
  ).length || 0;
  
  const availableSeats = concert.totalSeats - activeReservationsCount;

  const handleAction = async () => {
    setLoading(true);
    try {
      if (role === 'Admin') {
        const res = await fetch(`${backendUrl}/concerts/${concert.id}`, { method: 'DELETE' });
        if (res.ok) {
          alert('Concert deleted successfully');
          onRefresh();
        }
      } else if (isReserved) {
        const res = await fetch(`${backendUrl}/reservations/${userReservation.id}`, { method: 'DELETE' });
        if (res.ok) {
          alert('Reservation cancelled');
          onRefresh();
        }
      } else {
        const res = await fetch(`${backendUrl}/reservations`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ concertId: concert.id, userId }),
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.message);
        alert('Reserved successfully!');
        onRefresh();
      }
    } catch (err: any) {
      alert(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 flex justify-between items-start">
      <div className="space-y-2">
        <h3 className="text-xl font-bold text-blue-600">{concert.name}</h3>
        <p className="text-gray-600 max-w-2xl">{concert.description}</p>
        <div className="flex items-center text-gray-500 text-sm">
          <Users size={16} className="mr-2" />
          <span>{availableSeats} seats available</span>
        </div>
      </div>

      <button
        onClick={handleAction}
        disabled={loading || (role === 'User' && !isReserved && availableSeats <= 0)}
        className={`px-6 py-2 rounded-md transition-colors font-medium min-w-[120px] text-white ${
          role === 'Admin' || isReserved
            ? 'bg-red-500 hover:bg-red-600' 
            : 'bg-blue-500 hover:bg-blue-600'
        } disabled:bg-gray-300`}
      >
        {loading ? '...' : role === 'Admin' ? 'Delete' : isReserved ? 'Cancel' : 'Reserve'}
      </button>
    </div>
  );
}