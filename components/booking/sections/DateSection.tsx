'use client';

import { useEffect, useRef, useState } from 'react';
import ScrollRail, { ScrollRailHandle } from '@/components/ui/scroll/ScrollRail';
import DatePill from '@/components/ui/pill/DatePill';
import { BookingDate } from '@/types/booking';
import { useMonthLabels } from '@/hooks/useMonthLabels';
import type { RailLayoutState } from '@/hooks/useScrollRail';

type DateSectionProps = {
    dates: BookingDate[];
    selectedDate: Date | null;
    onSelectDate: (date: Date) => void;
};

const DESKTOP_OFFSET = 56;
const COLLISION_THRESHOLD = 40;
const DESKTOP_BREAKPOINT = 768;

export default function DateSection({ dates, selectedDate, onSelectDate }: DateSectionProps) {
    const [layout, setLayout] = useState<RailLayoutState | null>(null);
    const [anchorX, setAnchorX] = useState<number | null>(null);
    const [isDesktop, setIsDesktop] = useState(false);

    const railRef = useRef<ScrollRailHandle>(null);

    useEffect(() => {
        const updateViewport = () => {
            if (typeof window === 'undefined') return;
            setIsDesktop(window.innerWidth >= DESKTOP_BREAKPOINT);
        };

        updateViewport();
        window.addEventListener('resize', updateViewport);

        return () => {
            window.removeEventListener('resize', updateViewport);
        };
    }, []);

    useEffect(() => {
        if (!layout) return;
        if (anchorX != null) return;
        if (layout.childrenRects.length === 0) return;

        const firstRect = layout.childrenRects[0];
        let nextAnchorX = firstRect.x - layout.scrollLeft;
        if (isDesktop) {
            nextAnchorX += DESKTOP_OFFSET;
        }

        setAnchorX(nextAnchorX);
    }, [layout, anchorX, isDesktop]);

    const { primaryIndex, secondaryIndex } = useMonthLabels(dates, layout);

    const primaryMonth = dates[primaryIndex]?.monthLabel ?? '';
    let secondaryMonth = '';
    let secondaryX: number | null = null;

    if (layout && secondaryIndex != null && layout.childrenRects[secondaryIndex]) {
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
                {!hidePrimary && anchorX != null && primaryMonth && (
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

            <ScrollRail
                ref={railRef}
                onLayoutChange={(nextLayout) => {
                    setLayout(nextLayout);
                }}
            >
                {dates.map((item, index) => {
                    const isSelected =
                        selectedDate != null && selectedDate.getTime() === item.date.getTime();

                    return (
                        <DatePill
                            key={item.date.toISOString()}
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
