import './globals.css';
import type { Metadata } from 'next';

import { kaiseiTokumin, poppins } from './fonts';

export const metadata: Metadata = {
  title: 'Session Scheduler',
  description: 'Test assignment',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${poppins.variable} ${kaiseiTokumin.variable}`}>
      <body className="min-h-screen bg-white antialiased">{children}</body>
    </html>
  );
}
