'use client';

import BookingCard from '../sections/BookingCard';
import MobileHeader from './MobileHeader';

export default function MobileShell() {
    return (
        <div className="relative z-20 flex min-h-screen flex-col md:hidden">
            <MobileHeader />

            <section className="relative z-30 -mt-[182px] flex flex-1 flex-col rounded-t-[24px] bg-white px-5 pt-6 shadow-[0_-10px_40px_rgba(0,0,0,0.25)]">
                <div className="flex flex-1 flex-col overflow-auto pb-8">
                    <BookingCard />
                </div>
            </section>
        </div>
    );
}
