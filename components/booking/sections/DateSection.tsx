'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import ScrollRail, { ScrollRailHandle } from '@/components/ui/ScrollRail';
import DatePill from '@/components/ui/DatePill';
import { BookingDate } from '@/types/booking';

type DateSectionProps = {
    dates: BookingDate[];
    selectedDate: Date | null;
    onSelectDate: (date: Date) => void;
};

type LayoutState = {
    scrollLeft: number;
    containerWidth: number;
    childrenRects: { x: number; width: number }[];
};

const DESKTOP_OFFSET = 56;

export default function DateSection({ dates, selectedDate, onSelectDate }: DateSectionProps) {
    const [layout, setLayout] = useState<LayoutState | null>(null);

    const [anchorX, setAnchorX] = useState<number | null>(null);
    const scrollRef = useRef<ScrollRailHandle>(null);

    const isDesktop = typeof window !== 'undefined' ? window.innerWidth >= 768 : false;

    useEffect(() => {
        if (!layout) return;

        if (anchorX == null && layout.childrenRects.length > 0) {
            const rect = layout.childrenRects[0];
            let computed = rect.x - layout.scrollLeft;

            if (isDesktop) computed += DESKTOP_OFFSET;

            setAnchorX(computed);
        }
    }, [layout, anchorX, isDesktop]);

    const { primaryMonth, secondaryMonth, secondaryX } = useMemo(() => {
        if (!layout || anchorX == null) {
            return { primaryMonth: '', secondaryMonth: '', secondaryX: null as number | null };
        }

        const { childrenRects, scrollLeft, containerWidth } = layout;

        const markers: { month: string; index: number; x: number }[] = [];
        const seen = new Set<string>();

        dates.forEach((item, i) => {
            const day = item.date.getDate();
            const month = item.date.toLocaleDateString('en-US', { month: 'short' });

            if (day === 1 && !seen.has(month)) {
                seen.add(month);
                markers.push({ month, index: i, x: childrenRects[i].x });
            }
        });

        if (markers.length === 0 || markers[0].index !== 0) {
            markers.unshift({
                month: dates[0].date.toLocaleDateString('en-US', { month: 'short' }),
                index: 0,
                x: childrenRects[0].x,
            });
        }

        const anchorWorld = scrollLeft + anchorX;

        let primary = markers[0];

        for (let i = 0; i < markers.length; i++) {
            if (markers[i].x <= anchorWorld) primary = markers[i];
        }

        let secondary: { month: string; x: number } | null = null;
        const primaryIndex = markers.findIndex((m) => m.index === primary.index);

        if (primaryIndex !== -1) {
            for (let i = primaryIndex + 1; i < markers.length; i++) {
                const cand = markers[i];
                const viewX = cand.x - scrollLeft;

                if (viewX > 0 && viewX < containerWidth) {
                    secondary = { month: cand.month, x: viewX };
                    break;
                }
            }
        }

        return {
            primaryMonth: primary.month,
            secondaryMonth: secondary ? secondary.month : '',
            secondaryX: secondary ? secondary.x : null,
        };
    }, [layout, anchorX, dates]);

    return (
        <div className="relative w-full">
            <div className="pointer-events-none absolute left-0 right-0 top-[-28px] z-20 h-[20px]">
                {anchorX != null && primaryMonth && (
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

            <ScrollRail ref={scrollRef} onLayoutChange={setLayout}>
                {dates.map((item, index) => {
                    const isSelected =
                        selectedDate != null && item.date.getTime() === selectedDate.getTime();

                    return (
                        <DatePill
                            key={item.date.toISOString()}
                            day={item.dayLabel}
                            date={item.dateLabel}
                            selected={isSelected}
                            onClick={() => {
                                scrollRef.current?.scrollToChild(index);
                                onSelectDate(item.date);
                            }}
                        />
                    );
                })}
            </ScrollRail>
        </div>
    );
}
