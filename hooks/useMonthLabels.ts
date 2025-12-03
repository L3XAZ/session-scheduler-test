'use client';

import { useMemo } from 'react';

import type { RailLayoutState } from '@/hooks/useScrollRail';
import { BookingDate } from '@/types/booking';

export type MonthLabelIndices = {
  primaryIndex: number;
  secondaryIndex: number | null;
};

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

    const markers: { index: number; x: number }[] = [];

    dates.forEach((item, index) => {
      if (item.date.getDate() === 1) {
        markers.push({
          index,
          x: childrenRects[index]?.x ?? 0,
        });
      }
    });

    if (markers.length === 0 || markers[0].index !== 0) {
      markers.unshift({
        index: 0,
        x: childrenRects[0]?.x ?? 0,
      });
    }

    const visibleStart = scrollLeft;
    let primaryIndex = markers[0].index;

    for (const marker of markers) {
      if (marker.x <= visibleStart) {
        primaryIndex = marker.index;
      }
    }

    let secondaryIndex: number | null = null;
    const primaryMarkerIdx = markers.findIndex((marker) => marker.index === primaryIndex);

    if (primaryMarkerIdx >= 0) {
      for (let i = primaryMarkerIdx + 1; i < markers.length; i++) {
        const marker = markers[i];
        const left = marker.x - scrollLeft;

        if (left > 0 && left < containerWidth) {
          secondaryIndex = marker.index;
          break;
        }
      }
    }

    return {
      primaryIndex,
      secondaryIndex,
    };
  }, [dates, layout]);
}
