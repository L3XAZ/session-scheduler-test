'use client';

import { RefObject, useCallback, useEffect, useRef, useState } from 'react';

export type RailLayoutState = {
    scrollLeft: number;
    containerWidth: number;
    childrenRects: { x: number; width: number }[];
};

type UseScrollRailResult = {
    containerRef: RefObject<HTMLDivElement>;
    layout: RailLayoutState | null;
    canScrollLeft: boolean;
    canScrollRight: boolean;
    scrollBy: (offset: number) => void;
    scrollToChild: (index: number) => void;
};

export function useScrollRail(): UseScrollRailResult {
    const containerRef = useRef<HTMLDivElement>(null!);
    const [layout, setLayout] = useState<RailLayoutState | null>(null);
    const [canScrollLeft, setCanScrollLeft] = useState(false);
    const [canScrollRight, setCanScrollRight] = useState(false);

    const updateLayout = useCallback(() => {
        const container = containerRef.current;
        if (!container) return;

        const maxScrollLeft = container.scrollWidth - container.clientWidth;
        const nextCanScrollLeft = container.scrollLeft > 1;
        const nextCanScrollRight = container.scrollLeft < maxScrollLeft - 1;

        setCanScrollLeft(nextCanScrollLeft);
        setCanScrollRight(nextCanScrollRight);

        const containerRect = container.getBoundingClientRect();
        const childrenRects = Array.from(container.children).map((child) => {
            const rect = (child as HTMLElement).getBoundingClientRect();
            return {
                x: rect.left - containerRect.left + container.scrollLeft,
                width: rect.width,
            };
        });

        const nextLayout: RailLayoutState = {
            scrollLeft: container.scrollLeft,
            containerWidth: container.clientWidth,
            childrenRects,
        };

        setLayout(nextLayout);
    }, []);

    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        updateLayout();

        const handleScroll = () => {
            updateLayout();
        };

        container.addEventListener('scroll', handleScroll, { passive: true });
        window.addEventListener('resize', updateLayout);

        let resizeObserver: ResizeObserver | null = null;
        if (typeof ResizeObserver !== 'undefined') {
            resizeObserver = new ResizeObserver(() => {
                updateLayout();
            });
            resizeObserver.observe(container);
            Array.from(container.children).forEach((child) => {
                resizeObserver?.observe(child as Element);
            });
        }

        return () => {
            container.removeEventListener('scroll', handleScroll);
            window.removeEventListener('resize', updateLayout);
            resizeObserver?.disconnect();
        };
    }, [updateLayout]);

    const scrollBy = useCallback((offset: number) => {
        const container = containerRef.current;
        if (!container) return;

        container.scrollBy({
            left: offset,
            behavior: 'smooth',
        });
    }, []);

    const scrollToChild = useCallback((index: number) => {
        const container = containerRef.current;
        if (!container) return;

        const child = container.children[index] as HTMLElement | undefined;
        if (!child) return;

        const rect = child.getBoundingClientRect();
        const containerRect = container.getBoundingClientRect();

        const offsetLeft = rect.left - containerRect.left;
        const offsetRight = offsetLeft + rect.width;

        if (offsetLeft < 0) {
            container.scrollBy({ left: offsetLeft - 8, behavior: 'smooth' });
            return;
        }

        if (offsetRight > container.clientWidth) {
            const diff = offsetRight - container.clientWidth;
            container.scrollBy({ left: diff + 8, behavior: 'smooth' });
        }
    }, []);

    return {
        containerRef,
        layout,
        canScrollLeft,
        canScrollRight,
        scrollBy,
        scrollToChild,
    };
}
