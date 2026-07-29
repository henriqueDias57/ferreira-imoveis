'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Phone, MessageCircle, Clock, MapPin, Menu, X, Home, ShieldCheck } from 'lucide-react';

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  // Esconder header principal em telas de login ou admin se desejado, mas mantemos visibilidade
  const isAdmin = pathname?.startsWith('/admin');

  const navLinks = [
    { name: 'Início', href: '/' },
    { name: 'Comprar', href: '/imoveis?purpose=VENDA' },
    { name: 'Alugar', href: '/imoveis?purpose=LOCACAO' },
    { name: 'Temporada', href: '/imoveis?purpose=TEMPORADA' },
    { name: 'Sobre Nós', href: '/sobre-nos' },
    { name: 'Anunciar Imóvel', href: '/anunciar' },
    { name: 'Financiamento', href: '/financiamento' },
    { name: 'Contato', href: '/contato' },
  ];

  return (
    <header className="w-full sticky top-0 z-50 bg-[#090D16]/95 backdrop-blur-md border-b border-slate-800">
      {/* Topo informativo de contatos */}
      <div className="bg-[#0F172A] border-b border-slate-800/80 text-slate-300 text-xs py-2 px-4">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-2">
          <div className="flex flex-wrap items-center justify-center md:justify-start gap-4">
            <span className="flex items-center gap-1.5 text-slate-300 hover:text-white transition">
              <MapPin className="w-3.5 h-3.5 text-brandRed-500" />
              Rua Prof. Virgílio Antunes, 57 - Centro, Cruzeiro - SP
            </span>
            <span className="hidden lg:flex items-center gap-1.5 text-slate-400">
              <Clock className="w-3.5 h-3.5 text-brandRed-500" />
              Seg a Sex, 9h às 18h
            </span>
          </div>

          <div className="flex items-center gap-4">
            <a
              href="tel:1231457589"
              className="flex items-center gap-1.5 hover:text-brandRed-400 transition font-medium"
            >
              <Phone className="w-3.5 h-3.5 text-brandRed-500" />
              (12) 3145-7589
            </a>
            <span className="text-slate-700">|</span>
            <a
              href="https://wa.me/5512997484619?text=Ol%C3%A1!%20Vim%20pelo%20site%20da%20Ferreira%20Im%C3%B3veis%20e%20gostaria%20de%20atendimento."
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 bg-whatsapp/15 text-whatsapp font-semibold px-2.5 py-0.5 rounded-full border border-whatsapp/30 hover:bg-whatsapp hover:text-white transition-all text-xs"
            >
              <MessageCircle className="w-3.5 h-3.5 fill-current" />
              (12) 99748-4619
            </a>
          </div>
        </div>
      </div>

      {/* Menu Principal */}
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logotipo da Ferreira Imóveis */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-brandRed-600 to-brandRed-800 flex items-center justify-center text-white shadow-lg shadow-brandRed-900/30 group-hover:scale-105 transition-transform">
            <Home className="w-6 h-6 stroke-[2.5]" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="text-xl font-bold tracking-tight text-white group-hover:text-brandRed-500 transition-colors">
                FERREIRA
              </span>
              <span className="text-xl font-light tracking-tight text-slate-400">
                IMÓVEIS
              </span>
            </div>
            <p className="text-[10px] text-slate-400 font-medium flex items-center gap-1 tracking-wider uppercase">
              <ShieldCheck className="w-3 h-3 text-brandRed-500 inline" />
              CRECI 130906-F / 198557-F
            </p>
          </div>
        </Link>

        {/* Links de Navegação Desktop */}
        <nav className="hidden lg:flex items-center gap-1">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.name}
                href={link.href}
                className={`px-3.5 py-2 rounded-lg text-sm font-medium transition-all ${
                  isActive
                    ? 'bg-brandRed-600 text-white shadow-md shadow-brandRed-900/40'
                    : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
                }`}
              >
                {link.name}
              </Link>
            );
          })}
          {isAdmin && (
            <Link
              href="/admin"
              className="ml-2 px-3 py-1.5 rounded-lg text-xs font-semibold bg-slate-800 text-brandRed-400 border border-brandRed-600/40 hover:bg-brandRed-600 hover:text-white transition"
            >
              Painel Admin
            </Link>
          )}
        </nav>

        {/* Botão de Menu Mobile */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="lg:hidden p-2 rounded-lg bg-slate-800 text-slate-300 hover:text-white hover:bg-slate-700 transition"
          aria-label="Alternar Menu"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Drawer de Navegação Mobile */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#0F172A] border-b border-slate-800 px-4 py-4 space-y-2 animate-in slide-in-from-top duration-200">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="block px-4 py-2.5 rounded-lg text-slate-200 font-medium hover:bg-brandRed-600 hover:text-white transition"
            >
              {link.name}
            </Link>
          ))}
          {isAdmin && (
            <Link
              href="/admin"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-4 py-2.5 rounded-lg bg-slate-800 text-brandRed-400 font-semibold border border-brandRed-500/30"
            >
              Painel Administrativo
            </Link>
          )}
        </div>
      )}
    </header>
  );
}
