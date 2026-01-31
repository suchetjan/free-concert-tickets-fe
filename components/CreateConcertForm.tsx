'use client';

import { useState } from 'react';

export default function CreateConcertForm() {
  const [formData, setFormData] = useState({ name: '', description: '', totalSeats: 500 });
  const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch(`${backendUrl}/concerts`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    });

    if (res.ok) {
      alert("Concert created successfully!");
      setFormData({ name: '', description: '', totalSeats: 500 }); // Reset
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-8 pb-12 rounded-lg shadow-sm border max-w-2xl">
      <h3 className="text-xl font-bold mb-6">Create Concert</h3>
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Concert Name</label>
          <input 
            type="text" 
            className="w-full p-2 border rounded" 
            placeholder="Please input concert name"
            value={formData.name}
            onChange={(e) => setFormData({...formData, name: e.target.value})}
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Description</label>
          <textarea 
            className="w-full p-2 border rounded h-32" 
            placeholder="Please input description"
            value={formData.description}
            onChange={(e) => setFormData({...formData, description: e.target.value})}
          />
        </div>
        <div className="w-1/3">
          <label className="block text-sm font-medium mb-1">Total of seat</label>
          <input 
            type="number" 
            className="w-full p-2 border rounded"
            value={formData.totalSeats}
            onChange={(e) => setFormData({...formData, totalSeats: +e.target.value})}
          />
        </div>
        <button type="submit" className="bg-blue-500 text-white px-8 py-2 rounded float-right">
          Save
        </button>
      </div>
    </form>
  );
}