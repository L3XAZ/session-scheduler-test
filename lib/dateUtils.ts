import {
    addDays,
    addMinutes,
    isAfter,
    isBefore,
    isSameDay,
    setHours,
    setMinutes,
    startOfDay,
} from 'date-fns';
import { BookingDate, TimeSlot } from '@/types/booking';

export function generateDates(start: Date, weeks: number): BookingDate[] {
    const dates: BookingDate[] = [];
    const totalDays = weeks * 7;
    const today = startOfDay(start);

    for (let i = 0; i <= totalDays; i++) {
        const current = addDays(today, i);

        dates.push({
            date: current,
            dayLabel: current.toLocaleDateString('en-US', { weekday: 'short' }),
            dateLabel: current.getDate().toString(),
            monthLabel: current.toLocaleDateString('en-US', { month: 'short' }),
            isToday: isSameDay(current, today),
        });
    }

    return dates;
}

const WORK_START_HOUR = 9;
const WORK_END_HOUR = 18;

export function generateTimeSlots(date: Date, now: Date): TimeSlot[] {
    const slots: TimeSlot[] = [];

    const dayStart = setMinutes(setHours(date, WORK_START_HOUR), 0);
    const dayEnd = setMinutes(setHours(date, WORK_END_HOUR), 0);

    let cursor = dayStart;

    while (isBefore(cursor, dayEnd)) {
        const isPast = isSameDay(date, now) && !isAfter(cursor, now);

        if (!isPast) {
            slots.push({ time: cursor });
        }

        cursor = addMinutes(cursor, 15);
    }

    return slots;
}

export function format12h(date: Date): string {
    return date.toLocaleTimeString('en-US', {
        hour: 'numeric',
        minute: '2-digit',
        hour12: true,
    });
}
