import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
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
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-brandRed-600/20 text-brandRed-400 text-xs font-bold uppercase">
          <Award className="w-4 h-4" /> Nossa História
        </div>
        <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
          Sobre a <span className="text-brandRed-500">Ferreira Imóveis</span>
        </h1>
        <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
          Tradição, transparência e compromisso com a segurança jurídica de cada negociação imobiliária.
        </p>
      </div>

      {/* Bloco Institucional Principal */}
      <div className="bg-[#1E293B] border border-slate-800 rounded-3xl p-6 sm:p-12 grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        <div className="lg:col-span-7 space-y-6">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white leading-tight">
            Excelência em Consultoria Imobiliária no <span className="text-brandRed-500">Vale do Paraíba</span> e no <span className="text-brandRed-500">Litoral Norte</span>
          </h2>

          <div className="space-y-4 text-slate-300 text-sm leading-relaxed">
            <p>
              A <strong className="text-white">Ferreira Imóveis</strong> é uma empresa familiar sólida, conduzida pelos corretores <strong className="text-white">Afrânio Ramos Ferreira Filho</strong> e <strong className="text-white">Maria Fernanda Ferreira</strong>, que juntos construíram mais de 15 anos de atuação no mercado imobiliário da região de Cruzeiro - SP e litoral norte paulista.
            </p>

            <p>
              Nossa missão é prestar serviços e consultoria imobiliária com total transparência, focados em atender as necessidades reais de cada cliente e família. Trabalhamos com <strong className="text-white">locação e venda de imóveis residenciais e comerciais</strong>, consultoria especializada e elaboração de <strong className="text-white">laudos formais de avaliação</strong> com valor técnico e jurídico.
            </p>

            <p>
              Afrânio Ramos Ferreira Filho é inscrito sob o <strong className="text-brandRed-400">CRECI n° 130906-F</strong> e Maria Fernanda Ferreira sob o <strong className="text-brandRed-400">CRECI n° 198557-F</strong> — credenciais que garantem a atuação profissional regulamentada junto ao Conselho Regional de Corretores de Imóveis.
            </p>

            <p>
              Todos os nossos contratos de venda e locação são elaborados em estrita conformidade com a legislação vigente, contendo todas as cláusulas indispensáveis para a <strong className="text-white">segurança jurídica de proprietários, compradores e inquilinos</strong>. Na Ferreira Imóveis, cada negociação é tratada com o cuidado e a atenção que sua família merece.
            </p>
          </div>

          {/* Diferenciais */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
            <div className="flex items-start gap-3 bg-slate-900/80 p-4 rounded-xl border border-slate-800">
              <CheckCircle2 className="w-5 h-5 text-brandRed-500 shrink-0 mt-0.5" />
              <div>
                <h4 className="text-xs font-bold text-white">Contratos com Segurança Jurídica</h4>
                <p className="text-[11px] text-slate-400">Todas as cláusulas exigidas por lei para proteção das partes.</p>
              </div>
            </div>
            <div className="flex items-start gap-3 bg-slate-900/80 p-4 rounded-xl border border-slate-800">
              <CheckCircle2 className="w-5 h-5 text-brandRed-500 shrink-0 mt-0.5" />
              <div>
                <h4 className="text-xs font-bold text-white">Laudos de Avaliação Técnica</h4>
                <p className="text-[11px] text-slate-400">Avaliações precisas de valor de mercado com respaldo profissional.</p>
              </div>
            </div>
            <div className="flex items-start gap-3 bg-slate-900/80 p-4 rounded-xl border border-slate-800">
              <CheckCircle2 className="w-5 h-5 text-brandRed-500 shrink-0 mt-0.5" />
              <div>
                <h4 className="text-xs font-bold text-white">Atendimento Personalizado</h4>
                <p className="text-[11px] text-slate-400">Cada cliente é único. Entendemos suas necessidades antes de apresentar opções.</p>
              </div>
            </div>
            <div className="flex items-start gap-3 bg-slate-900/80 p-4 rounded-xl border border-slate-800">
              <CheckCircle2 className="w-5 h-5 text-brandRed-500 shrink-0 mt-0.5" />
              <div>
                <h4 className="text-xs font-bold text-white">Atuação em Cruzeiro e Ubatuba</h4>
                <p className="text-[11px] text-slate-400">Imóveis residenciais, comerciais e de temporada no litoral.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Coluna Lateral: Corretores */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl space-y-6">
            <h3 className="text-lg font-bold text-white flex items-center gap-2 border-b border-slate-800 pb-3">
              <Users className="w-5 h-5 text-brandRed-500" /> Corretores Responsáveis
            </h3>

            <div className="p-4 rounded-xl bg-[#1E293B] border border-slate-800 space-y-2">
              <h4 className="text-base font-bold text-white">Afrânio Ramos Ferreira Filho</h4>
              <p className="text-sm text-brandRed-400 font-mono font-bold">CRECI n° 130906-F</p>
              <p className="text-xs text-slate-400">Consultor Imobiliário, Perito Avaliador e Proprietário da Ferreira Imóveis. Mais de 15 anos de experiência no mercado do Vale do Paraíba.</p>
            </div>

            <div className="p-4 rounded-xl bg-[#1E293B] border border-slate-800 space-y-2">
              <h4 className="text-base font-bold text-white">Maria Fernanda Ferreira</h4>
              <p className="text-sm text-brandRed-400 font-mono font-bold">CRECI n° 198557-F</p>
              <p className="text-xs text-slate-400">Consultora Imobiliária e gestora de contratos. Atendimento humanizado e dedicado a cada família.</p>
            </div>
          </div>

          {/* Serviços */}
          <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl space-y-4">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider border-b border-slate-800 pb-3 flex items-center gap-2">
              <Briefcase className="w-4 h-4 text-brandRed-500" /> Nossos Serviços
            </h3>
            <ul className="space-y-3 text-xs text-slate-300">
              <li className="flex items-start gap-2">
                <Home className="w-4 h-4 text-brandRed-500 shrink-0 mt-0.5" />
                Venda de imóveis residenciais e comerciais
              </li>
              <li className="flex items-start gap-2">
                <FileText className="w-4 h-4 text-brandRed-500 shrink-0 mt-0.5" />
                Locação com contratos completos e seguros
              </li>
              <li className="flex items-start gap-2">
                <ShieldCheck className="w-4 h-4 text-brandRed-500 shrink-0 mt-0.5" />
                Consultoria imobiliária personalizada
              </li>
              <li className="flex items-start gap-2">
                <Award className="w-4 h-4 text-brandRed-500 shrink-0 mt-0.5" />
                Laudos de avaliação técnica (PTAM)
              </li>
            </ul>
          </div>

          <Link
            href="/contato"
            className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-brandRed-600 hover:bg-brandRed-700 text-white font-bold text-sm transition shadow-lg shadow-brandRed-900/40"
          >
            Entrar em Contato <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>

      {/* Mapa */}
      <div className="space-y-4">
        <h2 className="text-xl font-bold text-white">Nosso Escritório em Cruzeiro - SP</h2>
        <p className="text-xs text-slate-400">Rua Professor Virgílio Antunes, 57 - Centro - Cruzeiro - SP</p>
        <GoogleMapEmbed height="360px" />
      </div>
    </div>
  );
}
