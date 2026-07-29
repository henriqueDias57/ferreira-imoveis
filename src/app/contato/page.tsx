import React from 'react';
import type { Metadata } from 'next';
import HomeContactForm from '@/components/HomeContactForm';
import GoogleMapEmbed from '@/components/GoogleMapEmbed';
import { MapPin, Phone, Mail, Clock, MessageCircle, Facebook, Instagram } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Contato | Ferreira Imóveis — Fale com Nossos Corretores em Cruzeiro SP',
  description:
    'Entre em contato com a Ferreira Imóveis. Endereço: Rua Prof. Virgílio Antunes, 57 - Centro, Cruzeiro - SP. WhatsApp (12) 99748-4619.',
};

export default function ContatoPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-12 space-y-12">
      <div className="text-center space-y-4 max-w-3xl mx-auto">
        <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
          Fale com a <span className="text-brandRed-500">Ferreira Imóveis</span>
        </h1>
        <p className="text-slate-400 text-sm leading-relaxed">
          Estamos à disposição para ajudar você a encontrar o imóvel ideal ou esclarecer qualquer dúvida sobre nossos serviços.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Formulário de Contato */}
        <div className="lg:col-span-7">
          <HomeContactForm />
        </div>

        {/* Informações de Contato */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-[#1E293B] border border-slate-800 p-6 rounded-2xl space-y-5">
            <h3 className="text-base font-bold text-white border-b border-slate-800 pb-3">
              Informações de Contato
            </h3>

            <div className="space-y-4 text-xs">
              <div className="flex items-start gap-3 text-slate-300">
                <MapPin className="w-5 h-5 text-brandRed-500 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-white block text-sm">Endereço</strong>
                  Rua Professor Virgílio Antunes, 57 - Centro<br />
                  Cruzeiro - SP
                </div>
              </div>

              <div className="flex items-start gap-3 text-slate-300">
                <Phone className="w-5 h-5 text-brandRed-500 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-white block text-sm">Telefones</strong>
                  <a href="tel:1231457589" className="hover:text-brandRed-400 transition">(12) 3145-7589</a> (Fixo)<br />
                  <a href="tel:5512997484619" className="hover:text-whatsapp transition">(12) 99748-4619</a> (WhatsApp)
                </div>
              </div>

              <div className="flex items-start gap-3 text-slate-300">
                <Mail className="w-5 h-5 text-brandRed-500 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-white block text-sm">E-mails</strong>
                  mferreiraimoveis@creci.org.br<br />
                  imobiliariaferreiraimoveis@bol.com.br
                </div>
              </div>

              <div className="flex items-start gap-3 text-slate-300">
                <Clock className="w-5 h-5 text-brandRed-500 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-white block text-sm">Horário de Atendimento</strong>
                  Segunda a Sexta, das 9h às 18h
                </div>
              </div>
            </div>

            {/* Redes Sociais */}
            <div className="flex items-center gap-3 pt-3 border-t border-slate-800">
              <a
                href="https://wa.me/5512997484619"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-whatsapp/15 text-whatsapp border border-whatsapp/30 hover:bg-whatsapp hover:text-white text-xs font-bold transition"
              >
                <MessageCircle className="w-4 h-4 fill-current" /> WhatsApp
              </a>
              <a
                href="https://facebook.com/Ferreira-Imóveis-1409487702641931"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-xl bg-slate-800 flex items-center justify-center text-slate-300 hover:bg-brandRed-600 hover:text-white transition"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a
                href="https://instagram.com/imobiliariaferreiraimoveis"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-xl bg-slate-800 flex items-center justify-center text-slate-300 hover:bg-brandRed-600 hover:text-white transition"
              >
                <Instagram className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Mapa */}
      <div className="space-y-4">
        <h2 className="text-xl font-bold text-white">Como Chegar</h2>
        <GoogleMapEmbed height="400px" />
      </div>
    </div>
  );
}
