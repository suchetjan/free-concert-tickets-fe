'use client';

import { useState, useEffect } from 'react';

export default function HistoryPage() {
  const [reservations, setReservations] = useState([]);
  const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

  useEffect(() => {
    fetch(`${backendUrl}/reservations`)
      .then(res => res.json())
      .then(data => setReservations(data));
  }, []);

  return (
    <div className="flex min-h-screen bg-gray-50">

      <main className="flex-1 p-8">
        <h1 className="text-2xl font-bold mb-6">History</h1>
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <table className="w-full text-left">
            <thead className="bg-gray-50 border-b">
              <tr>
                <th className="p-4">Date time</th>
                <th className="p-4">Username</th>
                <th className="p-4">Concert name</th>
                <th className="p-4">Action</th>
              </tr>
            </thead>
            <tbody>
              {reservations.flatMap((res: any) => {
                const rows = [];

                if (res.status === 'cancelled' && res.cancelledAt) {
                  rows.push(
                    <tr key={`${res.id}-can`} className="border-b bg-red-50/30">
                      <td className="p-4 text-sm text-gray-600">
                        {new Date(res.cancelledAt).toLocaleString()}
                      </td>
                      <td className="p-4">{res.userId}</td>
                      <td className="p-4">{res.concert.name}</td>
                      <td className="p-4">
                        <span className="text-red-600 font-medium uppercase">Cancelled</span>
                      </td>
                    </tr>
                  );
                }

                rows.push(
                  <tr key={`${res.id}-res`} className="border-b">
                    <td className="p-4 text-sm text-gray-600">
                      {new Date(res.reservedAt).toLocaleString()}
                    </td>
                    <td className="p-4">{res.userId}</td>
                    <td className="p-4">{res.concert.name}</td>
                    <td className="p-4">
                      <span className="text-green-600 font-medium">Reserved</span>
                    </td>
                  </tr>
                )

                return rows;
              })}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}