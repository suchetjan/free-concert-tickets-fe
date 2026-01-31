import { User, Ticket, XCircle } from 'lucide-react';

interface StatsProps {
  totalSeats: number;
  reserved: number;
  cancelled: number;
}

export default function AdminStats({ totalSeats, reserved, cancelled }: StatsProps) {
  return (
    <div className="grid grid-cols-3 gap-6 mb-10">
      {/* Total Seats Card */}
      <div className="bg-[#1D719E] p-6 rounded-lg text-white flex flex-col items-center shadow-lg">
        <User size={24} className="mb-2" />
        <span className="text-sm opacity-90">Total of seats</span>
        <h3 className="text-4xl font-bold mt-2">{totalSeats}</h3>
      </div>

      {/* Reserved Card */}
      <div className="bg-[#0D9488] p-6 rounded-lg text-white flex flex-col items-center shadow-lg">
        <Ticket size={24} className="mb-2" />
        <span className="text-sm opacity-90">Reserve</span>
        <h3 className="text-4xl font-bold mt-2">{reserved}</h3>
      </div>

      {/* Cancelled Card */}
      <div className="bg-[#F87171] p-6 rounded-lg text-white flex flex-col items-center shadow-lg">
        <XCircle size={24} className="mb-2" />
        <span className="text-sm opacity-90">Cancel</span>
        <h3 className="text-4xl font-bold mt-2">{cancelled}</h3>
      </div>
    </div>
  );
}