import React from 'react';
import Link from 'next/link';
import { db } from '@/lib/db';
import { getSession } from '@/lib/auth';
import AdminPropertyTable from '@/components/AdminPropertyTable';
import AdminLogoutButton from '@/components/AdminLogoutButton';
import { Building2, Plus, MessageSquare, CheckCircle, Star, ShieldCheck } from 'lucide-react';

export const revalidate = 0;

export default async function AdminDashboardPage() {
  const session = await getSession();

  const [properties, totalCount, activeCount, featuredCount, leadsCount] = await Promise.all([
    db.property.findMany({
      include: { photos: true },
      orderBy: { createdAt: 'desc' },
    }),
    db.property.count(),
    db.property.count({ where: { active: true } }),
    db.property.count({ where: { featured: true } }),
    db.lead.count(),
  ]);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-8">
      {/* Topo do Painel */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-6">
        <div>
          <div className="flex items-center gap-2 text-xs text-brandRed-400 font-bold uppercase tracking-wider mb-1">
            <ShieldCheck className="w-4 h-4" /> Gestão de Catálogo da Ferreira Imóveis
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white">
            Painel Administrativo
          </h1>
          <p className="text-xs text-slate-400">
            Logado como <strong className="text-slate-200">{session?.name || session?.email}</strong>
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <Link
            href="/admin/imoveis/novo"
            className="px-4 py-2.5 rounded-xl bg-brandRed-600 hover:bg-brandRed-700 text-white font-bold text-xs flex items-center gap-2 transition shadow-lg shadow-brandRed-900/40"
          >
            <Plus className="w-4 h-4" /> Cadastrar Novo Imóvel
          </Link>
          <Link
            href="/admin/leads"
            className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-xs flex items-center gap-2 transition border border-slate-700"
          >
            <MessageSquare className="w-4 h-4 text-brandRed-400" /> Caixa de Leads ({leadsCount})
          </Link>
          <AdminLogoutButton />
        </div>
      </div>

      {/* Cards de Estatísticas */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="bg-[#1E293B] border border-slate-800 p-5 rounded-2xl space-y-1">
          <div className="flex items-center justify-between text-slate-400 text-xs font-semibold uppercase">
            <span>Total Imóveis</span>
            <Building2 className="w-4 h-4 text-brandRed-500" />
          </div>
          <div className="text-2xl font-black text-white">{totalCount}</div>
        </div>

        <div className="bg-[#1E293B] border border-slate-800 p-5 rounded-2xl space-y-1">
          <div className="flex items-center justify-between text-slate-400 text-xs font-semibold uppercase">
            <span>Ativos no Site</span>
            <CheckCircle className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="text-2xl font-black text-white">{activeCount}</div>
        </div>

        <div className="bg-[#1E293B] border border-slate-800 p-5 rounded-2xl space-y-1">
          <div className="flex items-center justify-between text-slate-400 text-xs font-semibold uppercase">
            <span>Em Destaque</span>
            <Star className="w-4 h-4 text-amber-400" />
          </div>
          <div className="text-2xl font-black text-white">{featuredCount}</div>
        </div>

        <div className="bg-[#1E293B] border border-slate-800 p-5 rounded-2xl space-y-1">
          <div className="flex items-center justify-between text-slate-400 text-xs font-semibold uppercase">
            <span>Mensagens / Leads</span>
            <MessageSquare className="w-4 h-4 text-blue-400" />
          </div>
          <div className="text-2xl font-black text-white">{leadsCount}</div>
        </div>
      </div>

      {/* Tabela de Imóveis Interativa */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold text-white">Catálogo Cadastrado</h2>
        </div>

        <AdminPropertyTable properties={properties} />
      </div>
    </div>
  );
}
