import React from 'react';
import Link from 'next/link';
import { db } from '@/lib/db';
import { getSession } from '@/lib/auth';
import { ArrowLeft, MessageSquare, Phone, Mail, Clock } from 'lucide-react';

export const revalidate = 0;

export default async function AdminLeadsPage() {
  const session = await getSession();

  const leads = await db.lead.findMany({
    include: { property: true },
    orderBy: { createdAt: 'desc' },
  });

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-6">
      <div>
        <Link
          href="/admin"
          className="inline-flex items-center gap-2 text-xs font-bold text-slate-400 hover:text-white transition bg-[#1E293B] px-3.5 py-2 rounded-xl border border-slate-800"
        >
          <ArrowLeft className="w-4 h-4" /> Voltar ao Painel
        </Link>
      </div>

      <div className="space-y-1">
        <div className="flex items-center gap-2 text-xs text-brandRed-400 font-bold uppercase tracking-wider">
          <MessageSquare className="w-4 h-4" /> Gestão de Leads
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-white">Mensagens Recebidas</h1>
        <p className="text-xs text-slate-400">Total de {leads.length} contato(s) registrado(s)</p>
      </div>

      <div className="space-y-4">
        {leads.length > 0 ? (
          leads.map((lead) => (
            <div key={lead.id} className="bg-[#1E293B] border border-slate-800 p-5 rounded-2xl space-y-3 shadow-lg">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
                <div className="flex items-center gap-3">
                  <span className="px-2.5 py-1 rounded-md bg-brandRed-600/20 text-brandRed-400 font-mono text-[10px] font-bold uppercase">
                    {lead.type}
                  </span>
                  <h3 className="text-sm font-bold text-white">{lead.name}</h3>
                </div>
                <div className="flex items-center gap-1.5 text-slate-500 text-xs">
                  <Clock className="w-3.5 h-3.5" />
                  {new Date(lead.createdAt).toLocaleString('pt-BR')}
                </div>
              </div>

              <div className="flex flex-wrap gap-4 text-xs">
                <a
                  href={`https://wa.me/55${lead.phone.replace(/\D/g, '')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 text-whatsapp font-bold bg-whatsapp/10 px-3 py-1 rounded-lg border border-whatsapp/20 hover:bg-whatsapp hover:text-white transition"
                >
                  <Phone className="w-3.5 h-3.5 fill-current" /> {lead.phone} (WhatsApp)
                </a>
                {lead.email && (
                  <span className="flex items-center gap-1.5 text-slate-300">
                    <Mail className="w-3.5 h-3.5 text-brandRed-500" /> {lead.email}
                  </span>
                )}
                {lead.property && (
                  <span className="text-xs font-semibold text-slate-300 bg-slate-900 px-2.5 py-1 rounded-lg">
                    Imóvel: #{lead.property.code} ({lead.property.title})
                  </span>
                )}
              </div>

              <div className="bg-slate-900 border border-slate-800/80 p-4 rounded-xl text-xs text-slate-300 whitespace-pre-line leading-relaxed">
                {lead.message}
              </div>
            </div>
          ))
        ) : (
          <div className="bg-[#1E293B] border border-slate-800 p-8 rounded-2xl text-center text-slate-500">
            Nenhuma mensagem recebida até o momento.
          </div>
        )}
      </div>
    </div>
  );
}
