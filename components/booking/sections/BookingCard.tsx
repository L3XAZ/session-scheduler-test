'use client';

import BookingCardHeader from './BookingCardHeader';
import DateSection from './DateSection';
import TimeSection from './TimeSection';
import ConfirmBar from './ConfirmBar';

export default function BookingCard() {
    return (
        <section className="flex flex-grow flex-col font-poppins">
            <div>
                <BookingCardHeader />

                <div className="mt-6 space-y-5">
                    <DateSection />
                    <TimeSection />
                </div>
            </div>

            <div className="mt-auto pt-8">
                <ConfirmBar disabled />
            </div>
        </section>
    );
}
