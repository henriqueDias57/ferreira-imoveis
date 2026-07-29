'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Search, Home, Key, Palmtree, Hash, MapPin, Building2 } from 'lucide-react';

export default function HeroSearch() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<'VENDA' | 'LOCACAO' | 'TEMPORADA' | 'CODIGO'>('VENDA');

  // Form states
  const [city, setCity] = useState('');
  const [type, setType] = useState('');
  const [neighborhood, setNeighborhood] = useState('');
  const [bedrooms, setBedrooms] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [codeQuery, setCodeQuery] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();

    if (activeTab === 'CODIGO') {
      if (codeQuery.trim()) {
        params.set('code', codeQuery.trim().toUpperCase());
      }
    } else {
      params.set('purpose', activeTab);
      if (city) params.set('city', city);
      if (type) params.set('type', type);
      if (neighborhood) params.set('neighborhood', neighborhood);
      if (bedrooms) params.set('bedrooms', bedrooms);
      if (maxPrice) params.set('maxPrice', maxPrice);
    }

    router.push(`/imoveis?${params.toString()}`);
  };

  return (
    <div className="w-full relative py-16 md:py-24 bg-[#070A12] overflow-hidden">
      {/* Background limpo com imagem de fundo sutil */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/ferreira-foto.jpg"
          alt="Ferreira Imóveis"
          fill
          className="object-cover object-center opacity-20 filter blur-[1px] scale-105"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#070A12]/80 via-[#070A12]/90 to-[#070A12]" />
      </div>

      <div className="max-w-5xl mx-auto px-4 relative z-10 space-y-8 text-center">
        {/* Título Principal Limpo */}
        <div className="space-y-3 max-w-3xl mx-auto">
          <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight font-heading leading-tight">
            Encontre seu Imóvel em <span className="text-brandRed-500">Cruzeiro</span> & <span className="text-brandRed-500">Ubatuba</span>
          </h1>
          <p className="text-slate-300 text-sm sm:text-base font-light">
            Venda, locação e temporada com consultoria imobiliária transparente e segura.
          </p>
        </div>

        {/* Card de Busca Limpo e Minimalista */}
        <div className="bg-[#111827]/90 backdrop-blur-xl p-5 sm:p-7 rounded-3xl border border-slate-800 shadow-2xl space-y-6 text-left">
          {/* Abas */}
          <div className="flex flex-wrap gap-2 border-b border-slate-800/80 pb-4">
            <button
              type="button"
              onClick={() => setActiveTab('VENDA')}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition-all ${
                activeTab === 'VENDA'
                  ? 'bg-brandRed-600 text-white shadow-lg shadow-brandRed-900/30'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              <Home className="w-4 h-4" /> Venda
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('LOCACAO')}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition-all ${
                activeTab === 'LOCACAO'
                  ? 'bg-brandRed-600 text-white shadow-lg shadow-brandRed-900/30'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              <Key className="w-4 h-4" /> Locação
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('TEMPORADA')}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition-all ${
                activeTab === 'TEMPORADA'
                  ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-900/30'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              <Palmtree className="w-4 h-4" /> Temporada
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('CODIGO')}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition-all ${
                activeTab === 'CODIGO'
                  ? 'bg-slate-800 text-white border border-slate-700'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              <Hash className="w-4 h-4" /> Código
            </button>
          </div>

          {/* Formulário */}
          <form onSubmit={handleSearch} className="space-y-4">
            {activeTab === 'CODIGO' ? (
              <div className="flex flex-col sm:flex-row gap-3">
                <div className="relative flex-1">
                  <Hash className="absolute left-4 top-3.5 w-4 h-4 text-slate-400" />
                  <input
                    type="text"
                    value={codeQuery}
                    onChange={(e) => setCodeQuery(e.target.value)}
                    placeholder="Digite o código do imóvel (Ex: AP001)"
                    className="w-full pl-11 pr-4 py-3 bg-slate-900 border border-slate-700/80 rounded-xl text-white text-xs sm:text-sm focus:outline-none focus:border-brandRed-500 uppercase"
                  />
                </div>
                <button
                  type="submit"
                  className="px-8 py-3 bg-brandRed-600 hover:bg-brandRed-700 text-white font-bold text-xs sm:text-sm rounded-xl transition shadow-md shadow-brandRed-900/30 flex items-center justify-center gap-2"
                >
                  <Search className="w-4 h-4" /> Buscar
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                <div>
                  <label className="block text-[11px] font-semibold text-slate-400 mb-1">Cidade</label>
                  <select
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="w-full px-3 py-2.5 bg-slate-900 border border-slate-700/80 rounded-xl text-white text-xs focus:outline-none focus:border-brandRed-500"
                  >
                    <option value="">Todas as Cidades</option>
                    <option value="Cruzeiro">Cruzeiro - SP</option>
                    <option value="Ubatuba">Ubatuba - SP</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-slate-400 mb-1">Tipo de Imóvel</label>
                  <select
                    value={type}
                    onChange={(e) => setType(e.target.value)}
                    className="w-full px-3 py-2.5 bg-slate-900 border border-slate-700/80 rounded-xl text-white text-xs focus:outline-none focus:border-brandRed-500"
                  >
                    <option value="">Todos os Tipos</option>
                    <option value="CASA">Casa</option>
                    <option value="APARTAMENTO">Apartamento</option>
                    <option value="SOBRADO">Sobrado</option>
                    <option value="COMERCIAL">Comercial</option>
                    <option value="CHACARA">Chácara / Sítio</option>
                    <option value="TERRENO">Terreno</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-slate-400 mb-1">Bairro / Região</label>
                  <input
                    type="text"
                    value={neighborhood}
                    onChange={(e) => setNeighborhood(e.target.value)}
                    placeholder="Ex: Centro, Itaguá..."
                    className="w-full px-3 py-2.5 bg-slate-900 border border-slate-700/80 rounded-xl text-white text-xs focus:outline-none focus:border-brandRed-500"
                  />
                </div>

                <div className="flex items-end">
                  <button
                    type="submit"
                    className="w-full py-2.5 bg-brandRed-600 hover:bg-brandRed-700 text-white font-bold text-xs sm:text-sm rounded-xl transition shadow-md shadow-brandRed-900/30 flex items-center justify-center gap-2"
                  >
                    <Search className="w-4 h-4" /> Buscar Imóveis
                  </button>
                </div>
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}
