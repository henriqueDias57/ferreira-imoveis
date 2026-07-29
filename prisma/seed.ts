import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Iniciando seed do banco de dados da Ferreira Imóveis...');

  // Limpar registros existentes
  await prisma.lead.deleteMany();
  await prisma.photo.deleteMany();
  await prisma.property.deleteMany();
  await prisma.user.deleteMany();

  // Hash da senha inicial para admins (lida de variável de ambiente ou fallback dev)
  const initialPassword = process.env.ADMIN_INITIAL_PASSWORD || 'Ferreira2026@Admin';
  const defaultPasswordHash = await bcrypt.hash(initialPassword, 10);

  // 1. Criar as 2 contas administrativas oficiais
  const userHenrique = await prisma.user.create({
    data: {
      name: 'Henrique Dias Ferreira',
      email: 'henrique.dias.ferreira321@gmail.com',
      password: defaultPasswordHash,
      role: 'ADMIN',
    },
  });

  const userMariaFernanda = await prisma.user.create({
    data: {
      name: 'Maria Fernanda Ferreira (CRECI 198557-F)',
      email: 'mferreiraimoveis@creci.org.br',
      password: defaultPasswordHash,
      role: 'ADMIN',
    },
  });

  console.log('✅ Contas administrativas criadas com sucesso:');
  console.log(` - ${userHenrique.email}`);
  console.log(` - ${userMariaFernanda.email}`);

  // 2. Criar Imóveis em Cruzeiro - SP e Ubatuba - SP
  const sampleProperties = [
    {
      code: 'AP0101',
      title: 'Apartamento de Alto Padrão no Centro de Cruzeiro',
      slug: 'apartamento-alto-padrao-centro-cruzeiro-ap0101',
      description: 'Lindo apartamento totalmente reformado, localizado no coração de Cruzeiro-SP. Possui ampla sala em dois ambientes com sacada com vista panorâmica da serra, cozinha planejada, suíte máster com armários embutidos e vaga coberta de garagem. Próximo a bancos, comércio e farmácias.',
      type: 'APARTAMENTO',
      purpose: 'VENDA',
      price: 480000,
      condoFee: 450,
      iptu: 120,
      city: 'Cruzeiro',
      state: 'SP',
      neighborhood: 'Centro',
      address: 'Rua Major Novaes, Centro, Cruzeiro - SP',
      bedrooms: 3,
      suites: 1,
      bathrooms: 2,
      parking: 2,
      area: 110,
      featured: true,
      active: true,
      photos: [
        'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1200&q=80',
        'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=1200&q=80',
        'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=1200&q=80',
      ],
    },
    {
      code: 'CA0052',
      title: 'Casa Residencial Aconchegante no Jardim América',
      slug: 'casa-residencial-jardim-america-cruzeiro-ca0052',
      description: 'Excelente casa térrea situada em bairro residencial tranquilo em Cruzeiro. Conta com quintal espaçoso, área gourmet equipada com churrasqueira, varanda, garagem para 2 carros e acabamento impecável em porcelanato.',
      type: 'CASA',
      purpose: 'VENDA',
      price: 590000,
      condoFee: 0,
      iptu: 180,
      city: 'Cruzeiro',
      state: 'SP',
      neighborhood: 'Jardim América',
      address: 'Alameda das Rosas, Jardim América, Cruzeiro - SP',
      bedrooms: 3,
      suites: 1,
      bathrooms: 2,
      parking: 2,
      area: 180,
      featured: true,
      active: true,
      photos: [
        'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=1200&q=80',
        'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80',
        'https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&w=1200&q=80',
      ],
    },
    {
      code: 'AP0203',
      title: 'Apartamento Pé na Areia na Praia Grande em Ubatuba',
      slug: 'apartamento-pe-na-areia-praia-grande-ubatuba-ap0203',
      description: 'Maravilhoso apartamento de temporada a apenas 50 metros da Praia Grande em Ubatuba-SP. Varanda gourmet com vista para o mar, condomínio completo com piscina aquecida, sauna, academia e portaria 24 horas. Ótimo investimento para rentabilidade em locação de temporada.',
      type: 'APARTAMENTO',
      purpose: 'TEMPORADA',
      price: 850, // Preço diária temporada
      condoFee: 680,
      iptu: 210,
      city: 'Ubatuba',
      state: 'SP',
      neighborhood: 'Praia Grande',
      address: 'Avenida Beira Mar, Praia Grande, Ubatuba - SP',
      bedrooms: 2,
      suites: 1,
      bathrooms: 2,
      parking: 1,
      area: 85,
      featured: true,
      active: true,
      photos: [
        'https://images.unsplash.com/photo-1512915922686-57c11dde9b6b?auto=format&fit=crop&w=1200&q=80',
        'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80',
        'https://images.unsplash.com/photo-1574362848149-11496d93a7c7?auto=format&fit=crop&w=1200&q=80',
      ],
    },
    {
      code: 'CA0088',
      title: 'Sobrado Moderno para Locação na Vila Nova',
      slug: 'sobrado-moderno-locacao-vila-nova-cruzeiro-ca0088',
      description: 'Sobrado seminovo disponível para locação residencial na Vila Nova, Cruzeiro-SP. Possui 2 suítes amplas no pavimento superior, sala integrada com a cozinha, lavabo, área de serviço coberta e vaga para veículo. Segurança e conforto para sua família.',
      type: 'SOBRADO',
      purpose: 'LOCACAO',
      price: 2200,
      condoFee: 0,
      iptu: 95,
      city: 'Cruzeiro',
      state: 'SP',
      neighborhood: 'Vila Nova',
      address: 'Rua Capitão Neco, Vila Nova, Cruzeiro - SP',
      bedrooms: 2,
      suites: 2,
      bathrooms: 3,
      parking: 1,
      area: 120,
      featured: false,
      active: true,
      photos: [
        'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
        'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=1200&q=80',
      ],
    },
    {
      code: 'CO0015',
      title: 'Ponto Comercial Estratégico no Centro de Cruzeiro',
      slug: 'ponto-comercial-estrategico-centro-cruzeiro-co0015',
      description: 'Imóvel comercial de esquina com alta visibilidade de pedestres e veículos no Centro de Cruzeiro. Salão amplo no térreo, escritório no mezanino, 2 banheiros adaptados para acessibilidade e fachada envidraçada.',
      type: 'COMERCIAL',
      purpose: 'LOCACAO',
      price: 4500,
      condoFee: 0,
      iptu: 320,
      city: 'Cruzeiro',
      state: 'SP',
      neighborhood: 'Centro',
      address: 'Rua Eng. Antônio Penido, Centro, Cruzeiro - SP',
      bedrooms: 0,
      suites: 0,
      bathrooms: 2,
      parking: 3,
      area: 210,
      featured: true,
      active: true,
      photos: [
        'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=80',
        'https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&w=1200&q=80',
      ],
    },
    {
      code: 'CH0009',
      title: 'Chácara de Lazer com Piscina e Pomar em Cruzeiro',
      slug: 'chacara-lazer-piscina-pomar-cruzeiro-ch0009',
      description: 'Linda chácara com clima agradável e fácil acesso no bairro Itagaçaba. Casa sede com 4 quartos, varanda em U, piscina com deck de pedra mineira, pomar formado com árvores frutíferas e espaço para campo de futebol.',
      type: 'CHACARA',
      purpose: 'VENDA',
      price: 720000,
      condoFee: 0,
      iptu: 150,
      city: 'Cruzeiro',
      state: 'SP',
      neighborhood: 'Itagaçaba',
      address: 'Estrada do Itagaçaba, Cruzeiro - SP',
      bedrooms: 4,
      suites: 1,
      bathrooms: 3,
      parking: 6,
      area: 2500,
      featured: true,
      active: true,
      photos: [
        'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&w=1200&q=80',
        'https://images.unsplash.com/photo-1596178065887-1198b6148b2b?auto=format&fit=crop&w=1200&q=80',
      ],
    },
    {
      code: 'TE0031',
      title: 'Terreno Residencial Plano no Bairro Washington Luiz',
      slug: 'terreno-residencial-plano-washington-luiz-cruzeiro-te0031',
      description: 'Lote residencial 100% plano pronto para construir, localizado em rua asfaltada com infraestrutura de água, luz e esgoto. Documentação impecável pronta para financiamento de construção.',
      type: 'TERRENO',
      purpose: 'VENDA',
      price: 195000,
      condoFee: 0,
      iptu: 60,
      city: 'Cruzeiro',
      state: 'SP',
      neighborhood: 'Washington Luiz',
      address: 'Rua Dr. Celestino, Washington Luiz, Cruzeiro - SP',
      bedrooms: 0,
      suites: 0,
      bathrooms: 0,
      parking: 0,
      area: 300,
      featured: false,
      active: true,
      photos: [
        'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1200&q=80',
      ],
    },
    {
      code: 'CA0110',
      title: 'Casa de Praia Triplex no Tenório em Ubatuba',
      slug: 'casa-praia-triplex-tenorio-ubatuba-ca0110',
      description: 'Espetacular casa estilo triplex para temporada ou compra na Praia do Tenório, Ubatuba-SP. Possui 5 suítes, churrasqueira privativa, piscina e vista deslumbrante para a mata atlântica e o oceano.',
      type: 'CASA',
      purpose: 'TEMPORADA',
      price: 1400, // Diária de temporada
      condoFee: 0,
      iptu: 350,
      city: 'Ubatuba',
      state: 'SP',
      neighborhood: 'Tenório',
      address: 'Rua dos Coqueiros, Tenório, Ubatuba - SP',
      bedrooms: 5,
      suites: 5,
      bathrooms: 6,
      parking: 4,
      area: 360,
      featured: true,
      active: true,
      photos: [
        'https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=1200&q=80',
        'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=1200&q=80',
      ],
    },
    {
      code: 'AP0115',
      title: 'Apartamento de 2 Dormitórios no Itaguá em Ubatuba',
      slug: 'apartamento-2-dormitorios-itagua-ubatuba-ap0115',
      description: 'Excelente apartamento à venda no charmoso bairro do Itaguá, famoso pela gastronomia e orla da praia. Prédio novo com elevador, armário náutico e área gourmet no terraço.',
      type: 'APARTAMENTO',
      purpose: 'VENDA',
      price: 530000,
      condoFee: 380,
      iptu: 140,
      city: 'Ubatuba',
      state: 'SP',
      neighborhood: 'Itaguá',
      address: 'Rua Guarani, Itaguá, Ubatuba - SP',
      bedrooms: 2,
      suites: 1,
      bathrooms: 2,
      parking: 1,
      area: 72,
      featured: false,
      active: true,
      photos: [
        'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=1200&q=80',
      ],
    },
    {
      code: 'SI0004',
      title: 'Sítio Produtivo com Nascente na Zona Rural de Cruzeiro',
      slug: 'sitio-produtivo-nascente-zona-rural-cruzeiro-si0004',
      description: 'Sítio encantador na Mantiqueira com água cristalina de nascente própria, curral, casa simples para caseiro e área pastagem bem dividida. Ideal para pecuária leiteira ou turismo rural.',
      type: 'SITIO',
      purpose: 'VENDA',
      price: 1150000,
      condoFee: 0,
      iptu: 0,
      city: 'Cruzeiro',
      state: 'SP',
      neighborhood: 'Zona Rural',
      address: 'Estrada do Rufino, Cruzeiro - SP',
      bedrooms: 3,
      suites: 0,
      bathrooms: 2,
      parking: 10,
      area: 48000,
      featured: false,
      active: true,
      photos: [
        'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1200&q=80',
      ],
    },
  ];

  for (const item of sampleProperties) {
    const { photos, ...propData } = item;
    const property = await prisma.property.create({
      data: propData,
    });

    for (let i = 0; i < photos.length; i++) {
      await prisma.photo.create({
        data: {
          url: photos[i],
          isCover: i === 0,
          order: i,
          propertyId: property.id,
        },
      });
    }
  }

  console.log(`✅ ${sampleProperties.length} imóveis cadastrados e vinculados com fotos.`);

  // 3. Criar leads demonstrativos
  await prisma.lead.create({
    data: {
      name: 'Carlos Alberto Silva',
      email: 'carlos.alberto@gmail.com',
      phone: '(12) 99123-4567',
      message: 'Gostaria de agendar uma visita para conhecer a Casa no Jardim América (CA0052).',
      type: 'INTERESSE_IMOVEL',
      propertyId: 2,
    },
  });

  console.log('✅ Lead demonstrativo inserido.');
  console.log('🎉 Seed finalizado com sucesso!');
}

main()
  .catch((e) => {
    console.error('❌ Erro durante a execução do seed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
