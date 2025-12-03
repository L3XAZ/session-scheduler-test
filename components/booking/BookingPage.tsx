'use client';

import { useCallback, useMemo, useState } from 'react';
import { startOfDay } from 'date-fns';
import DesktopShell from './layout/DesktopShell';
import MobileShell from './layout/MobileShell';
import Backdrop from '@/components/booking/layout/Backdrop';
import BookingCard from '@/components/booking/card/BookingCard';
import { generateDates, generateTimeSlots } from '@/lib/dateUtils';

export default function BookingPage() {
    const [initialDate] = useState(() => startOfDay(new Date()));
    const [selectedDate, setSelectedDate] = useState<Date | null>(initialDate);
    const [selectedTime, setSelectedTime] = useState<Date | null>(null);

    const dates = useMemo(() => generateDates(initialDate, 6), [initialDate]);

    const timeSlots = useMemo(() => {
        if (!selectedDate) return [];
        const now = new Date();
        return generateTimeSlots(selectedDate, now);
    }, [selectedDate]);

    const handleSelectDate = useCallback((date: Date) => {
        setSelectedDate(date);
        setSelectedTime(null);
    }, []);

    const handleSelectTime = useCallback((time: Date) => {
        setSelectedTime(time);
    }, []);

    const handleConfirm = useCallback(() => {
        if (!selectedDate || !selectedTime) return;
        const timestamp = Math.floor(selectedTime.getTime() / 1000);
        // eslint-disable-next-line no-console
        console.log({ timestamp });
    }, [selectedDate, selectedTime]);

    const bookingCardProps = useMemo(
        () => ({
            dates,
            timeSlots,
            selectedDate,
            selectedTime,
            onSelectDate: handleSelectDate,
            onSelectTime: handleSelectTime,
            onConfirm: handleConfirm,
        }),
        [
            dates,
            timeSlots,
            selectedDate,
            selectedTime,
            handleSelectDate,
            handleSelectTime,
            handleConfirm,
        ]
    );

    return (
        <main className="relative min-h-screen overflow-hidden bg-brand-primary">
            <Backdrop />

            <DesktopShell>
                <BookingCard {...bookingCardProps} />
            </DesktopShell>

            <MobileShell>
                <BookingCard {...bookingCardProps} />
            </MobileShell>
        </main>
    );
}
