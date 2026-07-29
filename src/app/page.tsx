import React from 'react';
import Link from 'next/link';
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
} from 'lucide-react';

export const revalidate = 0; // Garantir dados atualizados em tempo real

export default async function HomePage() {
  // Buscar imóveis cadastrados no banco
  const featuredProperties = await db.property.findMany({
    where: { active: true, featured: true },
    include: { photos: true },
    orderBy: { createdAt: 'desc' },
    take: 6,
  });

  const recentProperties = await db.property.findMany({
    where: { active: true },
    include: { photos: true },
    orderBy: { createdAt: 'desc' },
    take: 6,
  });

  const totalPropertiesCount = await db.property.count({ where: { active: true } });

  const propertyTypes = [
    { name: 'Apartamento', type: 'APARTAMENTO', icon: Building2, desc: 'Práticos e seguros' },
    { name: 'Casa', type: 'CASA', icon: HomeIcon, desc: 'Conforto para a família' },
    { name: 'Sobrado', type: 'SOBRADO', icon: Building, desc: 'Espaço e modernidade' },
    { name: 'Comercial', type: 'COMERCIAL', icon: Store, desc: 'Salões e pontos estratégicos' },
    { name: 'Chácara', type: 'CHACARA', icon: Trees, desc: 'Lazer e natureza' },
    { name: 'Sítio', type: 'SITIO', icon: Mountain, desc: 'Áreas rurais e produtivas' },
    { name: 'Terreno', type: 'TERRENO', icon: Landmark, desc: 'Lotes para construir' },
  ];

  return (
    <div className="space-y-16 pb-16">
      {/* 1. Hero com busca interativa */}
      <HeroSearch />

      {/* 2. Contadores de Credibilidade */}
      <section className="max-w-7xl mx-auto px-4 -mt-10 relative z-20">
        <div className="bg-[#1E293B] border border-slate-800 rounded-2xl p-6 md:p-8 shadow-2xl grid grid-cols-2 md:grid-cols-4 gap-6 text-center divide-x-0 md:divide-x divide-slate-800">
          <div className="space-y-1">
            <div className="text-3xl sm:text-4xl font-black text-brandRed-500">+{totalPropertiesCount || 10}</div>
            <p className="text-xs text-slate-400 font-semibold uppercase tracking-wider">Imóveis Disponíveis</p>
          </div>
          <div className="space-y-1">
            <div className="text-3xl sm:text-4xl font-black text-brandRed-500">12+</div>
            <p className="text-xs text-slate-400 font-semibold uppercase tracking-wider">Bairros Atendidos</p>
          </div>
          <div className="space-y-1">
            <div className="text-3xl sm:text-4xl font-black text-brandRed-500">15+</div>
            <p className="text-xs text-slate-400 font-semibold uppercase tracking-wider">Anos de Experiência</p>
          </div>
          <div className="space-y-1">
            <div className="text-3xl sm:text-4xl font-black text-emerald-400 flex items-center justify-center gap-1">
              <ShieldCheck className="w-8 h-8" /> 100%
            </div>
            <p className="text-xs text-slate-400 font-semibold uppercase tracking-wider">Segurança Jurídica</p>
          </div>
        </div>
      </section>

      {/* 3. Buscar por Tipo de Imóvel */}
      <section className="max-w-7xl mx-auto px-4 space-y-6">
        <div className="text-center space-y-2">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Buscar por <span className="text-brandRed-500">Tipo de Imóvel</span>
          </h2>
          <p className="text-slate-400 text-xs sm:text-sm">
            Navegue pelas categorias e encontre a opção exata para seu perfil
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-7 gap-3 sm:gap-4">
          {propertyTypes.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.type}
                href={`/imoveis?type=${item.type}`}
                className="bg-[#1E293B] border border-slate-800/80 hover:border-brandRed-500/50 p-4 rounded-xl text-center space-y-2 group transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-brandRed-950/20"
              >
                <div className="w-10 h-10 mx-auto rounded-lg bg-slate-900 flex items-center justify-center text-slate-400 group-hover:bg-brandRed-600 group-hover:text-white transition-colors">
                  <Icon className="w-5 h-5" />
                </div>
                <h3 className="text-xs font-bold text-slate-200 group-hover:text-brandRed-400 transition-colors">
                  {item.name}
                </h3>
                <p className="text-[10px] text-slate-500 hidden sm:block">{item.desc}</p>
              </Link>
            );
          })}
        </div>
      </section>

      {/* 4. Encontre por Região (Cruzeiro x Ubatuba) */}
      <section className="max-w-7xl mx-auto px-4 space-y-6">
        <div className="bg-[#1E293B] border border-slate-800 rounded-3xl p-6 sm:p-10 space-y-8">
          <div className="flex flex-col md:flex-row justify-between md:items-end gap-4 border-b border-slate-800 pb-6">
            <div className="space-y-2">
              <span className="text-xs font-bold text-brandRed-400 uppercase tracking-widest">
                Localização Estratégica
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
                Encontre Imóveis por <span className="text-brandRed-500">Região</span>
              </h2>
            </div>
            <p className="text-slate-400 text-xs sm:text-sm max-w-md">
              Atuação forte no Vale do Paraíba em Cruzeiro-SP e assessoria completa para imóveis de praia e temporada no litoral de Ubatuba-SP.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Região Cruzeiro */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4 hover:border-brandRed-600/40 transition">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-brandRed-600/20 text-brandRed-400 flex items-center justify-center">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white">Cruzeiro - SP</h3>
                  <p className="text-xs text-slate-400">Residencial, Comercial e Rurais</p>
                </div>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed">
                Opções nos melhores bairros: Centro, Jardim América, Vila Nova, Washington Luiz, Itagaçaba e áreas rurais.
              </p>
              <div className="flex flex-wrap gap-2 pt-2">
                <Link
                  href="/imoveis?city=Cruzeiro&neighborhood=Centro"
                  className="px-3 py-1 bg-slate-800 hover:bg-brandRed-600 text-slate-300 hover:text-white text-xs font-medium rounded-lg transition"
                >
                  Centro
                </Link>
                <Link
                  href="/imoveis?city=Cruzeiro&neighborhood=Jardim+América"
                  className="px-3 py-1 bg-slate-800 hover:bg-brandRed-600 text-slate-300 hover:text-white text-xs font-medium rounded-lg transition"
                >
                  Jardim América
                </Link>
                <Link
                  href="/imoveis?city=Cruzeiro&neighborhood=Vila+Nova"
                  className="px-3 py-1 bg-slate-800 hover:bg-brandRed-600 text-slate-300 hover:text-white text-xs font-medium rounded-lg transition"
                >
                  Vila Nova
                </Link>
                <Link
                  href="/imoveis?city=Cruzeiro"
                  className="px-3 py-1 bg-brandRed-600/20 text-brandRed-400 hover:bg-brandRed-600 hover:text-white text-xs font-bold rounded-lg transition ml-auto flex items-center gap-1"
                >
                  Ver Todos <ArrowRight className="w-3 h-3" />
                </Link>
              </div>
            </div>

            {/* Região Ubatuba */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4 hover:border-emerald-500/40 transition">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
                  <Sun className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white">Ubatuba - SP (Litoral)</h3>
                  <p className="text-xs text-slate-400">Temporada e Venda na Praia</p>
                </div>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed">
                Casas e apartamentos pé na areia para férias ou investimento em rentabilidade nas praias mais valorizadas.
              </p>
              <div className="flex flex-wrap gap-2 pt-2">
                <Link
                  href="/imoveis?city=Ubatuba&neighborhood=Praia+Grande"
                  className="px-3 py-1 bg-slate-800 hover:bg-emerald-600 text-slate-300 hover:text-white text-xs font-medium rounded-lg transition"
                >
                  Praia Grande
                </Link>
                <Link
                  href="/imoveis?city=Ubatuba&neighborhood=Tenório"
                  className="px-3 py-1 bg-slate-800 hover:bg-emerald-600 text-slate-300 hover:text-white text-xs font-medium rounded-lg transition"
                >
                  Tenório
                </Link>
                <Link
                  href="/imoveis?city=Ubatuba&neighborhood=Itaguá"
                  className="px-3 py-1 bg-slate-800 hover:bg-emerald-600 text-slate-300 hover:text-white text-xs font-medium rounded-lg transition"
                >
                  Itaguá
                </Link>
                <Link
                  href="/imoveis?city=Ubatuba"
                  className="px-3 py-1 bg-emerald-500/20 text-emerald-400 hover:bg-emerald-600 hover:text-white text-xs font-bold rounded-lg transition ml-auto flex items-center gap-1"
                >
                  Ver Todos <ArrowRight className="w-3 h-3" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Imóveis em Destaque */}
      <section className="max-w-7xl mx-auto px-4 space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4">
          <div>
            <span className="text-xs font-bold text-brandRed-400 uppercase tracking-widest">Seleção Especial</span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
              Imóveis em <span className="text-brandRed-500">Destaque</span>
            </h2>
          </div>
          <Link
            href="/imoveis"
            className="text-xs font-bold text-slate-300 hover:text-brandRed-400 flex items-center gap-1 transition"
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

      {/* 6. Seção Novidades */}
      <section className="max-w-7xl mx-auto px-4 space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4">
          <div>
            <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Recém-adicionados</span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
              Últimas <span className="text-brandRed-500">Novidades</span>
            </h2>
          </div>
          <Link
            href="/imoveis"
            className="text-xs font-bold text-slate-300 hover:text-brandRed-400 flex items-center gap-1 transition"
          >
            Ver todos as novidades <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {recentProperties.map((prop) => (
            <PropertyCard key={prop.id} property={prop} />
          ))}
        </div>
      </section>

      {/* 7. Bloco Institutional "Sobre Nós" */}
      <section className="max-w-7xl mx-auto px-4">
        <div className="bg-[#1E293B] border border-slate-800 rounded-3xl p-6 sm:p-12 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-brandRed-600/20 text-brandRed-400 text-xs font-bold uppercase">
              <Award className="w-4 h-4" /> Tradição e Transparência
            </div>

            <h2 className="text-2xl sm:text-4xl font-extrabold text-white leading-tight">
              Segurança Jurídica e Atendimento Personalizado com a <span className="text-brandRed-500">Ferreira Imóveis</span>
            </h2>

            <p className="text-slate-300 text-sm leading-relaxed">
              A Ferreira Imóveis é conduzida pelos corretores <strong className="text-white">Afrânio Ramos Ferreira Filho</strong> (CRECI 130906-F) e <strong className="text-white">Maria Fernanda Ferreira</strong> (CRECI 198557-F). Nossa missão é prestar serviços imobiliários e consultoria de alta qualidade, sempre fundamentados na transparência e no respeito às famílias.
            </p>

            <p className="text-slate-300 text-sm leading-relaxed">
              Atuamos na locação e venda de imóveis residenciais e comerciais, consultoria completa e elaboração de laudos formais de avaliação. Todos os nossos contratos atendem rigorosamente à legislação vigente, garantindo total amparo legal a proprietários, compradores e inquilinos.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="flex items-start gap-3 bg-slate-900/80 p-4 rounded-xl border border-slate-800">
                <CheckCircle2 className="w-5 h-5 text-brandRed-500 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs font-bold text-white">Contratos Claros</h4>
                  <p className="text-[11px] text-slate-400">Proteção jurídica total em vendas e locações.</p>
                </div>
              </div>
              <div className="flex items-start gap-3 bg-slate-900/80 p-4 rounded-xl border border-slate-800">
                <CheckCircle2 className="w-5 h-5 text-brandRed-500 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs font-bold text-white">Laudos de Avaliação</h4>
                  <p className="text-[11px] text-slate-400">Avaliações precisas de valor de mercado.</p>
                </div>
              </div>
            </div>

            <div className="pt-2">
              <Link
                href="/sobre-nos"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-brandRed-600 hover:bg-brandRed-700 text-white font-bold text-xs transition shadow-lg shadow-brandRed-900/40"
              >
                Conheça Nossa História Completa <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          <div className="lg:col-span-5 bg-slate-900 border border-slate-800 p-6 sm:p-8 rounded-2xl space-y-6">
            <h3 className="text-lg font-bold text-white border-b border-slate-800 pb-3 flex items-center gap-2">
              <Users className="w-5 h-5 text-brandRed-500" /> Corretores Responsáveis
            </h3>

            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-[#1E293B] border border-slate-800 space-y-1">
                <h4 className="text-sm font-bold text-white">Afrânio Ramos Ferreira Filho</h4>
                <p className="text-xs text-brandRed-400 font-mono font-semibold">CRECI n° 130906-F</p>
                <p className="text-[11px] text-slate-400">Consultor Imobiliário & Perito Avaliador</p>
              </div>

              <div className="p-4 rounded-xl bg-[#1E293B] border border-slate-800 space-y-1">
                <h4 className="text-sm font-bold text-white">Maria Fernanda Ferreira</h4>
                <p className="text-xs text-brandRed-400 font-mono font-semibold">CRECI n° 198557-F</p>
                <p className="text-[11px] text-slate-400">Consultora Imobiliária & Gestão de Contratos</p>
              </div>
            </div>

            <div className="bg-brandRed-950/40 border border-brandRed-600/30 p-4 rounded-xl text-xs text-slate-300 space-y-2">
              <span className="font-bold text-brandRed-400">Atendimento presencial em Cruzeiro:</span>
              <p className="text-slate-400 text-[11px]">Rua Professor Virgílio Antunes, 57 - Centro, Cruzeiro - SP</p>
            </div>
          </div>
        </div>
      </section>

      {/* 8. Ações Rápidas */}
      <section className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-6">
        <Link
          href="/financiamento"
          className="bg-slate-900 border border-slate-800 hover:border-brandRed-500/50 p-6 rounded-2xl space-y-3 group transition"
        >
          <div className="w-10 h-10 rounded-xl bg-brandRed-600/20 text-brandRed-400 flex items-center justify-center group-hover:bg-brandRed-600 group-hover:text-white transition-colors">
            <Calculator className="w-5 h-5" />
          </div>
          <h3 className="text-base font-bold text-white group-hover:text-brandRed-400 transition-colors">
            Simular Financiamento
          </h3>
          <p className="text-xs text-slate-400">
            Descubra as taxas e simule as parcelas do seu imóvel através dos principais bancos.
          </p>
        </Link>

        <Link
          href="/anunciar"
          className="bg-slate-900 border border-slate-800 hover:border-brandRed-500/50 p-6 rounded-2xl space-y-3 group transition"
        >
          <div className="w-10 h-10 rounded-xl bg-brandRed-600/20 text-brandRed-400 flex items-center justify-center group-hover:bg-brandRed-600 group-hover:text-white transition-colors">
            <Megaphone className="w-5 h-5" />
          </div>
          <h3 className="text-base font-bold text-white group-hover:text-brandRed-400 transition-colors">
            Anuncie seu Imóvel
          </h3>
          <p className="text-xs text-slate-400">
            Cadastre seu imóvel para venda ou locação com avaliação profissional da nossa equipe.
          </p>
        </Link>

        <Link
          href="/imoveis"
          className="bg-slate-900 border border-slate-800 hover:border-brandRed-500/50 p-6 rounded-2xl space-y-3 group transition"
        >
          <div className="w-10 h-10 rounded-xl bg-brandRed-600/20 text-brandRed-400 flex items-center justify-center group-hover:bg-brandRed-600 group-hover:text-white transition-colors">
            <HomeIcon className="w-5 h-5" />
          </div>
          <h3 className="text-base font-bold text-white group-hover:text-brandRed-400 transition-colors">
            Pesquisa por Faixa de Valor
          </h3>
          <p className="text-xs text-slate-400">
            Filtre por valores de investimento que cabem exatamente no seu planejamento financeiro.
          </p>
        </Link>
      </section>

      {/* 9 e 10. Mapa e Formulário "Fale com o Corretor" */}
      <section className="max-w-7xl mx-auto px-4">
        <div className="bg-[#1E293B] border border-slate-800 rounded-3xl p-6 sm:p-10 grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-6 space-y-6">
            <div className="space-y-2">
              <span className="text-xs font-bold text-brandRed-400 uppercase tracking-widest">
                Localização do Escritório
              </span>
              <h2 className="text-2xl font-extrabold text-white">
                Venha Tomar um Café Conosco em <span className="text-brandRed-500">Cruzeiro</span>
              </h2>
              <p className="text-xs text-slate-400">
                Endereço: Rua Professor Virgílio Antunes, 57 - Centro - Cruzeiro - SP
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
