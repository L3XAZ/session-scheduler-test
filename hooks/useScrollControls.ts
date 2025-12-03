'use client';
import { RefObject, useEffect, useRef, useState } from 'react';

type Direction = 'left' | 'right';
interface ScrollControlsResult {
    containerRef: RefObject<HTMLDivElement | null>;
    atStart: boolean;
    atEnd: boolean;
    scrollByStep: (direction: Direction) => void;
}
const EDGE_OFFSET = 5;
export function useScrollControls(itemWidth: number): ScrollControlsResult {
    const containerRef = useRef<HTMLDivElement | null>(null);
    const [atStart, setAtStart] = useState(true);
    const [atEnd, setAtEnd] = useState(false);
    useEffect(() => {
        const el = containerRef.current;
        if (!el) return;
        const update = () => {
            const maxScrollLeft = el.scrollWidth - el.clientWidth;
            setAtStart(el.scrollLeft <= EDGE_OFFSET);
            setAtEnd(el.scrollLeft >= maxScrollLeft - EDGE_OFFSET);
        };
        update();
        el.addEventListener('scroll', update);
        return () => el.removeEventListener('scroll', update);
    }, []);
    const scrollByStep = (direction: Direction) => {
        const el = containerRef.current;
        if (!el) return;
        const scrollAmount = itemWidth * 2.2;
        el.scrollBy({
            left: direction === 'right' ? scrollAmount : -scrollAmount,
            behavior: 'smooth',
        });
    };
    return { containerRef, atStart, atEnd, scrollByStep };
}
