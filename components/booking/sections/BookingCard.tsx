'use client';

import BookingCardHeader from './BookingCardHeader';
import DateSection from './DateSection';
import TimeSection from './TimeSection';
import ConfirmBar from './ConfirmBar';
import { BookingDate, TimeSlot } from '@/types/booking';

type BookingCardProps = {
    dates: BookingDate[];
    timeSlots: TimeSlot[];
    selectedDate: Date | null;
    selectedTime: Date | null;
    onSelectDate: (date: Date) => void;
    onSelectTime: (time: Date) => void;
    onConfirm: () => void;
};

export default function BookingCard({
    dates,
    timeSlots,
    selectedDate,
    selectedTime,
    onSelectDate,
    onSelectTime,
    onConfirm,
}: BookingCardProps) {
    const isConfirmDisabled = !selectedDate || !selectedTime;

    return (
        <section className="flex min-h-0 flex-1 flex-col font-poppins">
            <BookingCardHeader />

            <div className="mt-6 space-y-5">
                <DateSection
                    dates={dates}
                    selectedDate={selectedDate}
                    onSelectDate={onSelectDate}
                />

                <TimeSection
                    timeSlots={timeSlots}
                    selectedTime={selectedTime}
                    hasSelectedDate={Boolean(selectedDate)}
                    onSelectTime={onSelectTime}
                />
            </div>

            <div className="mt-auto pt-8">
                <ConfirmBar disabled={isConfirmDisabled} onConfirm={onConfirm} />
            </div>
        </section>
    );
}
