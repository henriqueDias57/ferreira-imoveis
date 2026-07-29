'use client';

import React from 'react';
import Link from 'next/link';
import { Home, Phone, Mail, MapPin, Clock, Facebook, Instagram, ShieldCheck, Lock } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-[#090D16] border-t border-slate-800/80 text-slate-400 pt-12 pb-8">
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
        {/* Coluna 1: Sobre e CRECI */}
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-brandRed-600 flex items-center justify-center text-white font-bold">
              <Home className="w-5 h-5" />
            </div>
            <div>
              <span className="text-lg font-bold text-white tracking-tight">FERREIRA </span>
              <span className="text-lg font-light text-slate-300">IMÓVEIS</span>
            </div>
          </div>

          <p className="text-xs text-slate-400 leading-relaxed">
            Consultoria imobiliária de excelência, laudos de avaliação, contratos com total legalidade e atendimento personalizado para a compra, venda e locação em Cruzeiro e litoral em Ubatuba - SP.
          </p>

          <div className="bg-slate-900/90 border border-slate-800 p-3 rounded-lg text-xs space-y-1.5">
            <div className="flex items-center gap-1.5 text-slate-200 font-semibold">
              <ShieldCheck className="w-4 h-4 text-brandRed-500" />
              Corretores Credenciados
            </div>
            <p className="text-slate-400">
              <strong className="text-slate-300">Afrânio Ferreira Filho</strong> — CRECI 130906-F
            </p>
            <p className="text-slate-400">
              <strong className="text-slate-300">Maria Fernanda Ferreira</strong> — CRECI 198557-F
            </p>
          </div>
        </div>

        {/* Coluna 2: Links Rápidos */}
        <div className="space-y-3">
          <h4 className="text-sm font-bold text-white uppercase tracking-wider border-b border-brandRed-600/40 pb-2 inline-block">
            Navegação Rápida
          </h4>
          <ul className="space-y-2 text-xs">
            <li>
              <Link href="/imoveis?purpose=VENDA" className="hover:text-brandRed-400 transition">
                Imóveis à Venda em Cruzeiro
              </Link>
            </li>
            <li>
              <Link href="/imoveis?purpose=LOCACAO" className="hover:text-brandRed-400 transition">
                Casas e Apartamentos para Alugar
              </Link>
            </li>
            <li>
              <Link href="/imoveis?purpose=TEMPORADA" className="hover:text-brandRed-400 transition">
                Imóveis de Temporada em Ubatuba
              </Link>
            </li>
            <li>
              <Link href="/sobre-nos" className="hover:text-brandRed-400 transition">
                Nossa História & Institucional
              </Link>
            </li>
            <li>
              <Link href="/anunciar" className="hover:text-brandRed-400 transition">
                Anuncie ou Venda seu Imóvel
              </Link>
            </li>
            <li>
              <Link href="/financiamento" className="hover:text-brandRed-400 transition">
                Simulação de Financiamento
              </Link>
            </li>
            <li>
              <Link href="/contato" className="hover:text-brandRed-400 transition">
                Fale com Nossos Corretores
              </Link>
            </li>
          </ul>
        </div>

        {/* Coluna 3: Regiões de Atuação */}
        <div className="space-y-3">
          <h4 className="text-sm font-bold text-white uppercase tracking-wider border-b border-brandRed-600/40 pb-2 inline-block">
            Regiões Atendidas
          </h4>
          <ul className="space-y-2 text-xs">
            <li className="text-slate-300 font-semibold">Cruzeiro - SP:</li>
            <li className="pl-2 border-l border-slate-800 text-slate-400">Centro, Jardim América, Vila Nova</li>
            <li className="pl-2 border-l border-slate-800 text-slate-400">Washington Luiz, Itagaçaba, Zona Rural</li>
            <li className="text-slate-300 font-semibold pt-1">Litoral (Ubatuba - SP):</li>
            <li className="pl-2 border-l border-slate-800 text-slate-400">Praia Grande, Tenório, Itaguá</li>
          </ul>
        </div>

        {/* Coluna 4: Contato & Redes */}
        <div className="space-y-3">
          <h4 className="text-sm font-bold text-white uppercase tracking-wider border-b border-brandRed-600/40 pb-2 inline-block">
            Contatos & Atendimento
          </h4>
          <div className="space-y-2.5 text-xs">
            <p className="flex items-start gap-2 text-slate-300">
              <MapPin className="w-4 h-4 text-brandRed-500 shrink-0 mt-0.5" />
              <span>Rua Professor Virgílio Antunes, 57 - Centro, Cruzeiro - SP</span>
            </p>
            <p className="flex items-center gap-2">
              <Phone className="w-4 h-4 text-brandRed-500 shrink-0" />
              <a href="tel:1231457589" className="hover:text-white transition">
                (12) 3145-7589
              </a>
            </p>
            <p className="flex items-center gap-2">
              <Phone className="w-4 h-4 text-whatsapp shrink-0" />
              <a
                href="https://wa.me/5512997484619"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-whatsapp transition"
              >
                (12) 99748-4619 (WhatsApp)
              </a>
            </p>
            <p className="flex items-center gap-2 break-all">
              <Mail className="w-4 h-4 text-brandRed-500 shrink-0" />
              <span>mferreiraimoveis@creci.org.br</span>
            </p>
            <p className="flex items-center gap-2 text-slate-400">
              <Clock className="w-4 h-4 text-slate-500 shrink-0" />
              <span>Segunda a Sexta, das 9h às 18h</span>
            </p>

            {/* Redes Sociais */}
            <div className="pt-2 flex items-center gap-3">
              <a
                href="https://facebook.com/Ferreira-Imóveis-1409487702641931"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center text-slate-300 hover:bg-brandRed-600 hover:text-white transition"
                aria-label="Facebook Ferreira Imóveis"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a
                href="https://instagram.com/imobiliariaferreiraimoveis"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center text-slate-300 hover:bg-brandRed-600 hover:text-white transition"
                aria-label="Instagram Ferreira Imóveis"
              >
                <Instagram className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Bar de Copyright e Acesso Restrito */}
      <div className="max-w-7xl mx-auto px-4 pt-6 border-t border-slate-800/60 flex flex-col md:flex-row items-center justify-between text-xs text-slate-500 gap-4">
        <p>© {new Date().getFullYear()} Ferreira Imóveis — Razão Social: Afrânio Ramos Ferreira Filho. Todos os direitos reservados.</p>
        
        <div className="flex items-center gap-4">
          <Link
            href="/admin/login"
            className="flex items-center gap-1 text-slate-500 hover:text-slate-300 transition text-[11px]"
          >
            <Lock className="w-3 h-3" />
            Acesso Restrito Corretores
          </Link>
        </div>
      </div>
    </footer>
  );
}
