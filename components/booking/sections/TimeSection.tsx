'use client';

import { useCallback, useMemo, useRef } from 'react';
import ScrollRail, { ScrollRailHandle } from '@/components/ui/scroll/ScrollRail';
import TimePill from '@/components/ui/pill/TimePill';
import { TimeSlot } from '@/types/booking';
import { format12h } from '@/lib/dateUtils';

type TimeSectionProps = {
    timeSlots: TimeSlot[];
    selectedTime: Date | null;
    hasSelectedDate: boolean;
    onSelectTime: (time: Date) => void;
};

export default function TimeSection({
    timeSlots,
    selectedTime,
    hasSelectedDate,
    onSelectTime,
}: TimeSectionProps) {
    const railRef = useRef<ScrollRailHandle>(null);

    const times = useMemo(() => timeSlots.map((slot) => slot.time), [timeSlots]);

    const handleSelect = useCallback(
        (time: Date, index: number) => {
            onSelectTime(time);
            railRef.current?.scrollToChild(index);
        },
        [onSelectTime]
    );

    if (!hasSelectedDate) {
        return (
            <div className="flex h-[45px] items-center justify-center text-[14px] text-text-secondary">
                Select a date first
            </div>
        );
    }

    if (times.length === 0) {
        return (
            <div className="flex h-[45px] items-center justify-center text-[14px] text-text-secondary">
                No available time slots
            </div>
        );
    }

    return (
        <ScrollRail ref={railRef}>
            {times.map((time, index) => {
                const isSelected =
                    selectedTime != null && selectedTime.getTime() === time.getTime();

                return (
                    <TimePill
                        key={time.toISOString()}
                        time={format12h(time)}
                        selected={isSelected}
                        onClick={() => handleSelect(time, index)}
                    />
                );
            })}
        </ScrollRail>
    );
}
