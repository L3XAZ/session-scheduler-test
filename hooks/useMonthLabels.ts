'use client';

import { useMemo } from 'react';
import { BookingDate } from '@/types/booking';

export type RailLayoutState = {
    scrollLeft: number;
    containerWidth: number;
    childrenRects: { x: number; width: number }[];
};

type MonthLabelIndices = {
    primaryIndex: number;
    secondaryIndex: number | null;
};

const MIN_VISIBILITY_OFFSET = 10;

export function useMonthLabels(
    dates: BookingDate[],
    layout: RailLayoutState | null
): MonthLabelIndices {
    return useMemo(() => {
        if (!layout || dates.length === 0) {
            return { primaryIndex: 0, secondaryIndex: null };
        }

        const { scrollLeft, containerWidth, childrenRects } = layout;

        if (childrenRects.length === 0) {
            return { primaryIndex: 0, secondaryIndex: null };
        }

        const firstVisibleIndex = childrenRects.findIndex((rect) => {
            const left = rect.x - scrollLeft;
            const right = left + rect.width;
            return right > 0;
        });

        const primaryIndex =
            firstVisibleIndex === -1 ? 0 : Math.min(firstVisibleIndex, dates.length - 1);

        const nextMonthIndex = dates.findIndex((date, index) => {
            if (index <= primaryIndex) return false;
            return date.date.getDate() === 1;
        });

        if (nextMonthIndex === -1 || nextMonthIndex >= childrenRects.length) {
            return { primaryIndex, secondaryIndex: null };
        }

        const rect = childrenRects[nextMonthIndex];
        const viewX = rect.x - scrollLeft;

        if (viewX < MIN_VISIBILITY_OFFSET || viewX > containerWidth - MIN_VISIBILITY_OFFSET) {
            return { primaryIndex, secondaryIndex: null };
        }

        return { primaryIndex, secondaryIndex: nextMonthIndex };
    }, [dates, layout]);
}
