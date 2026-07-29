import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { Calculator, Landmark, ArrowRight, CheckCircle2, ExternalLink } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Financiamento Imobiliário | Ferreira Imóveis — Simulação e Consultoria',
  description:
    'Simule seu financiamento imobiliário e descubra as melhores condições para adquirir seu imóvel em Cruzeiro ou Ubatuba SP. Consultoria Ferreira Imóveis.',
};

export default function FinanciamentoPage() {
  const bancos = [
    { nome: 'Caixa Econômica Federal', url: 'https://www.caixa.gov.br/voce/habitacao/Paginas/default.aspx', desc: 'Melhores condições do mercado e programas como Minha Casa Minha Vida.' },
    { nome: 'Banco do Brasil', url: 'https://www.bb.com.br/pbb/pagina-inicial/voce/produtos-e-servicos/credito/credito-imobiliario', desc: 'Financiamento com taxas competitivas e prazos longos.' },
    { nome: 'Itaú', url: 'https://www.itau.com.br/emprestimos-financiamentos/credito-imobiliario', desc: 'Financiamento com pré-aprovação online rápida.' },
    { nome: 'Bradesco', url: 'https://banco.bradesco/html/classic/produtos-servicos/emprestimo-e-financiamento/financiamento-imobiliario.shtm', desc: 'Parcelas que cabem no bolso com seguros inclusos.' },
    { nome: 'Santander', url: 'https://www.santander.com.br/credito-financiamento/credito-imobiliario', desc: 'Simulação online e assessoria completa.' },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-12 space-y-12">
      <div className="text-center space-y-4 max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-brandRed-600/20 text-brandRed-400 text-xs font-bold uppercase">
          <Calculator className="w-4 h-4" /> Financiamento
        </div>
        <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
          Financiamento <span className="text-brandRed-500">Imobiliário</span>
        </h1>
        <p className="text-slate-400 text-sm leading-relaxed">
          A Ferreira Imóveis orienta você em todas as etapas do financiamento. Simule nos sites oficiais abaixo e fale conosco para ajuda personalizada.
        </p>
      </div>

      {/* Simuladores dos Bancos */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {bancos.map((banco) => (
          <a
            key={banco.nome}
            href={banco.url}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-[#1E293B] border border-slate-800 hover:border-brandRed-500/50 p-6 rounded-2xl space-y-3 group transition-all hover:-translate-y-1 hover:shadow-xl"
          >
            <div className="flex items-center justify-between">
              <div className="w-10 h-10 rounded-xl bg-brandRed-600/20 text-brandRed-400 flex items-center justify-center group-hover:bg-brandRed-600 group-hover:text-white transition">
                <Landmark className="w-5 h-5" />
              </div>
              <ExternalLink className="w-4 h-4 text-slate-500 group-hover:text-brandRed-400 transition" />
            </div>
            <h3 className="text-sm font-bold text-white group-hover:text-brandRed-400 transition">{banco.nome}</h3>
            <p className="text-[11px] text-slate-400">{banco.desc}</p>
          </a>
        ))}
      </div>

      {/* Dicas e Documentação */}
      <div className="bg-[#1E293B] border border-slate-800 rounded-3xl p-6 sm:p-10 grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
        <div className="space-y-6">
          <h2 className="text-2xl font-extrabold text-white">
            Documentação Necessária para <span className="text-brandRed-500">Financiar</span>
          </h2>
          <ul className="space-y-3 text-xs text-slate-300">
            {[
              'RG e CPF dos compradores',
              'Comprovante de estado civil (certidão de casamento ou nascimento)',
              'Comprovante de renda dos últimos 3 meses (holerites, DECORE, IR)',
              'Comprovante de residência atualizado',
              'Extrato bancário dos últimos 3 meses',
              'Certidão negativa de débitos (CND)',
              'Declaração de Imposto de Renda completa',
            ].map((doc) => (
              <li key={doc} className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-brandRed-500 shrink-0 mt-0.5" />
                {doc}
              </li>
            ))}
          </ul>
        </div>

        <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl space-y-4">
          <h3 className="text-base font-bold text-white">Precisa de Ajuda com o Financiamento?</h3>
          <p className="text-xs text-slate-400 leading-relaxed">
            Nossa equipe pode acompanhar você em todo o processo de financiamento, desde a simulação inicial até a assinatura do contrato. Fale conosco para uma consultoria personalizada sem compromisso.
          </p>
          <div className="flex flex-col sm:flex-row gap-3">
            <a
              href="https://wa.me/5512997484619?text=Ol%C3%A1!%20Gostaria%20de%20ajuda%20com%20financiamento%20imobili%C3%A1rio."
              target="_blank"
              rel="noopener noreferrer"
              className="py-3 px-5 rounded-xl bg-whatsapp hover:bg-whatsappHover text-white font-bold text-xs text-center transition"
            >
              Falar no WhatsApp
            </a>
            <Link
              href="/contato"
              className="py-3 px-5 rounded-xl bg-brandRed-600 hover:bg-brandRed-700 text-white font-bold text-xs text-center flex items-center justify-center gap-1 transition"
            >
              Enviar Mensagem <ArrowRight className="w-3 h-3" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
