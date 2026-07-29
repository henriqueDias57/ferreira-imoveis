import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import FloatingWhatsApp from '@/components/FloatingWhatsApp';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
});

export const metadata: Metadata = {
  title: 'Ferreira Imóveis | Imobiliária em Cruzeiro - SP e Imóveis em Ubatuba',
  description:
    'Ferreira Imóveis em Cruzeiro - SP. Aluguel, venda, imóveis de temporada no litoral em Ubatuba, consultoria imobiliária e contratos com segurança jurídica. CRECI 130906-F e 198557-F.',
  keywords: [
    'Ferreira Imóveis',
    'Imobiliária em Cruzeiro SP',
    'Aluguel Cruzeiro SP',
    'Venda de imóveis Cruzeiro',
    'Imóveis de temporada Ubatuba',
    'Corretor de imóveis Cruzeiro',
    'Afrânio Ferreira CRECI',
    'Maria Fernanda Ferreira CRECI',
  ],
  authors: [{ name: 'Ferreira Imóveis' }],
  openGraph: {
    title: 'Ferreira Imóveis | Venda, Locação e Temporada em Cruzeiro e Ubatuba SP',
    description:
      'Imobiliária de referência em Cruzeiro - SP e litoral. Venda, locação residencial e comercial, e temporada em Ubatuba.',
    url: 'https://ferreiraimoveis.com.br',
    siteName: 'Ferreira Imóveis',
    locale: 'pt_BR',
    type: 'website',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className={`${inter.variable} dark`}>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body className="min-h-screen flex flex-col bg-[#090D16] text-slate-100 antialiased selection:bg-brandRed-600 selection:text-white">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
        <FloatingWhatsApp />
      </body>
    </html>
  );
}
