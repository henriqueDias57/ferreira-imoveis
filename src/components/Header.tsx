'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { Phone, MessageCircle, Clock, MapPin, Menu, X, Home, ShieldCheck, Sparkles } from 'lucide-react';

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

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
    <header className="w-full sticky top-0 z-50 bg-[#070A12]/90 backdrop-blur-xl border-b border-slate-800/80">
      {/* Topo informativo de contatos */}
      <div className="bg-[#0B0F19] border-b border-slate-800/60 text-slate-300 text-xs py-2 px-4">
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
              className="flex items-center gap-1.5 hover:text-brandRed-400 transition font-semibold"
            >
              <Phone className="w-3.5 h-3.5 text-brandRed-500" />
              (12) 3145-7589
            </a>
            <span className="text-slate-700">|</span>
            <a
              href="https://wa.me/5512997484619?text=Ol%C3%A1!%20Vim%20pelo%20site%20da%20Ferreira%20Im%C3%B3veis%20e%20gostaria%20de%20atendimento."
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 bg-whatsapp/15 text-whatsapp font-bold px-3 py-1 rounded-full border border-whatsapp/40 hover:bg-whatsapp hover:text-white transition-all text-xs shadow-md shadow-whatsapp/10"
            >
              <MessageCircle className="w-3.5 h-3.5 fill-current" />
              (12) 99748-4619
            </a>
          </div>
        </div>
      </div>

      {/* Menu Principal */}
      <div className="max-w-7xl mx-auto px-4 py-3.5 flex items-center justify-between">
        {/* Logotipo da Ferreira Imóveis com a foto oficial da empresa */}
        <Link href="/" className="flex items-center gap-3.5 group">
          <div className="relative w-12 h-12 rounded-2xl overflow-hidden border-2 border-brandRed-600/60 shadow-lg shadow-brandRed-900/40 group-hover:scale-105 group-hover:border-brandRed-500 transition-all duration-300">
            <Image
              src="/ferreira-foto.jpg"
              alt="Ferreira Imóveis"
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="text-2xl font-black tracking-tight text-white group-hover:text-brandRed-500 transition-colors font-heading">
                FERREIRA
              </span>
              <span className="text-2xl font-light tracking-tight text-slate-300 font-heading">
                IMÓVEIS
              </span>
            </div>
            <p className="text-[10px] text-brandRed-400 font-bold flex items-center gap-1 tracking-wider uppercase">
              <ShieldCheck className="w-3.5 h-3.5 text-brandRed-500 inline" />
              CRECI 130906-F / 198557-F
            </p>
          </div>
        </Link>

        {/* Links de Navegação Desktop */}
        <nav className="hidden lg:flex items-center gap-1 bg-slate-900/60 p-1.5 rounded-2xl border border-slate-800/80">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.name}
                href={link.href}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                  isActive
                    ? 'bg-brandRed-600 text-white shadow-lg shadow-brandRed-900/50'
                    : 'text-slate-300 hover:text-white hover:bg-slate-800/80'
                }`}
              >
                {link.name}
              </Link>
            );
          })}
          {isAdmin && (
            <Link
              href="/admin"
              className="ml-2 px-3.5 py-2 rounded-xl text-xs font-extrabold bg-brandRed-950/80 text-brandRed-400 border border-brandRed-600/60 hover:bg-brandRed-600 hover:text-white transition shadow-md"
            >
              Painel Admin
            </Link>
          )}
        </nav>

        {/* Botão de Menu Mobile */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="lg:hidden p-2.5 rounded-xl bg-slate-900 text-slate-300 hover:text-white hover:bg-slate-800 border border-slate-800 transition"
          aria-label="Alternar Menu"
        >
          {mobileMenuOpen ? <X className="w-6 h-6 text-brandRed-500" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Drawer Mobile */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#0B0F19] border-b border-slate-800 px-4 py-5 space-y-2 animate-in slide-in-from-top duration-300">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="block px-4 py-3 rounded-xl text-slate-200 font-bold text-sm hover:bg-brandRed-600 hover:text-white transition"
            >
              {link.name}
            </Link>
          ))}
          {isAdmin && (
            <Link
              href="/admin"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-4 py-3 rounded-xl bg-brandRed-950 text-brandRed-400 font-extrabold text-sm border border-brandRed-600/40"
            >
              Painel Administrativo
            </Link>
          )}
        </div>
      )}
    </header>
  );
}
