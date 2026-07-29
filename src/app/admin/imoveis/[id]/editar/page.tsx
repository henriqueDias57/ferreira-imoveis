import React from 'react';
import PropertyForm from '@/components/PropertyForm';
import Link from 'next/link';
import { db } from '@/lib/db';
import { notFound } from 'next/navigation';
import { ArrowLeft, Edit3 } from 'lucide-react';

export const revalidate = 0;

interface EditPropertyPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function EditPropertyPage({ params }: EditPropertyPageProps) {
  const { id } = await params;

  const property = await db.property.findUnique({
    where: { id: Number(id) },
    include: { photos: { orderBy: { order: 'asc' } } },
  });

  if (!property) {
    notFound();
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 space-y-6">
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
          <Edit3 className="w-4 h-4" /> Edição de Imóvel
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-white">Editar Imóvel #{property.code}</h1>
      </div>

      <PropertyForm mode="edit" initialData={property} />
    </div>
  );
}
