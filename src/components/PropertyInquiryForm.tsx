'use client';

import React, { useState } from 'react';
import { Send, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';

interface PropertyInquiryFormProps {
  propertyId: number;
  propertyCode: string;
}

export default function PropertyInquiryForm({ propertyId, propertyCode }: PropertyInquiryFormProps) {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState(`Olá! Tenho interesse no imóvel código ${propertyCode}. Gostaria de agendar uma visita e receber mais detalhes.`);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg('');
    setSuccess(false);

    try {
      const res = await fetch('/api/lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          phone,
          email,
          message,
          type: 'INTERESSE_IMOVEL',
          propertyId,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Erro ao enviar mensagem.');
      }

      setSuccess(true);
      setName('');
      setPhone('');
      setEmail('');
    } catch (err: any) {
      setErrorMsg(err.message || 'Erro ao enviar formulário.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-[#1E293B] border border-slate-800 p-6 rounded-2xl space-y-4 shadow-xl">
      <h3 className="text-base font-bold text-white border-b border-slate-800 pb-3">
        Tenho Interesse Neste Imóvel
      </h3>

      {success && (
        <div className="bg-emerald-500/10 border border-emerald-500/30 p-4 rounded-xl text-emerald-400 text-xs flex items-start gap-2">
          <CheckCircle2 className="w-5 h-5 shrink-0 mt-0.5" />
          <span>Sua proposta/solicitação foi enviada! O corretor entrará em contato em breve.</span>
        </div>
      )}

      {errorMsg && (
        <div className="bg-brandRed-900/20 border border-brandRed-600/30 p-4 rounded-xl text-brandRed-400 text-xs flex items-start gap-2">
          <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
          <span>{errorMsg}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-3">
        <div>
          <label className="block text-[11px] font-semibold text-slate-300 mb-1">Seu Nome Completo *</label>
          <input
            type="text"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Seu nome"
            className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs focus:outline-none focus:border-brandRed-500"
          />
        </div>

        <div>
          <label className="block text-[11px] font-semibold text-slate-300 mb-1">Telefone / WhatsApp *</label>
          <input
            type="text"
            required
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="(12) 99999-9999"
            className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs focus:outline-none focus:border-brandRed-500"
          />
        </div>

        <div>
          <label className="block text-[11px] font-semibold text-slate-300 mb-1">E-mail (opcional)</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="seuemail@exemplo.com"
            className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs focus:outline-none focus:border-brandRed-500"
          />
        </div>

        <div>
          <label className="block text-[11px] font-semibold text-slate-300 mb-1">Mensagem *</label>
          <textarea
            required
            rows={3}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs focus:outline-none focus:border-brandRed-500"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full py-3 rounded-xl bg-brandRed-600 hover:bg-brandRed-700 text-white font-bold text-xs flex items-center justify-center gap-2 transition shadow-lg shadow-brandRed-900/30 disabled:opacity-50"
        >
          {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />} Enviar Solicitação
        </button>
      </form>
    </div>
  );
}
