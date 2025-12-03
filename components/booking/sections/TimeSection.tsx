/* eslint-disable react-hooks/preserve-manual-memoization */
'use client';

import { useMemo, useRef } from 'react';

import TimePill from '@/components/ui/pill/TimePill';
import ScrollRail, { ScrollRailHandle } from '@/components/ui/scroll/ScrollRail';
import { format12h } from '@/lib/dateUtils';
import { TimeSlot } from '@/types/booking';

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

  const clickHandlers = useMemo(
    () =>
      times.map((time, index) => {
        return () => {
          onSelectTime(time);
          railRef.current?.scrollToChild(index);
        };
      }),
    [times, onSelectTime]
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
        const isSelected = selectedTime != null && selectedTime.getTime() === time.getTime();

        return (
          <TimePill
            key={time.toISOString()}
            time={format12h(time)}
            selected={isSelected}
            onClick={clickHandlers[index]}
          />
        );
      })}
    </ScrollRail>
  );
}
