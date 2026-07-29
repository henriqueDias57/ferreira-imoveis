import React from 'react';
import PropertyForm from '@/components/PropertyForm';
import Link from 'next/link';
import { ArrowLeft, Building2 } from 'lucide-react';

export default function NewPropertyPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8 space-y-6">
      <div>
        <Link
          href="/admin"
          className="inline-flex items-center gap-2 text-xs font-bold text-slate-400 hover:text-white transition bg-[#1E293B] px-3.5 py-2 rounded-xl border border-slate-800"
        >
          <ArrowLeft className="w-4 h-4" /> Voltar ao Painel
        </Link>
      </div>

      <div className="space-y-1">
        <div className="flex items-center gap-2 text-xs text-brandRed-400 font-bold uppercase tracking-wider">
          <Building2 className="w-4 h-4" /> Cadastro de Imóveis
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-white">Cadastrar Novo Imóvel</h1>
      </div>

      <PropertyForm mode="create" />
    </div>
  );
}
