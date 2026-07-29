'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Bed, Bath, Car, Maximize2, MapPin, MessageCircle, Star, ArrowUpRight } from 'lucide-react';

export interface PropertyCardProps {
  property: {
    id: number;
    code: string;
    title: string;
    slug: string;
    type: string;
    purpose: string;
    price: number;
    condoFee?: number | null;
    city: string;
    neighborhood: string;
    bedrooms: number;
    bathrooms: number;
    parking: number;
    area: number;
    featured: boolean;
    photos: { url: string; isCover: boolean }[];
  };
}

export default function PropertyCard({ property }: PropertyCardProps) {
  const coverPhoto =
    property.photos.find((p) => p.isCover)?.url ||
    property.photos[0]?.url ||
    'https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=800&q=80';

  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
      maximumFractionDigits: 0,
    }).format(val);
  };

  const getPurposeBadge = (purpose: string) => {
    switch (purpose) {
      case 'VENDA':
        return (
          <span className="bg-gradient-to-r from-brandRed-600 to-brandRed-700 text-white text-[10px] font-extrabold px-3 py-1 rounded-lg uppercase tracking-widest shadow-lg shadow-brandRed-900/40">
            Venda
          </span>
        );
      case 'LOCACAO':
        return (
          <span className="bg-gradient-to-r from-blue-600 to-blue-700 text-white text-[10px] font-extrabold px-3 py-1 rounded-lg uppercase tracking-widest shadow-lg shadow-blue-900/40">
            Locação
          </span>
        );
      case 'TEMPORADA':
        return (
          <span className="bg-gradient-to-r from-emerald-500 to-emerald-600 text-white text-[10px] font-extrabold px-3 py-1 rounded-lg uppercase tracking-widest shadow-lg shadow-emerald-900/40">
            Temporada
          </span>
        );
      default:
        return null;
    }
  };

  const whatsappMessage = encodeURIComponent(
    `Olá! Tenho interesse no imóvel código ${property.code} (${property.title}) anunciado por ${formatCurrency(property.price)}.`
  );

  return (
    <div className="luxury-card rounded-3xl overflow-hidden flex flex-col group">
      {/* Container de Imagem de Capa com efeito parallax no hover */}
      <div className="relative w-full h-60 bg-slate-900 overflow-hidden">
        <Image
          src={coverPhoto}
          alt={property.title}
          fill
          className="object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />

        {/* Overlay de gradiente sofisticado */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#111827] via-[#111827]/30 to-transparent" />

        {/* Badges do topo */}
        <div className="absolute top-3.5 left-3.5 flex flex-wrap gap-2 items-center">
          {getPurposeBadge(property.purpose)}
          {property.featured && (
            <span className="bg-gradient-to-r from-amber-400 to-amber-500 text-slate-950 text-[9px] font-black px-2.5 py-1 rounded-lg flex items-center gap-1 uppercase tracking-wider shadow-lg shadow-amber-900/30">
              <Star className="w-3 h-3 fill-current" /> Destaque
            </span>
          )}
        </div>

        {/* Código do Imóvel no canto */}
        <div className="absolute top-3.5 right-3.5 bg-[#070A12]/80 backdrop-blur-xl text-slate-200 text-[10px] font-mono font-bold px-3 py-1.5 rounded-xl border border-slate-700/60 shadow-md">
          #{property.code}
        </div>

        {/* Preço flutuando sobre a imagem na parte inferior */}
        <div className="absolute bottom-3.5 left-3.5 right-3.5 flex items-end justify-between">
          <div>
            <span className="text-[9px] text-slate-400 uppercase tracking-widest font-bold block mb-0.5">
              {property.purpose === 'LOCACAO' ? 'Aluguel / mês' : property.purpose === 'TEMPORADA' ? 'Valor / diária' : 'Valor'}
            </span>
            <div className="text-2xl font-black text-white drop-shadow-lg font-heading tracking-tight">
              {formatCurrency(property.price)}
            </div>
          </div>
          {property.condoFee && property.condoFee > 0 && (
            <span className="text-[10px] text-slate-400 bg-black/50 backdrop-blur-sm px-2 py-1 rounded-lg">
              Cond. {formatCurrency(property.condoFee)}
            </span>
          )}
        </div>
      </div>

      {/* Conteúdo do Card */}
      <div className="p-5 flex-1 flex flex-col justify-between space-y-4 bg-[#111827]">
        <div className="space-y-2.5">
          {/* Cidade e Bairro */}
          <div className="flex items-center gap-1.5 text-xs text-brandRed-400 font-bold">
            <MapPin className="w-3.5 h-3.5" />
            <span>
              {property.neighborhood}, {property.city} - SP
            </span>
          </div>

          {/* Título do Imóvel */}
          <Link
            href={`/imovel/${property.slug}`}
            className="block text-[15px] font-bold text-white group-hover:text-brandRed-400 transition-colors line-clamp-2 leading-snug"
          >
            {property.title}
          </Link>
        </div>

        {/* Especificações (m², Quartos, Banheiros, Vagas) */}
        <div className="grid grid-cols-4 gap-1.5 py-3 border-y border-slate-800/80">
          <div className="flex flex-col items-center gap-1 bg-slate-900/80 p-2 rounded-xl">
            <Maximize2 className="w-3.5 h-3.5 text-brandRed-500" />
            <span className="font-bold text-white text-[11px]">{property.area}m²</span>
          </div>
          <div className="flex flex-col items-center gap-1 bg-slate-900/80 p-2 rounded-xl">
            <Bed className="w-3.5 h-3.5 text-brandRed-500" />
            <span className="font-bold text-white text-[11px]">{property.bedrooms} qts</span>
          </div>
          <div className="flex flex-col items-center gap-1 bg-slate-900/80 p-2 rounded-xl">
            <Bath className="w-3.5 h-3.5 text-brandRed-500" />
            <span className="font-bold text-white text-[11px]">{property.bathrooms} ban</span>
          </div>
          <div className="flex flex-col items-center gap-1 bg-slate-900/80 p-2 rounded-xl">
            <Car className="w-3.5 h-3.5 text-brandRed-500" />
            <span className="font-bold text-white text-[11px]">{property.parking} vag</span>
          </div>
        </div>

        {/* Botões de Ação */}
        <div className="flex items-center gap-2.5 pt-1">
          <a
            href={`https://wa.me/5512997484619?text=${whatsappMessage}`}
            target="_blank"
            rel="noopener noreferrer"
            className="p-3 rounded-xl bg-whatsapp/10 text-whatsapp border border-whatsapp/30 hover:bg-whatsapp hover:text-white transition-all shadow-md hover:shadow-whatsapp/30 hover:scale-105"
            title="Chamar no WhatsApp"
          >
            <MessageCircle className="w-4 h-4 fill-current" />
          </a>
          <Link
            href={`/imovel/${property.slug}`}
            className="flex-1 py-3 rounded-xl bg-brandRed-600 hover:bg-brandRed-700 text-white text-xs font-extrabold text-center transition-all shadow-lg shadow-brandRed-900/40 hover:scale-[1.02] flex items-center justify-center gap-1.5"
          >
            Ver Detalhes <ArrowUpRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </div>
  );
}
