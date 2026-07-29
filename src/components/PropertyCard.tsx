'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Bed, Bath, Car, Maximize2, MapPin, MessageCircle, Star } from 'lucide-react';

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
        return <span className="bg-brandRed-600 text-white text-[11px] font-bold px-2.5 py-1 rounded-md uppercase tracking-wider">Venda</span>;
      case 'LOCACAO':
        return <span className="bg-blue-600 text-white text-[11px] font-bold px-2.5 py-1 rounded-md uppercase tracking-wider">Locação</span>;
      case 'TEMPORADA':
        return <span className="bg-emerald-600 text-white text-[11px] font-bold px-2.5 py-1 rounded-md uppercase tracking-wider">Temporada</span>;
      default:
        return null;
    }
  };

  const whatsappMessage = encodeURIComponent(
    `Olá! Tenho interesse no imóvel código ${property.code} (${property.title}) anunciado por ${formatCurrency(property.price)}.`
  );

  return (
    <div className="bg-[#1E293B] border border-slate-800 rounded-2xl overflow-hidden flex flex-col group hover:border-brandRed-600/50 hover:shadow-xl hover:shadow-brandRed-900/10 transition-all duration-300">
      {/* Container de Imagem de Capa */}
      <div className="relative w-full h-56 bg-slate-900 overflow-hidden">
        <Image
          src={coverPhoto}
          alt={property.title}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />

        {/* Overlay escuro de gradiente */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#1E293B] via-transparent to-black/40" />

        {/* Badges do topo */}
        <div className="absolute top-3 left-3 flex flex-wrap gap-2 items-center">
          {getPurposeBadge(property.purpose)}
          {property.featured && (
            <span className="bg-amber-500 text-slate-950 text-[10px] font-extrabold px-2 py-0.5 rounded flex items-center gap-1 uppercase">
              <Star className="w-3 h-3 fill-current" /> Destaque
            </span>
          )}
        </div>

        <div className="absolute top-3 right-3 bg-slate-950/80 backdrop-blur-md text-slate-300 text-[11px] font-mono px-2 py-1 rounded border border-slate-700">
          Cod: #{property.code}
        </div>
      </div>

      {/* Conteúdo do Card */}
      <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
        <div className="space-y-2">
          {/* Cidade e Bairro */}
          <div className="flex items-center gap-1.5 text-xs text-brandRed-400 font-semibold">
            <MapPin className="w-3.5 h-3.5" />
            <span>
              {property.neighborhood}, {property.city} - SP
            </span>
          </div>

          {/* Título do Imóvel */}
          <Link
            href={`/imovel/${property.slug}`}
            className="block text-base font-bold text-white group-hover:text-brandRed-400 transition-colors line-clamp-2 leading-snug"
          >
            {property.title}
          </Link>
        </div>

        {/* Especificações (m², Quartos, Banheiros, Vagas) */}
        <div className="grid grid-cols-4 gap-2 py-3 border-y border-slate-800/80 text-slate-300 text-xs text-center">
          <div className="flex flex-col items-center">
            <Maximize2 className="w-4 h-4 text-slate-400 mb-1" />
            <span className="font-semibold text-white">{property.area} m²</span>
          </div>
          <div className="flex flex-col items-center">
            <Bed className="w-4 h-4 text-slate-400 mb-1" />
            <span className="font-semibold text-white">{property.bedrooms} hab.</span>
          </div>
          <div className="flex flex-col items-center">
            <Bath className="w-4 h-4 text-slate-400 mb-1" />
            <span className="font-semibold text-white">{property.bathrooms} ban.</span>
          </div>
          <div className="flex flex-col items-center">
            <Car className="w-4 h-4 text-slate-400 mb-1" />
            <span className="font-semibold text-white">{property.parking} vag.</span>
          </div>
        </div>

        {/* Preço e Botão de Ação */}
        <div className="flex items-center justify-between pt-1">
          <div>
            <span className="text-[10px] text-slate-400 uppercase tracking-wider font-medium">Valor</span>
            <div className="text-xl font-extrabold text-white">
              {formatCurrency(property.price)}
              {property.purpose === 'TEMPORADA' && <span className="text-xs text-slate-400 font-normal"> /diária</span>}
            </div>
          </div>

          <div className="flex items-center gap-2">
            <a
              href={`https://wa.me/5512997484619?text=${whatsappMessage}`}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2.5 rounded-xl bg-whatsapp/15 text-whatsapp border border-whatsapp/30 hover:bg-whatsapp hover:text-white transition-all"
              title="Chamar no WhatsApp"
            >
              <MessageCircle className="w-4 h-4 fill-current" />
            </a>
            <Link
              href={`/imovel/${property.slug}`}
              className="px-3.5 py-2.5 rounded-xl bg-brandRed-600 hover:bg-brandRed-700 text-white text-xs font-bold transition-all shadow-md shadow-brandRed-900/30"
            >
              Ver Detalhes
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
