'use client';

import { useMemo } from 'react';

import { BookingDate, TimeSlot } from '@/types/booking';

import ConfirmBar from '../sections/ConfirmBar';
import DateSection from '../sections/DateSection';
import TimeSection from '../sections/TimeSection';

import BookingCardHeader from './BookingCardHeader';

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
  const isEnabled = useMemo(
    () => Boolean(selectedDate && selectedTime),
    [selectedDate, selectedTime]
  );

  const hasSelectedDate = selectedDate !== null;

  return (
    <section className="flex min-h-0 flex-1 flex-col font-poppins">
      <BookingCardHeader />

      <div className="mt-6 space-y-5">
        <DateSection dates={dates} selectedDate={selectedDate} onSelectDate={onSelectDate} />

        <TimeSection
          timeSlots={timeSlots}
          selectedTime={selectedTime}
          hasSelectedDate={hasSelectedDate}
          onSelectTime={onSelectTime}
        />
      </div>

      <div className="mt-auto pt-8">
        <ConfirmBar enabled={isEnabled} onConfirm={onConfirm} />
      </div>
    </section>
  );
}
