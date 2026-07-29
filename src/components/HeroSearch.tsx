'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Search, Building2, MapPin, Home, Key, Palmtree, Hash, ShieldCheck, Award, Star, Sparkles } from 'lucide-react';

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
      {/* Background de Alta Resolução com Gradientes e Imagem da Empresa */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/ferreira-foto.jpg"
          alt="Ferreira Imóveis"
          fill
          className="object-cover object-center opacity-25 filter blur-[2px] scale-105"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#070A12] via-[#070A12]/80 to-[#070A12]/60" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#070A12] via-transparent to-[#070A12]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 relative z-10 space-y-12">
        {/* Grid de Hero: Headline + Foto Oficial da Imobiliária */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Lado Esquerdo: Headline Persuasiva */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brandRed-600/20 border border-brandRed-600/40 text-brandRed-400 text-xs font-extrabold tracking-wide uppercase shadow-lg shadow-brandRed-900/20">
              <Sparkles className="w-4 h-4 text-brandRed-500 animate-pulse" />
              Sua Imobiliária de Confiança em Cruzeiro & Ubatuba - SP
            </div>

            <h1 className="text-4xl sm:text-6xl font-black text-white tracking-tight leading-[1.1] font-heading">
              Encontre o Imóvel dos Seus Sonhos com <span className="text-gradient-red text-glow-red">Segurança Total</span>
            </h1>

            <p className="text-slate-300 text-base sm:text-lg leading-relaxed max-w-2xl font-light">
              Mais de 15 anos oferecendo suporte jurídico completo na <strong className="text-white font-semibold">compra, venda e locação</strong> em Cruzeiro-SP e <strong className="text-white font-semibold">imóveis de temporada</strong> no litoral em Ubatuba-SP.
            </p>

            {/* Badges dos Corretores Responsáveis */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-2">
              <div className="flex items-center gap-2 bg-slate-900/90 border border-slate-800 px-4 py-2 rounded-2xl text-xs">
                <ShieldCheck className="w-4 h-4 text-brandRed-500" />
                <span className="text-slate-300 font-medium">
                  <strong className="text-white">Afrânio Ferreira Filho</strong> (CRECI 130906-F)
                </span>
              </div>
              <div className="flex items-center gap-2 bg-slate-900/90 border border-slate-800 px-4 py-2 rounded-2xl text-xs">
                <ShieldCheck className="w-4 h-4 text-brandRed-500" />
                <span className="text-slate-300 font-medium">
                  <strong className="text-white">Maria Fernanda Ferreira</strong> (CRECI 198557-F)
                </span>
              </div>
            </div>
          </div>

          {/* Lado Direito: Foto Principal da Imobiliária em Card de Luxo */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative w-full max-w-md aspect-[4/3] rounded-3xl overflow-hidden border-2 border-slate-700/80 shadow-2xl shadow-brandRed-950/50 group">
              <Image
                src="/ferreira-foto.jpg"
                alt="Escritório Ferreira Imóveis"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-700"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

              {/* Tag de destaque sobre a foto */}
              <div className="absolute bottom-4 left-4 right-4 p-4 rounded-2xl bg-[#090D16]/90 backdrop-blur-md border border-slate-700/60 space-y-1">
                <div className="flex items-center gap-2 text-brandRed-400 font-bold text-xs uppercase tracking-wider">
                  <Award className="w-4 h-4 text-brandRed-500" /> Atendimento Presencial & Consultoria
                </div>
                <p className="text-white text-xs font-semibold">
                  Rua Prof. Virgílio Antunes, 57 - Centro - Cruzeiro/SP
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Card Interativo de Busca com Abas e Filtros */}
        <div className="glass-panel p-6 sm:p-8 rounded-3xl shadow-2xl max-w-5xl mx-auto border border-slate-700/60">
          {/* Abas de Busca */}
          <div className="flex flex-wrap gap-2.5 mb-6 border-b border-slate-700/60 pb-4">
            <button
              type="button"
              onClick={() => setActiveTab('VENDA')}
              className={`flex items-center gap-2 px-6 py-3 rounded-2xl font-bold text-xs sm:text-sm transition-all ${
                activeTab === 'VENDA'
                  ? 'bg-brandRed-600 text-white shadow-xl shadow-brandRed-900/50 scale-105'
                  : 'bg-slate-900/80 text-slate-300 hover:bg-slate-800 hover:text-white'
              }`}
            >
              <Home className="w-4 h-4" /> Comprar Imóvel
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('LOCACAO')}
              className={`flex items-center gap-2 px-6 py-3 rounded-2xl font-bold text-xs sm:text-sm transition-all ${
                activeTab === 'LOCACAO'
                  ? 'bg-brandRed-600 text-white shadow-xl shadow-brandRed-900/50 scale-105'
                  : 'bg-slate-900/80 text-slate-300 hover:bg-slate-800 hover:text-white'
              }`}
            >
              <Key className="w-4 h-4" /> Alugar Imóvel
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('TEMPORADA')}
              className={`flex items-center gap-2 px-6 py-3 rounded-2xl font-bold text-xs sm:text-sm transition-all ${
                activeTab === 'TEMPORADA'
                  ? 'bg-emerald-600 text-white shadow-xl shadow-emerald-900/50 scale-105'
                  : 'bg-slate-900/80 text-slate-300 hover:bg-slate-800 hover:text-white'
              }`}
            >
              <Palmtree className="w-4 h-4" /> Temporada (Ubatuba)
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('CODIGO')}
              className={`flex items-center gap-2 px-6 py-3 rounded-2xl font-bold text-xs sm:text-sm transition-all ${
                activeTab === 'CODIGO'
                  ? 'bg-brandRed-600 text-white shadow-xl shadow-brandRed-900/50 scale-105'
                  : 'bg-slate-900/80 text-slate-300 hover:bg-slate-800 hover:text-white'
              }`}
            >
              <Hash className="w-4 h-4" /> Busca por Código
            </button>
          </div>

          {/* Form de Filtros */}
          <form onSubmit={handleSearch}>
            {activeTab === 'CODIGO' ? (
              <div className="flex flex-col sm:flex-row gap-4 items-center">
                <div className="relative flex-1 w-full">
                  <Hash className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={codeQuery}
                    onChange={(e) => setCodeQuery(e.target.value)}
                    placeholder="Digite o código do imóvel (ex: AP0101, CA0052, CH0009)..."
                    className="w-full pl-12 pr-4 py-4 rounded-2xl bg-slate-950/90 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:border-brandRed-500 text-sm font-mono"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-brandRed-600 hover:bg-brandRed-700 text-white font-extrabold text-sm flex items-center justify-center gap-2 transition shadow-xl shadow-brandRed-900/50 hover:scale-105"
                >
                  <Search className="w-4 h-4" /> Localizar Imóvel
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
                {/* Cidade */}
                <div>
                  <label className="block text-[11px] font-bold text-slate-300 mb-1.5 uppercase tracking-wider">
                    Cidade
                  </label>
                  <select
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="w-full px-4 py-3 rounded-2xl bg-slate-950/90 border border-slate-700 text-white text-xs font-semibold focus:outline-none focus:border-brandRed-500"
                  >
                    <option value="">Todas as Cidades</option>
                    <option value="Cruzeiro">Cruzeiro - SP</option>
                    <option value="Ubatuba">Ubatuba - SP (Litoral)</option>
                  </select>
                </div>

                {/* Tipo de Imóvel */}
                <div>
                  <label className="block text-[11px] font-bold text-slate-300 mb-1.5 uppercase tracking-wider">
                    Tipo de Imóvel
                  </label>
                  <select
                    value={type}
                    onChange={(e) => setType(e.target.value)}
                    className="w-full px-4 py-3 rounded-2xl bg-slate-950/90 border border-slate-700 text-white text-xs font-semibold focus:outline-none focus:border-brandRed-500"
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
                  <label className="block text-[11px] font-bold text-slate-300 mb-1.5 uppercase tracking-wider">
                    Bairro
                  </label>
                  <select
                    value={neighborhood}
                    onChange={(e) => setNeighborhood(e.target.value)}
                    className="w-full px-4 py-3 rounded-2xl bg-slate-950/90 border border-slate-700 text-white text-xs font-semibold focus:outline-none focus:border-brandRed-500"
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
                  <label className="block text-[11px] font-bold text-slate-300 mb-1.5 uppercase tracking-wider">
                    Quartos
                  </label>
                  <select
                    value={bedrooms}
                    onChange={(e) => setBedrooms(e.target.value)}
                    className="w-full px-4 py-3 rounded-2xl bg-slate-950/90 border border-slate-700 text-white text-xs font-semibold focus:outline-none focus:border-brandRed-500"
                  >
                    <option value="">Qualquer Quantidade</option>
                    <option value="1">1+ Quartos</option>
                    <option value="2">2+ Quartos</option>
                    <option value="3">3+ Quartos</option>
                    <option value="4">4+ Quartos</option>
                  </select>
                </div>

                {/* Botão de Busca */}
                <div className="flex items-end">
                  <button
                    type="submit"
                    className="w-full py-3 px-4 rounded-2xl bg-brandRed-600 hover:bg-brandRed-700 text-white font-extrabold text-xs sm:text-sm flex items-center justify-center gap-2 transition shadow-xl shadow-brandRed-900/50 hover:scale-105"
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
