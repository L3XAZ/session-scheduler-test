'use client';

import { useLayoutEffect, useRef, useState } from 'react';
import ChevronButton from './ChevronButton';

interface ScrollRailProps {
    children: React.ReactNode;
}

export default function ScrollRail({ children }: ScrollRailProps) {
    const ref = useRef<HTMLDivElement>(null);

    const [canScrollLeft, setCanScrollLeft] = useState(false);
    const [canScrollRight, setCanScrollRight] = useState(false);

    const updateScrollState = () => {
        const el = ref.current;
        if (!el) return;

        const maxScroll = el.scrollWidth - el.clientWidth;
        setCanScrollLeft(el.scrollLeft > 1);
        setCanScrollRight(el.scrollLeft < maxScroll - 1);
    };

    useLayoutEffect(() => {
        const el = ref.current;
        if (!el) return;

        updateScrollState();
        el.addEventListener('scroll', updateScrollState);
        window.addEventListener('resize', updateScrollState);

        return () => {
            el.removeEventListener('scroll', updateScrollState);
            window.removeEventListener('resize', updateScrollState);
        };
    }, []);

    const scroll = (dir: 'left' | 'right') => {
        const el = ref.current;
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

            <div className="relative w-full overflow-hidden">
                {canScrollLeft && (
                    <div className="pointer-events-none absolute left-0 top-0 z-20 h-full w-[40px] bg-gradient-to-r from-white/85 via-white/40 to-transparent md:w-[60px]" />
                )}

                <div
                    ref={ref}
                    className="scroll-hide flex w-full gap-2 overflow-x-auto py-1"
                    onWheel={(e) => {
                        if (!ref.current) return;
                        ref.current.scrollLeft += e.deltaY * 0.7;
                    }}
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
                    onClick={() => scroll('right')}
                />
            </div>
        </div>
    );
}
