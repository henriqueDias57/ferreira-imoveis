'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Search, Building2, MapPin, Home, Key, Palmtree, Hash } from 'lucide-react';

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
    <div className="w-full relative py-16 md:py-24 bg-[#090D16] overflow-hidden">
      {/* Background Decorativo com imagem de imóvel sutil */}
      <div
        className="absolute inset-0 bg-cover bg-center opacity-20 filter blur-sm"
        style={{
          backgroundImage:
            'url("https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1920&q=80")',
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-[#090D16] via-[#090D16]/80 to-transparent" />

      <div className="max-w-6xl mx-auto px-4 relative z-10 space-y-8">
        {/* Headline & Subtitle */}
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brandRed-600/20 border border-brandRed-600/40 text-brandRed-400 text-xs font-semibold tracking-wide uppercase">
            <Building2 className="w-4 h-4 text-brandRed-500" />
            Tradição e Segurança Imobiliária no Vale do Paraíba & Litoral
          </div>

          <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight">
            Encontre o Imóvel Ideal para <span className="text-brandRed-500">Sua Família</span>
          </h1>

          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            As melhores opções de casas, apartamentos e lançamentos em <strong className="text-white">Cruzeiro-SP</strong> e imóveis de praia em <strong className="text-white">Ubatuba-SP</strong>.
          </p>
        </div>

        {/* Card do Formulário de Busca Estilo Portal Moderno */}
        <div className="glass-panel p-4 sm:p-6 rounded-2xl shadow-2xl max-w-4xl mx-auto border border-slate-700/60">
          {/* Abas Principais */}
          <div className="flex flex-wrap gap-2 mb-6 border-b border-slate-700/60 pb-3">
            <button
              type="button"
              onClick={() => setActiveTab('VENDA')}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition-all ${
                activeTab === 'VENDA'
                  ? 'bg-brandRed-600 text-white shadow-lg shadow-brandRed-900/40'
                  : 'bg-slate-800/80 text-slate-300 hover:bg-slate-700 hover:text-white'
              }`}
            >
              <Home className="w-4 h-4" /> Comprar
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('LOCACAO')}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition-all ${
                activeTab === 'LOCACAO'
                  ? 'bg-brandRed-600 text-white shadow-lg shadow-brandRed-900/40'
                  : 'bg-slate-800/80 text-slate-300 hover:bg-slate-700 hover:text-white'
              }`}
            >
              <Key className="w-4 h-4" /> Alugar
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('TEMPORADA')}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition-all ${
                activeTab === 'TEMPORADA'
                  ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-900/40'
                  : 'bg-slate-800/80 text-slate-300 hover:bg-slate-700 hover:text-white'
              }`}
            >
              <Palmtree className="w-4 h-4" /> Temporada (Ubatuba)
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('CODIGO')}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition-all ${
                activeTab === 'CODIGO'
                  ? 'bg-brandRed-600 text-white shadow-lg shadow-brandRed-900/40'
                  : 'bg-slate-800/80 text-slate-300 hover:bg-slate-700 hover:text-white'
              }`}
            >
              <Hash className="w-4 h-4" /> Por Código
            </button>
          </div>

          {/* Campos do Formulário */}
          <form onSubmit={handleSearch}>
            {activeTab === 'CODIGO' ? (
              <div className="flex flex-col sm:flex-row gap-4 items-center">
                <div className="relative flex-1 w-full">
                  <Hash className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={codeQuery}
                    onChange={(e) => setCodeQuery(e.target.value)}
                    placeholder="Digite o código do imóvel (ex: AP0101, CA0052)..."
                    className="w-full pl-12 pr-4 py-3.5 rounded-xl bg-slate-900 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:border-brandRed-500 text-sm"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-brandRed-600 hover:bg-brandRed-700 text-white font-bold text-sm flex items-center justify-center gap-2 transition shadow-lg shadow-brandRed-900/40"
                >
                  <Search className="w-4 h-4" /> Buscar Imóvel
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
                {/* Cidade */}
                <div>
                  <label className="block text-[11px] font-semibold text-slate-400 mb-1 uppercase">Cidade</label>
                  <select
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs focus:outline-none focus:border-brandRed-500"
                  >
                    <option value="">Todas as Cidades</option>
                    <option value="Cruzeiro">Cruzeiro - SP</option>
                    <option value="Ubatuba">Ubatuba - SP (Litoral)</option>
                  </select>
                </div>

                {/* Tipo de Imóvel */}
                <div>
                  <label className="block text-[11px] font-semibold text-slate-400 mb-1 uppercase">Tipo</label>
                  <select
                    value={type}
                    onChange={(e) => setType(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs focus:outline-none focus:border-brandRed-500"
                  >
                    <option value="">Todos os Tipos</option>
                    <option value="APARTAMENTO">Apartamento</option>
                    <option value="CASA">Casa</option>
                    <option value="SOBRADO">Sobrado</option>
                    <option value="COMERCIAL">Comercial / Ponto</option>
                    <option value="CHACARA">Chácara</option>
                    <option value="SITIO">Sítio</option>
                    <option value="TERRENO">Terreno / Lote</option>
                  </select>
                </div>

                {/* Bairro */}
                <div>
                  <label className="block text-[11px] font-semibold text-slate-400 mb-1 uppercase">Bairro</label>
                  <select
                    value={neighborhood}
                    onChange={(e) => setNeighborhood(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs focus:outline-none focus:border-brandRed-500"
                  >
                    <option value="">Todos os Bairros</option>
                    <option value="Centro">Centro</option>
                    <option value="Jardim América">Jardim América</option>
                    <option value="Vila Nova">Vila Nova</option>
                    <option value="Washington Luiz">Washington Luiz</option>
                    <option value="Itagaçaba">Itagaçaba</option>
                    <option value="Praia Grande">Praia Grande (Ubatuba)</option>
                    <option value="Tenório">Tenório (Ubatuba)</option>
                    <option value="Itaguá">Itaguá (Ubatuba)</option>
                  </select>
                </div>

                {/* Dormitórios */}
                <div>
                  <label className="block text-[11px] font-semibold text-slate-400 mb-1 uppercase">Dormitórios</label>
                  <select
                    value={bedrooms}
                    onChange={(e) => setBedrooms(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs focus:outline-none focus:border-brandRed-500"
                  >
                    <option value="">Qualquer</option>
                    <option value="1">1+ Quartos</option>
                    <option value="2">2+ Quartos</option>
                    <option value="3">3+ Quartos</option>
                    <option value="4">4+ Quartos</option>
                  </select>
                </div>

                {/* Botão de Buscar */}
                <div className="flex items-end">
                  <button
                    type="submit"
                    className="w-full py-2.5 px-4 rounded-xl bg-brandRed-600 hover:bg-brandRed-700 text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition shadow-lg shadow-brandRed-900/40"
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
