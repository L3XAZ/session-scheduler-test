'use client';

import React, { useLayoutEffect, useRef, useState } from 'react';
import ChevronButton from './ChevronButton';

interface ScrollRailProps {
    children: React.ReactNode;
    itemWidth?: number;
    showArrows?: boolean;
}

export default function ScrollRail({
    children,
    itemWidth = 72,
    showArrows = true,
}: ScrollRailProps) {
    const containerRef = useRef<HTMLDivElement>(null);
    const [atStart, setAtStart] = useState(true);
    const [atEnd, setAtEnd] = useState(false);

    const updateEdges = () => {
        const el = containerRef.current;
        if (!el) return;

        const max = el.scrollWidth - el.clientWidth;

        setAtStart(el.scrollLeft <= 1);
        setAtEnd(el.scrollLeft >= max - 1);
    };

    useLayoutEffect(() => {
        const el = containerRef.current;
        if (!el) return;

        updateEdges();

        el.addEventListener('scroll', updateEdges);
        return () => el.removeEventListener('scroll', updateEdges);
    }, []);

    const scrollByStep = (dir: 'left' | 'right') => {
        const el = containerRef.current;
        if (!el) return;

        const amount = itemWidth * 2.2;
        el.scrollBy({
            left: dir === 'left' ? -amount : amount,
            behavior: 'smooth',
        });
    };

    return (
        <div className="relative flex w-full items-center">
            {!atStart && (
                <div className="pointer-events-none absolute bottom-0 left-0 top-0 z-10 w-[24px] bg-gradient-to-r from-white to-transparent" />
            )}

            {showArrows && (
                <div className="z-20 mr-1 hidden md:flex">
                    <ChevronButton
                        direction="left"
                        disabled={atStart}
                        onClick={() => scrollByStep('left')}
                    />
                </div>
            )}

            <div
                ref={containerRef}
                className="scroll-hide flex w-full gap-3 overflow-y-hidden overflow-x-scroll scroll-smooth py-1 font-poppins"
                onWheel={(e) => {
                    if (!containerRef.current) return;
                    containerRef.current.scrollLeft += e.deltaY * 1.1;
                }}
            >
                {children}
            </div>

            {!atEnd && (
                <div className="pointer-events-none absolute bottom-0 right-0 top-0 z-10 w-[24px] bg-gradient-to-l from-white to-transparent" />
            )}

            {showArrows && (
                <div className="z-20 ml-1 hidden md:flex">
                    <ChevronButton
                        direction="right"
                        disabled={atEnd}
                        onClick={() => scrollByStep('right')}
                    />
                </div>
            )}
        </div>
    );
}
