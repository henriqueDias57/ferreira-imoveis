import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import HeroSearch from '@/components/HeroSearch';
import PropertyCard from '@/components/PropertyCard';
import GoogleMapEmbed from '@/components/GoogleMapEmbed';
import HomeContactForm from '@/components/HomeContactForm';
import { db } from '@/lib/db';
import {
  Building2,
  Home as HomeIcon,
  Building,
  Store,
  Trees,
  Landmark,
  ArrowRight,
  ShieldCheck,
  Award,
  Calculator,
  Megaphone,
} from 'lucide-react';

export const revalidate = 0;

export default async function HomePage() {
  // Buscar imóveis em destaque do banco de dados
  const [featuredProperties, recentProperties] = await Promise.all([
    db.property.findMany({
      where: { active: true, featured: true },
      include: { photos: true },
      orderBy: { createdAt: 'desc' },
      take: 6,
    }),
    db.property.findMany({
      where: { active: true },
      include: { photos: true },
      orderBy: { createdAt: 'desc' },
      take: 6,
    }),
  ]);

  // Se não houver imóveis marcados como destaque, exibe os mais recentes
  const displayProperties = featuredProperties.length > 0 ? featuredProperties : recentProperties;

  const propertyTypes = [
    { name: 'Apartamento', type: 'APARTAMENTO', icon: Building2 },
    { name: 'Casa', type: 'CASA', icon: HomeIcon },
    { name: 'Sobrado', type: 'SOBRADO', icon: Building },
    { name: 'Comercial', type: 'COMERCIAL', icon: Store },
    { name: 'Chácara / Sítio', type: 'CHACARA', icon: Trees },
    { name: 'Terreno', type: 'TERRENO', icon: Landmark },
  ];

  return (
    <div className="space-y-16 pb-16">
      {/* 1. Hero Principal com Busca Limpa */}
      <HeroSearch />

      {/* 2. Categorias de Busca Rápida (Limpo) */}
      <section className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {propertyTypes.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.type}
                href={`/imoveis?type=${item.type}`}
                className="bg-[#111827] border border-slate-800 hover:border-brandRed-600/50 p-4 rounded-2xl text-center space-y-2 group transition-all"
              >
                <Icon className="w-5 h-5 mx-auto text-slate-400 group-hover:text-brandRed-500 transition-colors" />
                <h3 className="text-xs font-semibold text-slate-300 group-hover:text-white transition-colors">
                  {item.name}
                </h3>
              </Link>
            );
          })}
        </div>
      </section>

      {/* 3. Imóveis em Destaque */}
      <section className="max-w-7xl mx-auto px-4 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white font-heading">
              Imóveis em <span className="text-brandRed-500">Destaque</span>
            </h2>
            <p className="text-xs text-slate-400">Confira as melhores oportunidades selecionadas</p>
          </div>
          <Link
            href="/imoveis"
            className="text-xs font-bold text-slate-300 hover:text-white flex items-center gap-1 bg-slate-900 border border-slate-800 px-3.5 py-2 rounded-xl transition"
          >
            Ver todos <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {displayProperties.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {displayProperties.map((prop) => (
              <PropertyCard key={prop.id} property={prop} />
            ))}
          </div>
        ) : (
          <div className="bg-[#111827] border border-slate-800 p-8 rounded-2xl text-center text-slate-400 text-sm">
            Nenhum imóvel disponível no momento.
          </div>
        )}
      </section>

      {/* 4. Sobre a Ferreira Imóveis (Resumido e Limpo) */}
      <section className="max-w-7xl mx-auto px-4">
        <div className="bg-[#111827] border border-slate-800 rounded-3xl p-6 sm:p-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-5">
            <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden border border-slate-700 shadow-xl">
              <Image
                src="/ferreira-foto.jpg"
                alt="Ferreira Imóveis"
                fill
                className="object-cover"
              />
            </div>
          </div>

          <div className="lg:col-span-7 space-y-4">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brandRed-600/10 text-brandRed-400 text-xs font-bold uppercase border border-brandRed-600/20">
              <ShieldCheck className="w-4 h-4 text-brandRed-500" /> Tradição e Transparência
            </div>

            <h2 className="text-2xl sm:text-3xl font-extrabold text-white font-heading">
              Ferreira Imóveis — Consultoria Especializada
            </h2>

            <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
              Conduzida por <strong className="text-white">Afrânio Ramos Ferreira Filho</strong> (CRECI 130906-F) e <strong className="text-white">Maria Fernanda Ferreira</strong> (CRECI 198557-F), a Ferreira Imóveis oferece assessoria completa na compra, venda e locação em Cruzeiro-SP e imóveis de temporada em Ubatuba-SP.
            </p>

            <div className="flex flex-wrap gap-3 pt-2">
              <Link
                href="/sobre-nos"
                className="px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-200 text-xs font-bold border border-slate-700 transition"
              >
                Conheça Nossa História
              </Link>
              <Link
                href="/anunciar"
                className="px-4 py-2.5 rounded-xl bg-brandRed-600 hover:bg-brandRed-700 text-white text-xs font-bold transition shadow-md shadow-brandRed-900/30"
              >
                Anuncie seu Imóvel
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Contato & Localização (Limpo) */}
      <section className="max-w-7xl mx-auto px-4">
        <div className="bg-[#111827] border border-slate-800 rounded-3xl p-6 sm:p-8 grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-6 space-y-4">
            <div>
              <h3 className="text-xl font-bold text-white font-heading">Nosso Escritório em Cruzeiro - SP</h3>
              <p className="text-xs text-slate-400 mt-1">Rua Professor Virgílio Antunes, 57 - Centro</p>
            </div>
            <GoogleMapEmbed height="280px" />
          </div>

          <div className="lg:col-span-6">
            <HomeContactForm />
          </div>
        </div>
      </section>
    </div>
  );
}
