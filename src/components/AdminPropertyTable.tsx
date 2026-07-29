'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Search, Edit3, Trash2, ExternalLink, Star, CheckCircle, XCircle, Eye } from 'lucide-react';

export interface AdminPropertyTableProps {
  properties: any[];
}

export default function AdminPropertyTable({ properties }: AdminPropertyTableProps) {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState('');
  const [deletingId, setDeletingId] = useState<number | null>(null);

  const filtered = properties.filter((p) => {
    const term = searchTerm.toLowerCase();
    return (
      p.code.toLowerCase().includes(term) ||
      p.title.toLowerCase().includes(term) ||
      p.city.toLowerCase().includes(term) ||
      p.neighborhood.toLowerCase().includes(term)
    );
  });

  const handleToggleActive = async (id: number, currentActive: boolean) => {
    try {
      const res = await fetch(`/api/admin/properties/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ active: !currentActive }),
      });
      if (res.ok) {
        router.refresh();
      }
    } catch (error) {
      console.error('Erro ao alterar status:', error);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Tem certeza que deseja excluir permanentemente este imóvel?')) return;
    setDeletingId(id);
    try {
      const res = await fetch(`/api/admin/properties/${id}`, {
        method: 'DELETE',
      });
      if (res.ok) {
        router.refresh();
      }
    } catch (error) {
      console.error('Erro ao excluir:', error);
    } finally {
      setDeletingId(null);
    }
  };

  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL', maximumFractionDigits: 0 }).format(val);
  };

  return (
    <div className="bg-[#1E293B] border border-slate-800 rounded-2xl overflow-hidden shadow-xl space-y-4 p-4 sm:p-6">
      {/* Campo de Busca na Tabela */}
      <div className="relative max-w-md">
        <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Buscar por código, título, cidade ou bairro..."
          className="w-full pl-10 pr-4 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs placeholder-slate-500 focus:outline-none focus:border-brandRed-500"
        />
      </div>

      {/* Tabela de Dados */}
      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs border-collapse">
          <thead>
            <tr className="border-b border-slate-800 text-slate-400 font-semibold uppercase tracking-wider bg-slate-900/60">
              <th className="p-3">Código</th>
              <th className="p-3">Imóvel</th>
              <th className="p-3">Tipo / Finalidade</th>
              <th className="p-3">Preço</th>
              <th className="p-3">Localização</th>
              <th className="p-3">Status</th>
              <th className="p-3 text-right">Ações</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/80">
            {filtered.length > 0 ? (
              filtered.map((prop) => {
                const cover = prop.photos?.[0]?.url || 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=400&q=80';
                return (
                  <tr key={prop.id} className="hover:bg-slate-800/40 transition">
                    <td className="p-3 font-mono font-bold text-brandRed-400">
                      #{prop.code}
                    </td>

                    <td className="p-3">
                      <div className="flex items-center gap-3">
                        <div className="relative w-12 h-10 rounded-lg overflow-hidden shrink-0 bg-slate-900">
                          <Image src={cover} alt={prop.title} fill className="object-cover" />
                        </div>
                        <div>
                          <p className="font-bold text-white line-clamp-1 max-w-xs">{prop.title}</p>
                          <p className="text-[10px] text-slate-400">{prop.area}m² | {prop.bedrooms} quartos | {prop.bathrooms} ban</p>
                        </div>
                      </div>
                    </td>

                    <td className="p-3">
                      <div className="space-y-1">
                        <span className="inline-block px-2 py-0.5 rounded bg-slate-800 text-slate-300 font-semibold text-[10px]">
                          {prop.type}
                        </span>
                        <span className="block text-[10px] font-bold text-brandRed-400">
                          {prop.purpose}
                        </span>
                      </div>
                    </td>

                    <td className="p-3 font-extrabold text-white">
                      {formatCurrency(prop.price)}
                    </td>

                    <td className="p-3 text-slate-300">
                      {prop.neighborhood}, {prop.city}
                    </td>

                    <td className="p-3">
                      <button
                        onClick={() => handleToggleActive(prop.id, prop.active)}
                        className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold transition ${
                          prop.active
                            ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30'
                            : 'bg-slate-800 text-slate-500 border border-slate-700'
                        }`}
                      >
                        {prop.active ? <CheckCircle className="w-3 h-3" /> : <XCircle className="w-3 h-3" />}
                        {prop.active ? 'Ativo' : 'Inativo'}
                      </button>
                    </td>

                    <td className="p-3 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Link
                          href={`/imovel/${prop.slug}`}
                          target="_blank"
                          className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 transition"
                          title="Ver no site público"
                        >
                          <Eye className="w-3.5 h-3.5" />
                        </Link>
                        <Link
                          href={`/admin/imoveis/${prop.id}/editar`}
                          className="p-1.5 rounded-lg bg-slate-800 hover:bg-brandRed-600 hover:text-white text-slate-300 transition"
                          title="Editar Imóvel"
                        >
                          <Edit3 className="w-3.5 h-3.5" />
                        </Link>
                        <button
                          onClick={() => handleDelete(prop.id)}
                          disabled={deletingId === prop.id}
                          className="p-1.5 rounded-lg bg-slate-800 hover:bg-red-600 hover:text-white text-slate-400 transition disabled:opacity-50"
                          title="Excluir Imóvel"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan={7} className="p-8 text-center text-slate-500">
                  Nenhum imóvel encontrado.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
