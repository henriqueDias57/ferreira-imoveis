import React from 'react';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { db } from '@/lib/db';
import PropertyDetailGallery from '@/components/PropertyDetailGallery';
import PropertyInquiryForm from '@/components/PropertyInquiryForm';
import GoogleMapEmbed from '@/components/GoogleMapEmbed';
import {
  Bed,
  Bath,
  Car,
  Maximize2,
  MapPin,
  MessageCircle,
  ArrowLeft,
  Share2,
  ShieldCheck,
} from 'lucide-react';

export const revalidate = 0;

interface PropertyDetailPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateMetadata({ params }: PropertyDetailPageProps) {
  const { slug } = await params;
  const property = await db.property.findFirst({
    where: { slug },
  });

  if (!property) {
    return {
      title: 'Imóvel não encontrado | Ferreira Imóveis',
    };
  }

  const formatPrice = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(property.price);

  return {
    title: `${property.title} - Code #${property.code} | Ferreira Imóveis`,
    description: `${property.type} em ${property.neighborhood}, ${property.city} - SP por ${formatPrice}. ${property.bedrooms} dorms, ${property.area}m². CRECI 130906-F / 198557-F.`,
    openGraph: {
      title: `${property.title} | Ferreira Imóveis`,
      description: property.description.substring(0, 160),
    },
  };
}

