'use client';

import { ButtonHTMLAttributes } from 'react';

type Props = {
    day: string;
    date: string;
    selected?: boolean;
} & ButtonHTMLAttributes<HTMLButtonElement>;

export default function DatePill({ day, date, selected, className, ...rest }: Props) {
    const base =
        'flex h-[64px] w-[64px] flex-none flex-col items-center justify-center rounded-sm border transition-colors duration-150';

    const state = selected
        ? 'bg-state-selectedBg border-state-selectedBorder text-state-selectedText'
        : 'border-border-subtle bg-white text-text-primary hover:bg-surface-hover hover:border-border-default active:bg-surface-active';

    return (
        <button type="button" className={`${base} ${state} ${className ?? ''}`} {...rest}>
            <span className="text-pill font-normal">{day}</span>
            <span className="text-pill font-normal">{date}</span>
        </button>
    );
}
