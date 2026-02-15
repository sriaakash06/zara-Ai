
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import ServiceWorkerCleaner from '@/components/ServiceWorkerCleaner';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Zara - AI Assistant',
  description: 'Your friendly, intelligent AI assistant by Sri.',
  icons: {
    icon: '/favicon.ico', // Default, update if asset available
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ServiceWorkerCleaner />
        {children}
      </body>
    </html>
  );
}