export default async function PropertyDetailPage({ params }: PropertyDetailPageProps) {
  const { slug } = await params;

  const property = await db.property.findFirst({
    where: { slug },
    include: { photos: { orderBy: { order: 'asc' } } },
  });

  if (!property) {
    notFound();
  }

  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
      maximumFractionDigits: 0,
    }).format(val);
  };

  const whatsappMessage = encodeURIComponent(
    `Olá! Tenho interesse no imóvel código ${property.code} (${property.title}) no valor de ${formatCurrency(property.price)} anunciado no site da Ferreira Imóveis.`
  );

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-8">
      {/* Botão de Voltar */}
      <div>
        <Link
          href="/imoveis"
          className="inline-flex items-center gap-2 text-xs font-bold text-slate-400 hover:text-white transition bg-[#1E293B] px-3.5 py-2 rounded-xl border border-slate-800"
        >
          <ArrowLeft className="w-4 h-4" /> Voltar para o Catálogo
        </Link>
      </div>

      {/* Header do Imóvel */}
      <div className="flex flex-col lg:flex-row justify-between lg:items-end gap-4 border-b border-slate-800 pb-6">
        <div className="space-y-2">
          <div className="flex flex-wrap items-center gap-2">
            <span className="bg-brandRed-600 text-white text-xs font-bold px-3 py-1 rounded-md uppercase tracking-wider">
              {property.purpose}
            </span>
            <span className="bg-slate-800 text-slate-300 text-xs font-mono px-3 py-1 rounded-md border border-slate-700">
              Código: #{property.code}
            </span>
            {property.featured && (
              <span className="bg-amber-500 text-slate-950 text-xs font-extrabold px-3 py-1 rounded-md uppercase">
                Imóvel em Destaque
              </span>
            )}
          </div>

          <h1 className="text-2xl sm:text-4xl font-extrabold text-white leading-tight">
            {property.title}
          </h1>

          <p className="flex items-center gap-1.5 text-xs sm:text-sm text-brandRed-400 font-semibold">
            <MapPin className="w-4 h-4" />
            {property.address ? property.address : `${property.neighborhood}, ${property.city} - SP`}
          </p>
        </div>

        {/* Bloco de Valor */}
        <div className="bg-[#1E293B] border border-slate-800 p-4 rounded-2xl min-w-[220px] text-right space-y-1">
          <span className="text-xs text-slate-400 uppercase font-semibold">Valor do Imóvel</span>
          <div className="text-2xl sm:text-3xl font-black text-white">
            {formatCurrency(property.price)}
            {property.purpose === 'TEMPORADA' && <span className="text-xs font-normal text-slate-400"> /diária</span>}
          </div>
          {(property.condoFee || property.iptu) && (
            <div className="text-[11px] text-slate-400 flex items-center justify-end gap-3 pt-1 border-t border-slate-800">
              {property.condoFee ? <span>Condomínio: {formatCurrency(property.condoFee)}</span> : null}
              {property.iptu ? <span>IPTU: {formatCurrency(property.iptu)}</span> : null}
            </div>
          )}
        </div>
      </div>

      {/* Galeria de Fotos Interativa */}
      <PropertyDetailGallery photos={property.photos} title={property.title} />

      {/* Grid Principal: Detalhes + Form de Proposta */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Coluna Esquerda: Especificações e Descrição */}
        <div className="lg:col-span-8 space-y-8">
          {/* Card de Características Rápidas */}
          <div className="bg-[#1E293B] border border-slate-800 rounded-2xl p-6 grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-slate-900 flex items-center justify-center text-brandRed-500">
                <Maximize2 className="w-5 h-5" />
              </div>
              <div>
                <span className="block text-[11px] text-slate-400 uppercase">Área Útil</span>
                <strong className="text-sm font-bold text-white">{property.area} m²</strong>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-slate-900 flex items-center justify-center text-brandRed-500">
                <Bed className="w-5 h-5" />
              </div>
              <div>
                <span className="block text-[11px] text-slate-400 uppercase">Dormitórios</span>
                <strong className="text-sm font-bold text-white">
                  {property.bedrooms} {property.suites > 0 ? `(${property.suites} suíte)` : ''}
                </strong>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-slate-900 flex items-center justify-center text-brandRed-500">
                <Bath className="w-5 h-5" />
              </div>
              <div>
                <span className="block text-[11px] text-slate-400 uppercase">Banheiros</span>
                <strong className="text-sm font-bold text-white">{property.bathrooms} banheiros</strong>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-slate-900 flex items-center justify-center text-brandRed-500">
                <Car className="w-5 h-5" />
              </div>
              <div>
                <span className="block text-[11px] text-slate-400 uppercase">Vagas</span>
                <strong className="text-sm font-bold text-white">{property.parking} vagas</strong>
              </div>
            </div>
          </div>

          {/* Descrição Detalhada */}
          <div className="bg-[#1E293B] border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-4">
            <h2 className="text-xl font-bold text-white border-b border-slate-800 pb-3">
              Descrição do Imóvel
            </h2>
            <p className="text-slate-300 text-sm leading-relaxed whitespace-pre-line">
              {property.description}
            </p>
          </div>

        </div>

        {/* Coluna Direita: CTA WhatsApp & Form de Interesse */}
        <div className="lg:col-span-4 space-y-6">
          {/* Botão de WhatsApp Direto */}
          <a
            href={`https://wa.me/5512997484619?text=${whatsappMessage}`}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full py-4 rounded-2xl bg-whatsapp hover:bg-whatsappHover text-white font-bold text-sm flex items-center justify-center gap-3 shadow-xl shadow-whatsapp/30 transition-all hover:scale-[1.02]"
          >
            <MessageCircle className="w-6 h-6 fill-current" />
            Falar no WhatsApp Sobre Este Imóvel
          </a>

          {/* Formulário de Proposta / Agendamento */}
          <PropertyInquiryForm propertyId={property.id} propertyCode={property.code} />

          {/* Card de Segurança do Corretor */}
          <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl space-y-3 text-xs text-slate-400">
            <div className="flex items-center gap-2 text-slate-200 font-bold">
              <ShieldCheck className="w-5 h-5 text-brandRed-500" />
              Atendimento com Segurança Jurídica
            </div>
            <p>
              Intermediado oficialmente pela <strong>Ferreira Imóveis</strong> com registro CRECI 130906-F / 198557-F. Agende uma visita ou faça uma proposta com total garantia.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
