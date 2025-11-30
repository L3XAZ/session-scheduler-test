export const metadata = {
    title: 'Session Scheduler',
    description: 'Test assignment',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en">
            <body className="min-h-screen bg-white">{children}</body>
        </html>
    );
}
