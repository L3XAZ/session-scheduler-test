import './globals.css';
import { kaiseiTokumin, poppins } from './fonts';

export const metadata = {
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
