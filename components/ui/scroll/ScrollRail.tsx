'use client';

import { forwardRef, ReactNode, useCallback, useEffect, useImperativeHandle } from 'react';

import ChevronButton from '@/components/ui/buttons/ChevronButton';
import type { RailLayoutState } from '@/hooks/useScrollRail';
import { useScrollRail } from '@/hooks/useScrollRail';

interface ScrollRailProps {
  children: ReactNode;
  onLayoutChange?: (data: RailLayoutState) => void;
}

export type ScrollRailHandle = {
  scrollToChild: (index: number) => void;
};

const ScrollRail = forwardRef<ScrollRailHandle, ScrollRailProps>(
  ({ children, onLayoutChange }, ref) => {
    const { containerRef, layout, canScrollLeft, canScrollRight, scrollBy, scrollToChild } =
      useScrollRail();

    useImperativeHandle(
      ref,
      () => ({
        scrollToChild(index: number) {
          scrollToChild(index);
        },
      }),
      [scrollToChild]
    );

    useEffect(() => {
      if (!onLayoutChange || !layout) return;
      onLayoutChange(layout);
    }, [layout, onLayoutChange]);

    const handleWheel = useCallback(
      (event: React.WheelEvent<HTMLDivElement>) => {
        const container = containerRef.current;
        if (!container) return;

        if (Math.abs(event.deltaY) <= Math.abs(event.deltaX)) {
          return;
        }

        container.scrollLeft += event.deltaY * 0.7;
      },
      [containerRef]
    );

    const handleArrowClick = (direction: 'left' | 'right') => {
      const container = containerRef.current;
      if (!container) return;

      const amount = container.clientWidth * 0.5;
      scrollBy(direction === 'left' ? -amount : amount);
    };

    return (
      <div className="relative flex w-full items-center">
        <div className="relative z-30 mr-6 hidden md:flex">
          <ChevronButton
            direction="left"
            disabled={!canScrollLeft}
            onClick={() => handleArrowClick('left')}
          />
        </div>

        <div className="relative w-full overflow-hidden">
          {canScrollLeft && (
            <div className="pointer-events-none absolute left-0 top-0 z-20 h-full w-[40px] bg-gradient-to-r from-white/85 via-white/40 to-transparent md:w-[60px]" />
          )}

          <div
            ref={containerRef}
            onWheel={handleWheel}
            className="scroll-hide flex w-full gap-2 overflow-x-auto py-1"
          >
            {children}
          </div>

          {canScrollRight && (
            <div className="pointer-events-none absolute right-0 top-0 z-20 h-full w-[40px] bg-gradient-to-l from-white/85 via-white/40 to-transparent md:w-[60px]" />
          )}
        </div>

        <div className="relative z-30 ml-6 hidden md:flex">
          <ChevronButton
            direction="right"
            disabled={!canScrollRight}
            onClick={() => handleArrowClick('right')}
          />
        </div>
      </div>
    );
  }
);

ScrollRail.displayName = 'ScrollRail';

export default ScrollRail;
