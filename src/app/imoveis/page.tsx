import React from 'react';
import PropertyCard from '@/components/PropertyCard';
import PropertyFilterBar from '@/components/PropertyFilterBar';
import { db } from '@/lib/db';
import { Building2 } from 'lucide-react';

export const revalidate = 0;

interface PropertiesPageProps {
  searchParams: Promise<{
    purpose?: string;
    type?: string;
    city?: string;
    neighborhood?: string;
    bedrooms?: string;
    maxPrice?: string;
    minPrice?: string;
    code?: string;
    page?: string;
  }>;
}

export default async function PropertiesPage({ searchParams }: PropertiesPageProps) {
  const params = await searchParams;

  const whereClause: any = {
    active: true,
  };

  if (params.code) {
    whereClause.code = { contains: params.code.toUpperCase() };
  } else {
    if (params.purpose) whereClause.purpose = params.purpose;
    if (params.type) whereClause.type = params.type;
    if (params.city) whereClause.city = { contains: params.city };
    if (params.neighborhood) whereClause.neighborhood = { contains: params.neighborhood };
    if (params.bedrooms) whereClause.bedrooms = { gte: Number(params.bedrooms) };

    if (params.minPrice || params.maxPrice) {
      whereClause.price = {};
      if (params.minPrice) whereClause.price.gte = Number(params.minPrice);
      if (params.maxPrice) whereClause.price.lte = Number(params.maxPrice);
    }
  }

  const page = Number(params.page || 1);
  const pageSize = 9;

  const [properties, totalCount] = await Promise.all([
    db.property.findMany({
      where: whereClause,
      include: { photos: true },
      orderBy: { createdAt: 'desc' },
      skip: (page - 1) * pageSize,
      take: pageSize,
    }),
    db.property.count({ where: whereClause }),
  ]);

  const totalPages = Math.ceil(totalCount / pageSize);

  return (
    <div className="max-w-7xl mx-auto px-4 py-10 space-y-8">
      {/* Cabeçalho da página */}
      <div className="space-y-2">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-brandRed-600/20 text-brandRed-400 text-xs font-bold uppercase">
          <Building2 className="w-4 h-4" /> Catálogo Completo
        </div>
        <h1 className="text-3xl font-extrabold text-white">
          Catálogo de <span className="text-brandRed-500">Imóveis</span>
        </h1>
        <p className="text-slate-400 text-xs sm:text-sm">
          Exibindo {totalCount} imóvel(is) encontrado(s) em Cruzeiro, Ubatuba e região.
        </p>
      </div>

      {/* Barra de Filtros Persistentes */}
      <PropertyFilterBar currentParams={params} />

      {/* Grid de Imóveis */}
      {properties.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {properties.map((prop) => (
            <PropertyCard key={prop.id} property={prop} />
          ))}
        </div>
      ) : (
        <div className="bg-[#1E293B] border border-slate-800 p-12 rounded-2xl text-center space-y-4">
          <p className="text-slate-300 text-base font-semibold">Nenhum imóvel encontrado com os filtros selecionados.</p>
          <p className="text-slate-500 text-xs">
            Tente remover alguns filtros de busca ou pesquise por outra cidade/tipo de imóvel.
          </p>
        </div>
      )}

      {/* Paginação */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-2 pt-6">
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => {
            const isCurrent = p === page;
            const newParams = new URLSearchParams(params as any);
            newParams.set('page', p.toString());

            return (
              <a
                key={p}
                href={`/imoveis?${newParams.toString()}`}
                className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold text-xs transition ${
                  isCurrent
                    ? 'bg-brandRed-600 text-white shadow-lg shadow-brandRed-900/40'
                    : 'bg-[#1E293B] text-slate-400 border border-slate-800 hover:text-white hover:border-slate-700'
                }`}
              >
                {p}
              </a>
            );
          })}
        </div>
      )}
    </div>
  );
}
