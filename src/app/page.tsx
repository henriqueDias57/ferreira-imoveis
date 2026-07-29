import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import HeroSearch from '@/components/HeroSearch';
import PropertyCard from '@/components/PropertyCard';
import GoogleMapEmbed from '@/components/GoogleMapEmbed';
import HomeContactForm from '@/components/HomeContactForm';
import { db } from '@/lib/db';
import {
  Building2,
  Home as HomeIcon,
  Building,
  Store,
  Trees,
  Mountain,
  Landmark,
  ShieldCheck,
  Award,
  Users,
  MapPin,
  Calculator,
  Megaphone,
  CheckCircle2,
  ArrowRight,
  Sun,
  Sparkles,
  Map,
} from 'lucide-react';

export const revalidate = 0;

export default async function HomePage() {
  // Buscar métricas em tempo real no banco de dados
  const [
    featuredProperties,
    recentProperties,
    totalPropertiesCount,
    distinctNeighborhoods,
  ] = await Promise.all([
    db.property.findMany({
      where: { active: true, featured: true },
      include: { photos: true },
      orderBy: { createdAt: 'desc' },
      take: 6,
    }),
    db.property.findMany({
      where: { active: true },
      include: { photos: true },
      orderBy: { createdAt: 'desc' },
      take: 6,
    }),
    db.property.count({ where: { active: true } }),
    db.property.findMany({
      where: { active: true },
      select: { neighborhood: true },
      distinct: ['neighborhood'],
    }),
  ]);

  const totalNeighborhoodsCount = distinctNeighborhoods.length;

  const propertyTypes = [
    { name: 'Apartamento', type: 'APARTAMENTO', icon: Building2, desc: 'Práticos e seguros' },
    { name: 'Casa', type: 'CASA', icon: HomeIcon, desc: 'Conforto para a família' },
    { name: 'Sobrado', type: 'SOBRADO', icon: Building, desc: 'Espaço e modernidade' },
    { name: 'Comercial', type: 'COMERCIAL', icon: Store, desc: 'Pontos estratégicos' },
    { name: 'Chácara', type: 'CHACARA', icon: Trees, desc: 'Lazer e natureza' },
    { name: 'Sítio', type: 'SITIO', icon: Mountain, desc: 'Áreas produtivas' },
    { name: 'Terreno', type: 'TERRENO', icon: Landmark, desc: 'Lotes para construir' },
  ];

  return (
    <div className="space-y-20 pb-20">
      {/* 1. Hero imersivo com imagem principal e busca */}
      <HeroSearch />



      {/* 3. Categorias de Imóveis */}
      <section className="max-w-7xl mx-auto px-4 space-y-8">
        <div className="text-center space-y-3">
          <span className="text-xs font-extrabold text-brandRed-400 uppercase tracking-widest">Variedade de Opções</span>
          <h2 className="text-3xl sm:text-4xl font-black text-white font-heading">
            Buscar por <span className="text-gradient-red">Tipo de Imóvel</span>
          </h2>
          <p className="text-slate-400 text-xs sm:text-sm max-w-xl mx-auto">
            Navegue por categorias exclusivas e encontre a propriedade ideal para comprar, alugar ou passar temporada.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-7 gap-3 sm:gap-4">
          {propertyTypes.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.type}
                href={`/imoveis?type=${item.type}`}
                className="luxury-card p-5 rounded-2xl text-center space-y-3 group"
              >
                <div className="w-12 h-12 mx-auto rounded-2xl bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-400 group-hover:bg-brandRed-600 group-hover:text-white group-hover:scale-110 transition-all duration-300 shadow-md">
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="text-xs font-bold text-slate-200 group-hover:text-brandRed-400 transition-colors">
                  {item.name}
                </h3>
                <p className="text-[10px] text-slate-500 hidden sm:block font-medium">{item.desc}</p>
              </Link>
            );
          })}
        </div>
      </section>

      {/* 4. Destaques por Região (Cruzeiro x Ubatuba) */}
      <section className="max-w-7xl mx-auto px-4">
        <div className="glass-panel border border-slate-700/80 rounded-3xl p-6 sm:p-10 space-y-8">
          <div className="flex flex-col md:flex-row justify-between md:items-end gap-4 border-b border-slate-800 pb-6">
            <div className="space-y-2">
              <span className="text-xs font-extrabold text-brandRed-400 uppercase tracking-widest">
                Presença Regional
              </span>
              <h2 className="text-3xl sm:text-4xl font-black text-white font-heading">
                Encontre Imóveis por <span className="text-gradient-red">Região</span>
              </h2>
            </div>
            <p className="text-slate-300 text-xs sm:text-sm max-w-md">
              Atuação consolidada no Vale do Paraíba em Cruzeiro-SP e atendimento para imóveis de praia em Ubatuba-SP.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Região Cruzeiro */}
            <div className="bg-[#111827] border border-slate-800 rounded-2xl p-6 space-y-4 hover:border-brandRed-600/50 transition duration-300">
              <div className="flex items-center gap-3.5">
                <div className="w-11 h-11 rounded-2xl bg-brandRed-600/20 text-brandRed-400 flex items-center justify-center border border-brandRed-600/30">
                  <MapPin className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white">Cruzeiro - SP</h3>
                  <p className="text-xs text-slate-400">Residencial, Comercial e Áreas Rurais</p>
                </div>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Casas, apartamentos e pontos comerciais no Centro, Jardim América, Vila Nova, Washington Luiz e Itagaçaba.
              </p>
              <div className="flex flex-wrap gap-2 pt-2">
                <Link
                  href="/imoveis?city=Cruzeiro&neighborhood=Centro"
                  className="px-3.5 py-1.5 bg-slate-900 hover:bg-brandRed-600 text-slate-300 hover:text-white text-xs font-bold rounded-xl transition border border-slate-800"
                >
                  Centro
                </Link>
                <Link
                  href="/imoveis?city=Cruzeiro&neighborhood=Jardim+América"
                  className="px-3.5 py-1.5 bg-slate-900 hover:bg-brandRed-600 text-slate-300 hover:text-white text-xs font-bold rounded-xl transition border border-slate-800"
                >
                  Jardim América
                </Link>
                <Link
                  href="/imoveis?city=Cruzeiro&neighborhood=Vila+Nova"
                  className="px-3.5 py-1.5 bg-slate-900 hover:bg-brandRed-600 text-slate-300 hover:text-white text-xs font-bold rounded-xl transition border border-slate-800"
                >
                  Vila Nova
                </Link>
                <Link
                  href="/imoveis?city=Cruzeiro"
                  className="px-3.5 py-1.5 bg-brandRed-600/20 text-brandRed-400 hover:bg-brandRed-600 hover:text-white text-xs font-bold rounded-xl transition ml-auto flex items-center gap-1 border border-brandRed-600/40"
                >
                  Ver Todos <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>

            {/* Região Ubatuba */}
            <div className="bg-[#111827] border border-slate-800 rounded-2xl p-6 space-y-4 hover:border-emerald-500/50 transition duration-300">
              <div className="flex items-center gap-3.5">
                <div className="w-11 h-11 rounded-2xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center border border-emerald-500/30">
                  <Sun className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white">Ubatuba - SP (Litoral)</h3>
                  <p className="text-xs text-slate-400">Imóveis de Temporada e Venda na Praia</p>
                </div>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Opções pé na areia para férias em família ou investimento imobiliário nas praias mais procuradas.
              </p>
              <div className="flex flex-wrap gap-2 pt-2">
                <Link
                  href="/imoveis?city=Ubatuba&neighborhood=Praia+Grande"
                  className="px-3.5 py-1.5 bg-slate-900 hover:bg-emerald-600 text-slate-300 hover:text-white text-xs font-bold rounded-xl transition border border-slate-800"
                >
                  Praia Grande
                </Link>
                <Link
                  href="/imoveis?city=Ubatuba&neighborhood=Tenório"
                  className="px-3.5 py-1.5 bg-slate-900 hover:bg-emerald-600 text-slate-300 hover:text-white text-xs font-bold rounded-xl transition border border-slate-800"
                >
                  Tenório
                </Link>
                <Link
                  href="/imoveis?city=Ubatuba&neighborhood=Itaguá"
                  className="px-3.5 py-1.5 bg-slate-900 hover:bg-emerald-600 text-slate-300 hover:text-white text-xs font-bold rounded-xl transition border border-slate-800"
                >
                  Itaguá
                </Link>
                <Link
                  href="/imoveis?city=Ubatuba"
                  className="px-3.5 py-1.5 bg-emerald-500/20 text-emerald-400 hover:bg-emerald-600 hover:text-white text-xs font-bold rounded-xl transition ml-auto flex items-center gap-1 border border-emerald-500/40"
                >
                  Ver Todos <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Imóveis em Destaque */}
      <section className="max-w-7xl mx-auto px-4 space-y-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4">
          <div className="space-y-1">
            <span className="text-xs font-extrabold text-brandRed-400 uppercase tracking-widest">Oportunidades</span>
            <h2 className="text-3xl sm:text-4xl font-black text-white font-heading">
              Imóveis em <span className="text-gradient-red">Destaque</span>
            </h2>
          </div>
          <Link
            href="/imoveis"
            className="text-xs font-bold text-slate-300 hover:text-brandRed-400 flex items-center gap-1.5 transition bg-slate-900 border border-slate-800 px-4 py-2 rounded-xl"
          >
            Ver catálogo completo <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {featuredProperties.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredProperties.map((prop) => (
              <PropertyCard key={prop.id} property={prop} />
            ))}
          </div>
        ) : (
          <p className="text-slate-500 text-sm py-8 text-center">Nenhum imóvel em destaque no momento.</p>
        )}
      </section>

      {/* 6. Novidades */}
      <section className="max-w-7xl mx-auto px-4 space-y-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4">
          <div className="space-y-1">
            <span className="text-xs font-extrabold text-slate-400 uppercase tracking-widest">Recém-Cadastrados</span>
            <h2 className="text-3xl sm:text-4xl font-black text-white font-heading">
              Últimas <span className="text-gradient-red">Novidades</span>
            </h2>
          </div>
          <Link
            href="/imoveis"
            className="text-xs font-bold text-slate-300 hover:text-brandRed-400 flex items-center gap-1.5 transition bg-slate-900 border border-slate-800 px-4 py-2 rounded-xl"
          >
            Ver todas as novidades <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {recentProperties.map((prop) => (
            <PropertyCard key={prop.id} property={prop} />
          ))}
        </div>
      </section>

      {/* 7. Bloco Institucional com FOTO OFICIAL */}
      <section className="max-w-7xl mx-auto px-4">
        <div className="bg-[#111827] border border-slate-800 rounded-3xl p-6 sm:p-12 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center shadow-2xl">
          {/* Lado Esquerdo: Foto Oficial da Ferreira Imóveis em Destaque */}
          <div className="lg:col-span-5">
            <div className="relative w-full aspect-[4/3] rounded-3xl overflow-hidden border-2 border-brandRed-600/40 shadow-2xl shadow-brandRed-950/50 group">
              <Image
                src="/ferreira-foto.jpg"
                alt="Equipe Ferreira Imóveis"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
              
              <div className="absolute bottom-4 left-4 right-4 p-4 rounded-2xl bg-[#070A12]/90 backdrop-blur-md border border-slate-700/80 space-y-1">
                <p className="text-white text-xs font-bold">Ferreira Imóveis — Tradição e Transparência</p>
                <p className="text-[11px] text-brandRed-400 font-mono">CRECI 130906-F / 198557-F</p>
              </div>
            </div>
          </div>

          {/* Lado Direito: Texto Institucional */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brandRed-600/20 text-brandRed-400 text-xs font-extrabold uppercase border border-brandRed-600/30">
              <Award className="w-4 h-4 text-brandRed-500" /> Tradição & Segurança Jurídica
            </div>

            <h2 className="text-3xl sm:text-4xl font-extrabold text-white leading-tight font-heading">
              Consultoria Imobiliária Completa com a <span className="text-gradient-red">Ferreira Imóveis</span>
            </h2>

            <p className="text-slate-300 text-sm leading-relaxed">
              A Ferreira Imóveis é conduzida pelos corretores <strong className="text-white font-semibold">Afrânio Ramos Ferreira Filho</strong> (CRECI 130906-F) e <strong className="text-white font-semibold">Maria Fernanda Ferreira</strong> (CRECI 198557-F). Nossa missão é prestar consultoria imobiliária de excelência, pautada pela transparência e credibilidade.
            </p>

            <p className="text-slate-300 text-sm leading-relaxed">
              Atuamos na locação e venda de imóveis comerciais e residenciais, consultoria especializada e elaboração de laudos de avaliação com rigor técnico. Todos os nossos contratos cumprem integralmente a legislação vigente, proporcionando total amparo jurídico a proprietários, compradores e inquilinos.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="flex items-start gap-3 bg-slate-900 p-4 rounded-2xl border border-slate-800">
                <CheckCircle2 className="w-5 h-5 text-brandRed-500 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs font-bold text-white">Contratos Seguros</h4>
                  <p className="text-[11px] text-slate-400">Proteção jurídica sob a legislação em vigor.</p>
                </div>
              </div>
              <div className="flex items-start gap-3 bg-slate-900 p-4 rounded-2xl border border-slate-800">
                <CheckCircle2 className="w-5 h-5 text-brandRed-500 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs font-bold text-white">Laudos de Avaliação</h4>
                  <p className="text-[11px] text-slate-400">Laudos formais com precisão de mercado.</p>
                </div>
              </div>
            </div>

            <div className="pt-2">
              <Link
                href="/sobre-nos"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-2xl bg-brandRed-600 hover:bg-brandRed-700 text-white font-bold text-xs transition shadow-xl shadow-brandRed-900/40 hover:scale-105"
              >
                Conheça Nossa História Completa <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 8. Ações Rápidas */}
      <section className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-6">
        <Link
          href="/financiamento"
          className="luxury-card p-7 rounded-3xl space-y-4 group"
        >
          <div className="w-12 h-12 rounded-2xl bg-brandRed-600/20 border border-brandRed-600/40 text-brandRed-400 flex items-center justify-center group-hover:bg-brandRed-600 group-hover:text-white transition-all duration-300">
            <Calculator className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-bold text-white group-hover:text-brandRed-400 transition-colors">
            Simular Financiamento
          </h3>
          <p className="text-xs text-slate-400 leading-relaxed">
            Consulte as taxas atuais e simule as parcelas do seu imóvel através dos principais bancos.
          </p>
        </Link>

        <Link
          href="/anunciar"
          className="luxury-card p-7 rounded-3xl space-y-4 group"
        >
          <div className="w-12 h-12 rounded-2xl bg-brandRed-600/20 border border-brandRed-600/40 text-brandRed-400 flex items-center justify-center group-hover:bg-brandRed-600 group-hover:text-white transition-all duration-300">
            <Megaphone className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-bold text-white group-hover:text-brandRed-400 transition-colors">
            Anuncie seu Imóvel
          </h3>
          <p className="text-xs text-slate-400 leading-relaxed">
            Cadastre seu imóvel para venda ou locação com avaliação profissional da nossa equipe.
          </p>
        </Link>

        <Link
          href="/imoveis"
          className="luxury-card p-7 rounded-3xl space-y-4 group"
        >
          <div className="w-12 h-12 rounded-2xl bg-brandRed-600/20 border border-brandRed-600/40 text-brandRed-400 flex items-center justify-center group-hover:bg-brandRed-600 group-hover:text-white transition-all duration-300">
            <HomeIcon className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-bold text-white group-hover:text-brandRed-400 transition-colors">
            Pesquisa por Faixa de Valor
          </h3>
          <p className="text-xs text-slate-400 leading-relaxed">
            Encontre opções de investimento que se ajustam perfeitamente ao seu orçamento.
          </p>
        </Link>
      </section>

      {/* 9. Mapa e Formulário Fale com o Corretor */}
      <section className="max-w-7xl mx-auto px-4">
        <div className="glass-panel border border-slate-700/80 rounded-3xl p-6 sm:p-10 grid grid-cols-1 lg:grid-cols-12 gap-8 shadow-2xl">
          <div className="lg:col-span-6 space-y-6">
            <div className="space-y-2">
              <span className="text-xs font-extrabold text-brandRed-400 uppercase tracking-widest">
                Localização do Escritório
              </span>
              <h2 className="text-3xl font-black text-white font-heading">
                Visite Nossa Sede em <span className="text-gradient-red">Cruzeiro - SP</span>
              </h2>
              <p className="text-xs text-slate-400">
                Rua Professor Virgílio Antunes, 57 - Centro - Cruzeiro - SP
              </p>
            </div>

            <GoogleMapEmbed height="340px" />
          </div>

          <div className="lg:col-span-6">
            <HomeContactForm />
          </div>
        </div>
      </section>
    </div>
  );
}
