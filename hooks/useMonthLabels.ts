import { useMemo } from 'react';
import { BookingDate } from '@/types/booking';

export type RailLayoutState = {
    scrollLeft: number;
    containerWidth: number;
    childrenRects: { x: number; width: number }[];
};

export function useMonthLabels(dates: BookingDate[], layout: RailLayoutState | null) {
    return useMemo(() => {
        if (!layout || dates.length === 0) {
            return {
                primaryIndex: 0,
                secondaryIndex: null as number | null,
            };
        }

        const { scrollLeft, containerWidth, childrenRects } = layout;

        if (childrenRects.length === 0) {
            return {
                primaryIndex: 0,
                secondaryIndex: null,
            };
        }

        const firstVisibleIndex = childrenRects.findIndex((rect) => {
            const left = rect.x - scrollLeft;
            const right = left + rect.width;
            return right > 0;
        });

        const primaryIndexRaw = firstVisibleIndex === -1 ? 0 : firstVisibleIndex;
        const primaryIndex = Math.min(primaryIndexRaw, dates.length - 1);

        const nextMonthIndex = dates.findIndex((d, i) => {
            if (i <= primaryIndex) return false;
            return d.date.getDate() === 1;
        });

        if (nextMonthIndex === -1 || nextMonthIndex >= childrenRects.length) {
            return {
                primaryIndex,
                secondaryIndex: null,
            };
        }

        const rect = childrenRects[nextMonthIndex];
        const viewX = rect.x - scrollLeft;

        if (viewX < 10 || viewX > containerWidth - 10) {
            return {
                primaryIndex,
                secondaryIndex: null,
            };
        }

        return {
            primaryIndex,
            secondaryIndex: nextMonthIndex,
        };
    }, [dates, layout]);
}
