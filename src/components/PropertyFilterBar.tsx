'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Filter, RotateCcw } from 'lucide-react';

export interface PropertyFilterBarProps {
  currentParams: {
    purpose?: string;
    type?: string;
    city?: string;
    neighborhood?: string;
    bedrooms?: string;
    maxPrice?: string;
    minPrice?: string;
    code?: string;
  };
}

export default function PropertyFilterBar({ currentParams }: PropertyFilterBarProps) {
  const router = useRouter();

  const [purpose, setPurpose] = useState(currentParams.purpose || '');
  const [type, setType] = useState(currentParams.type || '');
  const [city, setCity] = useState(currentParams.city || '');
  const [bedrooms, setBedrooms] = useState(currentParams.bedrooms || '');
  const [maxPrice, setMaxPrice] = useState(currentParams.maxPrice || '');
  const [code, setCode] = useState(currentParams.code || '');

  const handleApply = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();

    if (code) {
      params.set('code', code.trim());
    } else {
      if (purpose) params.set('purpose', purpose);
      if (type) params.set('type', type);
      if (city) params.set('city', city);
      if (bedrooms) params.set('bedrooms', bedrooms);
      if (maxPrice) params.set('maxPrice', maxPrice);
    }

    router.push(`/imoveis?${params.toString()}`);
  };

  const handleReset = () => {
    setPurpose('');
    setType('');
    setCity('');
    setBedrooms('');
    setMaxPrice('');
    setCode('');
    router.push('/imoveis');
  };

  return (
    <form
      onSubmit={handleApply}
      className="bg-[#1E293B] border border-slate-800 p-5 rounded-2xl space-y-4 shadow-xl"
    >
      <div className="flex items-center justify-between border-b border-slate-800 pb-3">
        <div className="flex items-center gap-2 text-xs font-bold text-white uppercase tracking-wider">
          <Filter className="w-4 h-4 text-brandRed-500" /> Filtros de Pesquisa
        </div>
        <button
          type="button"
          onClick={handleReset}
          className="text-xs text-slate-400 hover:text-brandRed-400 flex items-center gap-1 transition"
        >
          <RotateCcw className="w-3.5 h-3.5" /> Limpar Filtros
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-3">
        {/* Finalidade */}
        <div>
          <label className="block text-[11px] font-semibold text-slate-400 mb-1 uppercase">Finalidade</label>
          <select
            value={purpose}
            onChange={(e) => setPurpose(e.target.value)}
            className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs focus:outline-none focus:border-brandRed-500"
          >
            <option value="">Todas</option>
            <option value="VENDA">Venda</option>
            <option value="LOCACAO">Locação</option>
            <option value="TEMPORADA">Temporada</option>
          </select>
        </div>

        {/* Tipo */}
        <div>
          <label className="block text-[11px] font-semibold text-slate-400 mb-1 uppercase">Tipo</label>
          <select
            value={type}
            onChange={(e) => setType(e.target.value)}
            className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs focus:outline-none focus:border-brandRed-500"
          >
            <option value="">Todos</option>
            <option value="APARTAMENTO">Apartamento</option>
            <option value="CASA">Casa</option>
            <option value="SOBRADO">Sobrado</option>
            <option value="COMERCIAL">Comercial</option>
            <option value="CHACARA">Chácara</option>
            <option value="SITIO">Sítio</option>
            <option value="TERRENO">Terreno</option>
          </select>
        </div>

        {/* Cidade */}
        <div>
          <label className="block text-[11px] font-semibold text-slate-400 mb-1 uppercase">Cidade</label>
          <select
            value={city}
            onChange={(e) => setCity(e.target.value)}
            className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs focus:outline-none focus:border-brandRed-500"
          >
            <option value="">Todas</option>
            <option value="Cruzeiro">Cruzeiro - SP</option>
            <option value="Ubatuba">Ubatuba - SP</option>
          </select>
        </div>

        {/* Quartos */}
        <div>
          <label className="block text-[11px] font-semibold text-slate-400 mb-1 uppercase">Quartos</label>
          <select
            value={bedrooms}
            onChange={(e) => setBedrooms(e.target.value)}
            className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs focus:outline-none focus:border-brandRed-500"
          >
            <option value="">Qualquer</option>
            <option value="1">1+ dorm</option>
            <option value="2">2+ dorms</option>
            <option value="3">3+ dorms</option>
            <option value="4">4+ dorms</option>
          </select>
        </div>

        {/* Código */}
        <div>
          <label className="block text-[11px] font-semibold text-slate-400 mb-1 uppercase">Código Imóvel</label>
          <input
            type="text"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            placeholder="Ex: AP0101"
            className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs focus:outline-none focus:border-brandRed-500"
          />
        </div>

        {/* Botão Filtrar */}
        <div className="flex items-end">
          <button
            type="submit"
            className="w-full py-2 px-4 rounded-xl bg-brandRed-600 hover:bg-brandRed-700 text-white font-bold text-xs transition"
          >
            Filtrar Resultados
          </button>
        </div>
      </div>
    </form>
  );
}
