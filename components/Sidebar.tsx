import { Home, History, Users, LogOut } from 'lucide-react';
import Link from 'next/link'; 
import { usePathname, useRouter } from 'next/navigation';

interface SidebarProps {
  role: 'Admin' | 'User';
  onRoleChange: (newRole: 'Admin' | 'User') => void;
}

export default function Sidebar({ role, onRoleChange }: SidebarProps) {
  const pathname = usePathname();
  const router = useRouter();

  const handleRoleSwitch = () => {
    const newRole = role === 'Admin' ? 'User' : 'Admin';
    onRoleChange(newRole);

    if (newRole === 'User' && pathname === '/history') {
      router.push('/');
    }
  };

  return (
    <div className="w-64 h-screen bg-white border-r flex flex-col p-6 sticky top-0">
      <h1 className="text-2xl font-bold mb-10">{role}</h1>

      <nav className="flex-1 space-y-4">
        <Link
          href="/"
          className={`flex items-center space-x-3 w-full p-2 rounded ${
            pathname === '/'
              ? 'text-blue-600 font-medium bg-blue-50'
              : 'text-gray-500 hover:text-blue-600'
          }`}
        >
          <Home size={20} /> <span>Home</span>
        </Link>

        {role === 'Admin' && (
          <Link
            href="/history"
            className={`flex items-center space-x-3 w-full p-2 rounded ${
              pathname === '/history'
                ? 'text-blue-600 font-medium bg-blue-50'
                : 'text-gray-500 hover:text-blue-600'
            }`}
          >
            <History size={20} /> <span>History</span>
          </Link>
        )}

        <button
          onClick={handleRoleSwitch}
          className="flex items-center space-x-3 text-gray-500 hover:text-blue-600 w-full p-2 transition-colors"
        >
          <Users size={20} />
          <span>Switch to {role === 'Admin' ? 'User' : 'Admin'}</span>
        </button>
      </nav>

      <button className="flex items-center space-x-3 text-gray-500 mt-auto hover:text-red-500 p-2">
        <LogOut size={20} /> <span>Logout</span>
      </button>
    </div>
  );
}
