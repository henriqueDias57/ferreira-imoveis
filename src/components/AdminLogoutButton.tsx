'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { LogOut } from 'lucide-react';

export default function AdminLogoutButton() {
  const router = useRouter();

  const handleLogout = async () => {
    await fetch('/api/auth/logout', { method: 'POST' });
    router.push('/admin/login');
    router.refresh();
  };

  return (
    <button
      onClick={handleLogout}
      className="px-3.5 py-2.5 rounded-xl bg-slate-900 hover:bg-brandRed-950/60 text-slate-400 hover:text-brandRed-400 font-semibold text-xs flex items-center gap-1.5 border border-slate-800 transition"
      title="Sair da Conta"
    >
      <LogOut className="w-4 h-4" /> Sair
    </button>
  );
}
