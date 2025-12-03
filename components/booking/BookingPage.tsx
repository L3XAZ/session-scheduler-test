'use client';

import { useMemo, useState } from 'react';
import { startOfDay } from 'date-fns';
import DesktopShell from './layout/DesktopShell';
import MobileShell from './layout/MobileShell';
import Backdrop from '@/components/booking/layout/Backdrop';
import BookingCard from './sections/BookingCard';
import { BookingDate, TimeSlot } from '@/types/booking';
import { generateDates, generateTimeSlots } from '@/lib/dateUtils';

export default function BookingPage() {
    const today = startOfDay(new Date());

    const [selectedDate, setSelectedDate] = useState<Date | null>(today);
    const [selectedTime, setSelectedTime] = useState<Date | null>(null);

    const dates = useMemo<BookingDate[]>(() => {
        return generateDates(today, 6);
    }, [today]);

    const timeSlots = useMemo<TimeSlot[]>(() => {
        if (!selectedDate) return [];
        return generateTimeSlots(selectedDate, new Date());
    }, [selectedDate]);

    const handleSelectDate = (date: Date) => {
        setSelectedDate(date);
        setSelectedTime(null);
    };

    const handleSelectTime = (time: Date) => {
        setSelectedTime(time);
    };

    const handleConfirm = () => {
        if (!selectedDate || !selectedTime) return;
        const timestamp = Math.floor(selectedTime.getTime() / 1000);
        // eslint-disable-next-line no-console
        console.log({ timestamp });
    };

    return (
        <main className="relative min-h-screen overflow-hidden bg-brand-primary">
            <Backdrop />

            <DesktopShell>
                <BookingCard
                    dates={dates}
                    timeSlots={timeSlots}
                    selectedDate={selectedDate}
                    selectedTime={selectedTime}
                    onSelectDate={handleSelectDate}
                    onSelectTime={handleSelectTime}
                    onConfirm={handleConfirm}
                />
            </DesktopShell>

            <MobileShell>
                <BookingCard
                    dates={dates}
                    timeSlots={timeSlots}
                    selectedDate={selectedDate}
                    selectedTime={selectedTime}
                    onSelectDate={handleSelectDate}
                    onSelectTime={handleSelectTime}
                    onConfirm={handleConfirm}
                />
            </MobileShell>
        </main>
    );
}
