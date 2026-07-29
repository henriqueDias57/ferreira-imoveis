'use client';

import React, { useState } from 'react';
import { Send, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';

export default function HomeContactForm() {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
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
          type: 'CONTATO',
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Erro ao enviar formulário.');
      }

      setSuccess(true);
      setName('');
      setPhone('');
      setEmail('');
      setMessage('');
    } catch (err: any) {
      setErrorMsg(err.message || 'Ocorreu um erro ao enviar sua mensagem.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-slate-900 border border-slate-800 p-6 sm:p-8 rounded-2xl space-y-6">
      <div className="space-y-1">
        <h3 className="text-xl font-extrabold text-white">Fale com o Corretor</h3>
        <p className="text-xs text-slate-400">
          Preencha os campos abaixo e entraremos em contato o mais rápido possível.
        </p>
      </div>

      {success && (
        <div className="bg-emerald-500/10 border border-emerald-500/30 p-4 rounded-xl flex items-start gap-3 text-emerald-400 text-xs">
          <CheckCircle2 className="w-5 h-5 shrink-0 mt-0.5" />
          <div>
            <strong className="block text-sm font-bold">Mensagem enviada com sucesso!</strong>
            Nossa equipe entrará em contato em breve. Se preferir atendimento imediato, nos chame no WhatsApp.
          </div>
        </div>
      )}

      {errorMsg && (
        <div className="bg-brandRed-900/20 border border-brandRed-600/40 p-4 rounded-xl flex items-start gap-3 text-brandRed-400 text-xs">
          <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
          <div>{errorMsg}</div>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-xs font-semibold text-slate-300 mb-1">Seu Nome Completo *</label>
          <input
            type="text"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Ex: João da Silva"
            className="w-full px-4 py-2.5 rounded-xl bg-[#1E293B] border border-slate-700 text-white placeholder-slate-500 text-xs focus:outline-none focus:border-brandRed-500"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">Telefone / WhatsApp *</label>
            <input
              type="text"
              required
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="(12) 99999-9999"
              className="w-full px-4 py-2.5 rounded-xl bg-[#1E293B] border border-slate-700 text-white placeholder-slate-500 text-xs focus:outline-none focus:border-brandRed-500"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">E-mail (opcional)</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="seuemail@exemplo.com"
              className="w-full px-4 py-2.5 rounded-xl bg-[#1E293B] border border-slate-700 text-white placeholder-slate-500 text-xs focus:outline-none focus:border-brandRed-500"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-300 mb-1">Mensagem *</label>
          <textarea
            required
            rows={4}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Conte-nos o que você procura (comprar, alugar, informações sobre algum imóvel)..."
            className="w-full px-4 py-2.5 rounded-xl bg-[#1E293B] border border-slate-700 text-white placeholder-slate-500 text-xs focus:outline-none focus:border-brandRed-500"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full py-3.5 rounded-xl bg-brandRed-600 hover:bg-brandRed-700 text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition shadow-lg shadow-brandRed-900/40 disabled:opacity-50"
        >
          {loading ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" /> Enviando...
            </>
          ) : (
            <>
              <Send className="w-4 h-4" /> Enviar Mensagem para o Corretor
            </>
          )}
        </button>
      </form>
    </div>
  );
}
