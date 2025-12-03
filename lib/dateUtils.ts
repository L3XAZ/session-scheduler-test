import {
    addDays,
    addMinutes,
    format,
    isAfter,
    isBefore,
    isSameDay,
    setHours,
    setMinutes,
    startOfDay,
} from 'date-fns';
import { BookingDate, TimeSlot } from '@/types/booking';
import { WORKING_HOURS } from '@/lib/config';

export function generateDates(start: Date, weeks: number): BookingDate[] {
    const today = startOfDay(start);
    const totalDays = weeks * 7;

    const result: BookingDate[] = [];

    for (let i = 0; i <= totalDays; i++) {
        const current = addDays(today, i);

        result.push({
            id: format(current, 'yyyy-MM-dd'),
            date: current,
            dayLabel: format(current, 'eee'),
            dateLabel: format(current, 'd'),
            monthLabel: format(current, 'MMM'),
            isToday: isSameDay(current, today),
        });
    }

    return result;
}

export function generateTimeSlots(date: Date, now: Date): TimeSlot[] {
    const { start, end, stepMinutes } = WORKING_HOURS;

    const startOfWork = setMinutes(setHours(date, start), 0);
    const endOfWork = setMinutes(setHours(date, end), 0);

    const slots: TimeSlot[] = [];

    let cursor = startOfWork;

    while (isBefore(cursor, endOfWork)) {
        const isPast = isSameDay(date, now) && !isAfter(cursor, now);

        if (!isPast) {
            slots.push({
                id: format(cursor, 'HH:mm'),
                time: cursor,
            });
        }

        cursor = addMinutes(cursor, stepMinutes);
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
