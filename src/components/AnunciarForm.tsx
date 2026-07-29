'use client';

import React, { useState } from 'react';
import { Send, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';

export default function AnunciarForm() {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [propertyType, setPropertyType] = useState('');
  const [purpose, setPurpose] = useState('');
  const [city, setCity] = useState('');
  const [neighborhood, setNeighborhood] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg('');

    try {
      const fullMessage = `[ANÚNCIO DE IMÓVEL]\nTipo: ${propertyType}\nFinalidade: ${purpose}\nCidade: ${city}\nBairro: ${neighborhood}\n\nMensagem do proprietário: ${message}`;

      const res = await fetch('/api/lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          phone,
          email,
          message: fullMessage,
          type: 'ANUNCIO_PROPRIETARIO',
        }),
      });

      if (!res.ok) throw new Error('Erro ao enviar.');
      setSuccess(true);
      setName(''); setPhone(''); setEmail(''); setMessage('');
      setPropertyType(''); setPurpose(''); setCity(''); setNeighborhood('');
    } catch (err: any) {
      setErrorMsg(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-[#1E293B] border border-slate-800 p-6 sm:p-8 rounded-2xl space-y-6">
      <h3 className="text-xl font-extrabold text-white">Cadastre seu Imóvel para Avaliação</h3>

      {success && (
        <div className="bg-emerald-500/10 border border-emerald-500/30 p-4 rounded-xl text-emerald-400 text-xs flex items-start gap-2">
          <CheckCircle2 className="w-5 h-5 shrink-0" />
          <span>Dados recebidos! Nossa equipe entrará em contato para agendar a avaliação.</span>
        </div>
      )}

      {errorMsg && (
        <div className="bg-brandRed-900/20 border border-brandRed-600/30 p-4 rounded-xl text-brandRed-400 text-xs flex items-start gap-2">
          <AlertCircle className="w-5 h-5 shrink-0" />
          <span>{errorMsg}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">Seu Nome *</label>
            <input type="text" required value={name} onChange={(e) => setName(e.target.value)}
              className="w-full px-3 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs focus:outline-none focus:border-brandRed-500" />
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">Telefone / WhatsApp *</label>
            <input type="text" required value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="(12) 99999-9999"
              className="w-full px-3 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs focus:outline-none focus:border-brandRed-500" />
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-300 mb-1">E-mail</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)}
            className="w-full px-3 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs focus:outline-none focus:border-brandRed-500" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">Tipo do Imóvel *</label>
            <select required value={propertyType} onChange={(e) => setPropertyType(e.target.value)}
              className="w-full px-3 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs focus:outline-none focus:border-brandRed-500">
              <option value="">Selecione</option>
              <option value="Apartamento">Apartamento</option>
              <option value="Casa">Casa</option>
              <option value="Sobrado">Sobrado</option>
              <option value="Comercial">Comercial / Ponto</option>
              <option value="Chácara">Chácara</option>
              <option value="Sítio">Sítio</option>
              <option value="Terreno">Terreno / Lote</option>
            </select>
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">Finalidade *</label>
            <select required value={purpose} onChange={(e) => setPurpose(e.target.value)}
              className="w-full px-3 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs focus:outline-none focus:border-brandRed-500">
              <option value="">Selecione</option>
              <option value="Venda">Quero Vender</option>
              <option value="Locação">Quero Alugar</option>
              <option value="Temporada">Temporada (Litoral)</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">Cidade *</label>
            <select required value={city} onChange={(e) => setCity(e.target.value)}
              className="w-full px-3 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs focus:outline-none focus:border-brandRed-500">
              <option value="">Selecione</option>
              <option value="Cruzeiro">Cruzeiro - SP</option>
              <option value="Ubatuba">Ubatuba - SP</option>
              <option value="Outra">Outra</option>
            </select>
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">Bairro</label>
            <input type="text" value={neighborhood} onChange={(e) => setNeighborhood(e.target.value)} placeholder="Ex: Centro, Jardim América..."
              className="w-full px-3 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs focus:outline-none focus:border-brandRed-500" />
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-300 mb-1">Detalhes do Imóvel</label>
          <textarea rows={4} value={message} onChange={(e) => setMessage(e.target.value)}
            placeholder="Descreva brevemente o imóvel: número de quartos, área, estado de conservação, valor pretendido..."
            className="w-full px-3 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs focus:outline-none focus:border-brandRed-500" />
        </div>

        <button type="submit" disabled={loading}
          className="w-full py-3.5 rounded-xl bg-brandRed-600 hover:bg-brandRed-700 text-white font-bold text-xs flex items-center justify-center gap-2 transition shadow-lg shadow-brandRed-900/40 disabled:opacity-50">
          {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
          Solicitar Avaliação Gratuita
        </button>
      </form>
    </div>
  );
}
