'use client';

import BookingCardHeader from './BookingCardHeader';
import DateSection from './DateSection';
import TimeSection from './TimeSection';
import ConfirmBar from './ConfirmBar';

export default function BookingCard() {
    return (
        <section className="flex min-h-0 flex-1 flex-col font-poppins">
            <BookingCardHeader />

            <div className="mt-6 space-y-5">
                <DateSection />
                <TimeSection />
            </div>

            <div className="mt-auto pt-8">
                <ConfirmBar disabled />
            </div>
        </section>
    );
}
