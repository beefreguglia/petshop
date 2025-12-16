import type { Metadata } from 'next';
import { Inter, Inter_Tight } from 'next/font/google';
import { Toaster } from 'sonner';

import '@/styles/globals.css';
import { Header } from '@/components/header';

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
  weight: ['400', '500', '700'],
});

const interTight = Inter_Tight({
  variable: '--font-inter-tight',
  subsets: ['latin'],
  weight: ['700'],
});

export const metadata: Metadata = {
  title: 'MundoPet',
  description:
    'Aqui você pode ver todos os clientes e serviços agendados para hoje.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body className={`${inter.variable} ${interTight.variable} antialiased`}>
        <Header />
        <div className="mx-auto max-w-3xl">
          <main className="mt-12 flex flex-1 flex-col">
            {children}
            <Toaster position="top-right" />
          </main>
        </div>
      </body>
    </html>
  );
}
