'use client';

import DesktopHeader from './DesktopHeader';
import BookingCard from '../sections/BookingCard';

export default function DesktopShell() {
    return (
        <div className="relative z-20 hidden min-h-screen flex-col md:flex">
            <DesktopHeader />

            <div className="flex flex-1 items-center justify-center">
                <div className="scroll-hide flex h-[620px] max-h-[calc(100vh-150px)] w-[580px] flex-col overflow-y-auto rounded-[28px] bg-white p-10 shadow-[0_20px_52px_rgba(0,0,0,0.25)]">
                    <BookingCard />
                </div>
            </div>
        </div>
    );
}
