import React from 'react';
import type { Metadata } from 'next';
import AnunciarForm from '@/components/AnunciarForm';
import { Megaphone, CheckCircle2, ShieldCheck } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Anunciar Imóvel | Ferreira Imóveis — Venda ou Alugue com Segurança',
  description:
    'Cadastre seu imóvel para venda ou locação com a Ferreira Imóveis. Avaliação profissional e contratos seguros em Cruzeiro e Ubatuba SP.',
};

export default function AnunciarPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-12 space-y-12">
      <div className="text-center space-y-4 max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-brandRed-600/20 text-brandRed-400 text-xs font-bold uppercase">
          <Megaphone className="w-4 h-4" /> Captação de Imóveis
        </div>
        <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
          Anuncie seu Imóvel com a <span className="text-brandRed-500">Ferreira Imóveis</span>
        </h1>
        <p className="text-slate-400 text-sm leading-relaxed">
          Quer vender ou alugar seu imóvel em Cruzeiro ou Ubatuba? Preencha o formulário abaixo com as informações básicas e nossa equipe entrará em contato para uma avaliação profissional sem compromisso.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-7">
          <AnunciarForm />
        </div>

        <div className="lg:col-span-5 space-y-6">
          <div className="bg-[#1E293B] border border-slate-800 p-6 rounded-2xl space-y-5">
            <h3 className="text-base font-bold text-white border-b border-slate-800 pb-3">
              Por que anunciar com a Ferreira Imóveis?
            </h3>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-brandRed-500 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs font-bold text-white">Avaliação Gratuita</h4>
                  <p className="text-[11px] text-slate-400">Realizamos uma análise de mercado completa para definir o melhor preço para o seu imóvel.</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-brandRed-500 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs font-bold text-white">Fotos Profissionais</h4>
                  <p className="text-[11px] text-slate-400">Fotografamos o imóvel com qualidade para atrair mais interessados.</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-brandRed-500 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs font-bold text-white">Divulgação Ampla</h4>
                  <p className="text-[11px] text-slate-400">Seu imóvel é anunciado em nosso site, redes sociais e canais de contato com interessados cadastrados.</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <ShieldCheck className="w-5 h-5 text-brandRed-500 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs font-bold text-white">Contratos Seguros</h4>
                  <p className="text-[11px] text-slate-400">Contratos elaborados dentro da legislação brasileira com segurança para todas as partes.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
