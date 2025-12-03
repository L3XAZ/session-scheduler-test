/* eslint-disable react-hooks/set-state-in-effect */
/* eslint-disable react-hooks/preserve-manual-memoization */
'use client';

import { useEffect, useMemo, useRef, useState } from 'react';

import DatePill from '@/components/ui/pill/DatePill';
import ScrollRail, { ScrollRailHandle } from '@/components/ui/scroll/ScrollRail';
import { useIsDesktop } from '@/hooks/useIsDesktop';
import { useMonthLabels } from '@/hooks/useMonthLabels';
import type { RailLayoutState } from '@/hooks/useScrollRail';
import { BookingDate } from '@/types/booking';

type DateSectionProps = {
  dates: BookingDate[];
  selectedDate: Date | null;
  onSelectDate: (date: Date) => void;
};

const DESKTOP_OFFSET = 56;
const COLLISION_THRESHOLD = 40;

export default function DateSection({ dates, selectedDate, onSelectDate }: DateSectionProps) {
  const [layout, setLayout] = useState<RailLayoutState | null>(null);
  const [anchorX, setAnchorX] = useState<number | null>(null);

  const isDesktop = useIsDesktop();
  const railRef = useRef<ScrollRailHandle>(null);

  useEffect(() => {
    if (!layout) return;
    if (anchorX != null) return;
    if (layout.childrenRects.length === 0) return;

    const firstRect = layout.childrenRects[0];
    let x = firstRect.x - layout.scrollLeft;

    if (isDesktop) {
      x += DESKTOP_OFFSET;
    }

    setAnchorX(x);
  }, [layout, anchorX, isDesktop]);

  const { primaryIndex, secondaryIndex } = useMonthLabels(dates, layout);

  const primaryMonth = dates[primaryIndex]?.monthLabel ?? '';

  const { secondaryMonth, secondaryX } = useMemo(() => {
    if (!layout || secondaryIndex == null) {
      return { secondaryMonth: '', secondaryX: null };
    }

    const rect = layout.childrenRects[secondaryIndex];
    if (!rect) {
      return { secondaryMonth: '', secondaryX: null };
    }

    const x = rect.x - layout.scrollLeft;
    return {
      secondaryMonth: dates[secondaryIndex].monthLabel,
      secondaryX: isDesktop ? x + DESKTOP_OFFSET : x,
    };
  }, [layout, secondaryIndex, dates, isDesktop]);

  const hidePrimary =
    anchorX != null && secondaryX != null && Math.abs(secondaryX - anchorX) < COLLISION_THRESHOLD;

  const clickHandlers = useMemo(
    () =>
      dates.map((item, index) => {
        return () => {
          railRef.current?.scrollToChild(index);
          onSelectDate(item.date);
        };
      }),
    [dates, onSelectDate]
  );

  return (
    <div className="relative w-full">
      <div className="pointer-events-none absolute left-0 right-0 top-[-20px] z-20 h-[20px]">
        {!hidePrimary && anchorX != null && primaryMonth && (
          <div
            className="absolute font-poppins text-[14px] text-text-secondary"
            style={{ transform: `translateX(${anchorX}px)` }}
          >
            {primaryMonth}
          </div>
        )}

        {secondaryX != null && secondaryMonth && (
          <div
            className="absolute font-poppins text-[14px] text-text-secondary"
            style={{ transform: `translateX(${secondaryX}px)` }}
          >
            {secondaryMonth}
          </div>
        )}
      </div>

      <ScrollRail ref={railRef} onLayoutChange={setLayout}>
        {dates.map((item, index) => {
          const isSelected = selectedDate != null && selectedDate.getTime() === item.date.getTime();

          return (
            <DatePill
              key={item.id}
              day={item.dayLabel}
              date={item.dateLabel}
              selected={isSelected}
              onClick={clickHandlers[index]}
            />
          );
        })}
      </ScrollRail>
    </div>
  );
}
