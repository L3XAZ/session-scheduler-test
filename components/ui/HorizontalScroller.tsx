'use client';

import { useEffect, useRef, useState } from 'react';
import ChevronButton from './ChevronButton';

interface HorizontalScrollerProps {
    children: React.ReactNode;
    scrollAmount?: number; // px
}

export default function HorizontalScroller({
    children,
    scrollAmount = 150,
}: HorizontalScrollerProps) {
    const containerRef = useRef<HTMLDivElement>(null);

    const [isAtStart, setIsAtStart] = useState(true);
    const [isAtEnd, setIsAtEnd] = useState(false);

    // Проверяем положение при прокрутке
    const checkScrollPosition = () => {
        const el = containerRef.current;
        if (!el) return;

        setIsAtStart(el.scrollLeft <= 0);
        setIsAtEnd(el.scrollLeft + el.clientWidth >= el.scrollWidth - 1);
    };

    useEffect(() => {
        checkScrollPosition();
    }, []);

    const scrollLeft = () => {
        containerRef.current?.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
    };

    const scrollRight = () => {
        containerRef.current?.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    };

    return (
        <div className="relative flex w-full items-center gap-2">
            {/* Left button */}
            <div className="relative z-20">
                <ChevronButton direction="left" onClick={scrollLeft} disabled={isAtStart} />
                {!isAtStart && (
                    <div className="pointer-events-none absolute left-full top-0 h-full w-8 bg-gradient-to-r from-white to-transparent" />
                )}
            </div>

            {/* Scroll container */}
            <div
                ref={containerRef}
                onScroll={checkScrollPosition}
                className="scrollbar-none flex-1 overflow-hidden whitespace-nowrap"
            >
                <div className="flex items-center gap-3 px-1">{children}</div>
            </div>

            {/* Right button */}
            <div className="relative z-20">
                <ChevronButton direction="right" onClick={scrollRight} disabled={isAtEnd} />
                {!isAtEnd && (
                    <div className="pointer-events-none absolute right-full top-0 h-full w-8 bg-gradient-to-l from-white to-transparent" />
                )}
            </div>
        </div>
    );
}
