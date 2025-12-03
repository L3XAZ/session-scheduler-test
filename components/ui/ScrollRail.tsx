'use client';

import { forwardRef, useImperativeHandle, useLayoutEffect, useRef, useState } from 'react';
import ChevronButton from './ChevronButton';

interface ScrollRailProps {
    children: React.ReactNode;
    onLayoutChange?: (data: {
        scrollLeft: number;
        containerWidth: number;
        childrenRects: { x: number; width: number }[];
    }) => void;
}

export type ScrollRailHandle = {
    scrollToChild: (index: number) => void;
};

const ScrollRail = forwardRef<ScrollRailHandle, ScrollRailProps>(
    ({ children, onLayoutChange }, ref) => {
        const scrollRef = useRef<HTMLDivElement>(null);
        const containerRef = useRef<HTMLDivElement>(null);

        const [canScrollLeft, setCanScrollLeft] = useState(false);
        const [canScrollRight, setCanScrollRight] = useState(false);

        const update = () => {
            const el = scrollRef.current;
            if (!el) return;

            const maxScroll = el.scrollWidth - el.clientWidth;

            setCanScrollLeft(el.scrollLeft > 1);
            setCanScrollRight(el.scrollLeft < maxScroll - 1);

            if (!onLayoutChange) return;

            const rects = Array.from(el.children).map((child) => {
                const r = (child as HTMLElement).getBoundingClientRect();
                const containerRect = el.getBoundingClientRect();
                return {
                    x: r.left - containerRect.left + el.scrollLeft,
                    width: r.width,
                };
            });

            onLayoutChange({
                scrollLeft: el.scrollLeft,
                containerWidth: el.clientWidth,
                childrenRects: rects,
            });
        };

        useLayoutEffect(() => {
            update();
            const el = scrollRef.current;

            window.addEventListener('resize', update);
            el?.addEventListener('scroll', update);

            return () => {
                window.removeEventListener('resize', update);
                el?.removeEventListener('scroll', update);
            };
        }, []);

        useImperativeHandle(ref, () => ({
            scrollToChild(index: number) {
                const el = scrollRef.current;
                if (!el) return;

                const child = el.children[index] as HTMLElement;
                if (!child) return;

                const rect = child.getBoundingClientRect();
                const containerRect = el.getBoundingClientRect();

                const offsetLeft = rect.left - containerRect.left;
                const offsetRight = offsetLeft + rect.width;

                if (offsetLeft < 0) {
                    el.scrollBy({ left: offsetLeft - 8, behavior: 'smooth' });
                    return;
                }

                if (offsetRight > el.clientWidth) {
                    const diff = offsetRight - el.clientWidth;
                    el.scrollBy({ left: diff + 8, behavior: 'smooth' });
                    return;
                }
            },
        }));

        const handleWheel = (e: React.WheelEvent) => {
            const el = scrollRef.current;
            if (!el) return;

            if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
                el.scrollLeft += e.deltaY * 0.7;
                e.preventDefault();
            }
        };

        const scroll = (dir: 'left' | 'right') => {
            const el = scrollRef.current;
            if (!el) return;

            const amount = el.clientWidth * 0.5;
            el.scrollBy({
                left: dir === 'left' ? -amount : amount,
                behavior: 'smooth',
            });
        };

        return (
            <div className="relative flex w-full items-center">
                <div className="relative z-30 mr-6 hidden md:flex">
                    <ChevronButton
                        direction="left"
                        disabled={!canScrollLeft}
                        onClick={() => scroll('left')}
                    />
                </div>

                <div ref={containerRef} className="relative w-full overflow-hidden">
                    {canScrollLeft ? (
                        <div
                            key="fade-left"
                            className="pointer-events-none absolute left-0 top-0 z-20 h-full w-[40px] bg-gradient-to-r from-white/85 via-white/40 to-transparent md:w-[60px]"
                        />
                    ) : null}

                    <div
                        ref={scrollRef}
                        onWheel={handleWheel}
                        className="scroll-hide flex w-full gap-2 overflow-x-auto py-1"
                    >
                        {children}
                    </div>

                    {canScrollRight ? (
                        <div
                            key="fade-right"
                            className="pointer-events-none absolute right-0 top-0 z-20 h-full w-[40px] bg-gradient-to-l from-white/85 via-white/40 to-transparent md:w-[60px]"
                        />
                    ) : null}
                </div>

                <div className="relative z-30 ml-6 hidden md:flex">
                    <ChevronButton
                        direction="right"
                        disabled={!canScrollRight}
                        onClick={() => scroll('right')}
                    />
                </div>
            </div>
        );
    }
);

export default ScrollRail;
