'use client';

import { useMemo, useRef, useState } from 'react';
import { startOfDay } from 'date-fns';
import DesktopShell from './layout/DesktopShell';
import MobileShell from './layout/MobileShell';
import Backdrop from '@/components/booking/layout/Backdrop';
import { BookingDate, TimeSlot } from '@/types/booking';
import { generateDates, generateTimeSlots } from '@/lib/dateUtils';
import BookingCard from '@/components/booking/sections/BookingCard';

export default function BookingPage() {
    const todayRef = useRef<Date>(startOfDay(new Date()));
    const nowRef = useRef<Date>(new Date());

    const [selectedDate, setSelectedDate] = useState<Date | null>(todayRef.current);
    const [selectedTime, setSelectedTime] = useState<Date | null>(null);

    const dates = useMemo<BookingDate[]>(() => {
        return generateDates(todayRef.current, 6);
    }, []);

    const timeSlots = useMemo<TimeSlot[]>(() => {
        if (!selectedDate) return [];
        return generateTimeSlots(selectedDate, nowRef.current);
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
