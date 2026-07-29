'use client';

import React from 'react';
import { MessageCircle } from 'lucide-react';

export default function FloatingWhatsApp() {
  const whatsappNumber = '5512997484619';
  const defaultText = encodeURIComponent(
    'Olá! Vim pelo site da Ferreira Imóveis e gostaria de receber informações e atendimento.'
  );

  return (
    <a
      href={`https://wa.me/${whatsappNumber}?text=${defaultText}`}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 group flex items-center gap-3 bg-whatsapp text-white px-4 py-3.5 rounded-full shadow-2xl shadow-whatsapp/40 hover:bg-whatsappHover hover:scale-105 transition-all duration-300 border border-white/20"
      aria-label="Atendimento via WhatsApp"
    >
      <div className="relative">
        <MessageCircle className="w-6 h-6 fill-current animate-pulse" />
        <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-white rounded-full animate-ping" />
      </div>
      <span className="text-xs font-bold tracking-wide hidden sm:inline-block">
        Fale no WhatsApp
      </span>
    </a>
  );
}
