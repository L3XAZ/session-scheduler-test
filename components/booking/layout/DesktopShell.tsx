'use client';

import BookingHeaderDesktop from '../header/BookingHeaderDesktop';

export default function DesktopShell({ children }: { children: React.ReactNode }) {
    return (
        <div className="relative z-20 hidden min-h-screen flex-col md:flex">
            <BookingHeaderDesktop />

            <div className="flex flex-1 items-center justify-center px-6">
                <div className="scroll-hide flex h-[620px] max-h-[calc(100vh-150px)] w-[620px] flex-col overflow-y-auto rounded-card bg-white p-10 shadow-card">
                    {children}
                </div>
            </div>
        </div>
    );
}
