import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import GoogleMapEmbed from '@/components/GoogleMapEmbed';
import {
  ShieldCheck,
  Award,
  CheckCircle2,
  FileText,
  Users,
  Briefcase,
  Home,
  ArrowRight,
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'Sobre Nós | Ferreira Imóveis — Imobiliária em Cruzeiro e Ubatuba SP',
  description:
    'Conheça a Ferreira Imóveis: consultoria imobiliária, laudos de avaliação e contratos com segurança jurídica. Afrânio Ferreira Filho (CRECI 130906-F) e Maria Fernanda Ferreira (CRECI 198557-F).',
};

export default function SobreNosPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-12 space-y-16">
      {/* Header da Página */}
      <div className="text-center space-y-4 max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brandRed-600/20 text-brandRed-400 text-xs font-extrabold uppercase border border-brandRed-600/30">
          <Award className="w-4 h-4 text-brandRed-500" /> Nossa História & Fundadores
        </div>
        <h1 className="text-4xl sm:text-5xl font-black text-white tracking-tight font-heading">
          Sobre a <span className="text-gradient-red">Ferreira Imóveis</span>
        </h1>
        <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
          Tradição, transparência e compromisso com a segurança jurídica de cada negociação imobiliária no Vale do Paraíba e Litoral Norte.
        </p>
      </div>

      {/* Hero da Página Sobre Nós com a Foto Oficial da Empresa */}
      <div className="glass-panel border border-slate-700/80 rounded-3xl p-6 sm:p-12 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center shadow-2xl">
        <div className="lg:col-span-6 space-y-6">
          <h2 className="text-2xl sm:text-4xl font-extrabold text-white leading-tight font-heading">
            Excelência e Consultoria Imobiliária com <span className="text-gradient-red">CRECI Oficial</span>
          </h2>

          <div className="space-y-4 text-slate-300 text-sm leading-relaxed">
            <p>
              A <strong className="text-white font-semibold">Ferreira Imóveis</strong> tem como proprietários <strong className="text-white font-semibold">Afrânio Ramos Ferreira Filho</strong> e <strong className="text-white font-semibold">Maria Fernanda Ferreira</strong>, que juntos prestam serviços e consultoria imobiliária com transparência, voltados a você e sua família.
            </p>

            <p>
              Trabalhamos com <strong className="text-white font-semibold">locação, venda de imóveis comercial e residencial</strong>, consultoria imobiliária personalizada e elaboração de laudos formais de avaliação.
            </p>

            <p>
              Afrânio Ramos Ferreira Filho é inscrito sob o <strong className="text-brandRed-400 font-mono font-bold">CRECI n° 130906-F</strong> e Maria Fernanda Ferreira sob o <strong className="text-brandRed-400 font-mono font-bold">CRECI n° 198557-F</strong>.
            </p>

            <p>
              Fazemos contratos de venda e locação dentro da legislação vigente, com todas as cláusulas necessárias para a segurança jurídica de todas as partes envolvidas.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
            <div className="flex items-start gap-3 bg-slate-900/90 p-4 rounded-2xl border border-slate-800">
              <CheckCircle2 className="w-5 h-5 text-brandRed-500 shrink-0 mt-0.5" />
              <div>
                <h4 className="text-xs font-bold text-white">Segurança Jurídica</h4>
                <p className="text-[11px] text-slate-400">Contratos com total amparo legal.</p>
              </div>
            </div>
            <div className="flex items-start gap-3 bg-slate-900/90 p-4 rounded-2xl border border-slate-800">
              <CheckCircle2 className="w-5 h-5 text-brandRed-500 shrink-0 mt-0.5" />
              <div>
                <h4 className="text-xs font-bold text-white">Laudos Técnicos</h4>
                <p className="text-[11px] text-slate-400">Laudos formais de avaliação técnica.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Foto Oficial da Ferreira Imóveis em Destaque no Sobre Nós */}
        <div className="lg:col-span-6">
          <div className="relative w-full aspect-[4/3] rounded-3xl overflow-hidden border-2 border-slate-700 shadow-2xl shadow-brandRed-950/50 group">
            <Image
              src="/ferreira-foto.jpg"
              alt="Instalações e Equipe Ferreira Imóveis"
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-700"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
            <div className="absolute bottom-4 left-4 right-4 p-4 rounded-2xl bg-[#070A12]/90 backdrop-blur-md border border-slate-700">
              <p className="text-white text-xs font-bold">Ferreira Imóveis — Sede em Cruzeiro - SP</p>
              <p className="text-[11px] text-slate-400">Rua Professor Virgílio Antunes, 57 - Centro</p>
            </div>
          </div>
        </div>
      </div>

      {/* Bloco de Corretores */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-[#111827] border border-slate-800 p-8 rounded-3xl space-y-3">
          <div className="w-12 h-12 rounded-2xl bg-brandRed-600/20 text-brandRed-400 flex items-center justify-center border border-brandRed-600/30">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <h3 className="text-xl font-bold text-white">Afrânio Ramos Ferreira Filho</h3>
          <p className="text-xs text-brandRed-400 font-mono font-bold uppercase">CRECI n° 130906-F</p>
          <p className="text-xs text-slate-300 leading-relaxed">
            Proprietário e corretor credenciado. Experiência de mercado com foco em consultoria de investimento, avaliação imobiliária e segurança contratual.
          </p>
        </div>

        <div className="bg-[#111827] border border-slate-800 p-8 rounded-3xl space-y-3">
          <div className="w-12 h-12 rounded-2xl bg-brandRed-600/20 text-brandRed-400 flex items-center justify-center border border-brandRed-600/30">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <h3 className="text-xl font-bold text-white">Maria Fernanda Ferreira</h3>
          <p className="text-xs text-brandRed-400 font-mono font-bold uppercase">CRECI n° 198557-F</p>
          <p className="text-xs text-slate-300 leading-relaxed">
            Proprietária e corretora credenciada. Atendimento humanizado, gestão contratual e acompanhamento dedicado de cada família cliente.
          </p>
        </div>
      </div>

      {/* Mapa */}
      <div className="space-y-4">
        <h2 className="text-2xl font-bold text-white font-heading">Nosso Escritório em Cruzeiro - SP</h2>
        <p className="text-xs text-slate-400">Rua Professor Virgílio Antunes, 57 - Centro - Cruzeiro - SP</p>
        <GoogleMapEmbed height="400px" />
      </div>
    </div>
  );
}
