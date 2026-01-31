"use client";

import { useState } from 'react';
import Sidebar from '@/components/Sidebar';
import { RoleContext, Role } from '@/context/RoleContext';

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [role, setRole] = useState<Role>('Admin');

  return (
    <RoleContext.Provider value={{ role, setRole }}>
      <div className="flex min-h-screen">
        <Sidebar role={role} onRoleChange={setRole} />
        <main className="flex-1">{children}</main>
      </div>
    </RoleContext.Provider>
  );
}
