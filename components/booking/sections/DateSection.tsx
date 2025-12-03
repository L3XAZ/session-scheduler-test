'use client';

import { useEffect, useRef, useState } from 'react';
import ScrollRail, { ScrollRailHandle } from '@/components/ui/ScrollRail';
import DatePill from '@/components/ui/DatePill';
import { BookingDate } from '@/types/booking';
import type { RailLayoutState } from '@/hooks/useMonthLabels';
import { useMonthLabels } from '@/hooks/useMonthLabels';

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

    const railRef = useRef<ScrollRailHandle>(null);

    const isDesktop = typeof window !== 'undefined' ? window.innerWidth >= 768 : false;

    useEffect(() => {
        if (!layout) return;

        if (anchorX == null && layout.childrenRects.length > 0) {
            const firstRect = layout.childrenRects[0];
            let ax = firstRect.x - layout.scrollLeft;

            if (isDesktop) ax += DESKTOP_OFFSET;

            setAnchorX(ax);
        }
    }, [layout, anchorX, isDesktop]);

    const { primaryIndex, secondaryIndex } = useMonthLabels(dates, layout);

    const primaryMonth =
        dates.length > 0 && primaryIndex >= 0 && primaryIndex < dates.length
            ? dates[primaryIndex].monthLabel
            : '';

    let secondaryMonth = '';
    let secondaryX: number | null = null;

    if (
        layout &&
        secondaryIndex != null &&
        secondaryIndex >= 0 &&
        secondaryIndex < dates.length &&
        layout.childrenRects[secondaryIndex]
    ) {
        const rect = layout.childrenRects[secondaryIndex];
        const rawX = rect.x - layout.scrollLeft;

        secondaryMonth = dates[secondaryIndex].monthLabel;

        secondaryX = isDesktop ? rawX + DESKTOP_OFFSET : rawX;
    }

    const hidePrimary =
        anchorX != null &&
        secondaryX != null &&
        Math.abs(secondaryX - anchorX) < COLLISION_THRESHOLD;

    return (
        <div className="relative w-full">
            <div className="pointer-events-none absolute left-0 right-0 top-[-20px] z-20 h-[20px]">
                {anchorX != null && primaryMonth && !hidePrimary && (
                    <div
                        className="absolute font-poppins text-[14px] text-text-secondary transition-opacity duration-150"
                        style={{ transform: `translateX(${anchorX}px)` }}
                    >
                        {primaryMonth}
                    </div>
                )}

                {secondaryX != null && secondaryMonth && (
                    <div
                        className="absolute font-poppins text-[14px] text-text-secondary transition-opacity duration-150"
                        style={{ transform: `translateX(${secondaryX}px)` }}
                    >
                        {secondaryMonth}
                    </div>
                )}
            </div>

            <ScrollRail ref={railRef} onLayoutChange={setLayout}>
                {dates.map((item, index) => {
                    const isSelected =
                        selectedDate != null && selectedDate.getTime() === item.date.getTime();

                    return (
                        <DatePill
                            key={item.id}
                            day={item.dayLabel}
                            date={item.dateLabel}
                            selected={isSelected}
                            onClick={() => {
                                railRef.current?.scrollToChild(index);
                                onSelectDate(item.date);
                            }}
                        />
                    );
                })}
            </ScrollRail>
        </div>
    );
}
