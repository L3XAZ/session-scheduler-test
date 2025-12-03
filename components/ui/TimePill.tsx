'use client';

import { ButtonHTMLAttributes } from 'react';

type Props = {
    time: string;
    selected?: boolean;
} & ButtonHTMLAttributes<HTMLButtonElement>;

export default function TimePill({ time, selected, className, ...rest }: Props) {
    const base =
        'inline-flex h-[45px] w-[81px] flex-none items-center justify-center whitespace-nowrap rounded-pill border px-4 transition-colors duration-150';

    const state = selected
        ? 'bg-state-selectedBg border-state-selectedBorder text-state-selectedText'
        : 'border-border-subtle bg-white text-text-primary hover:bg-surface-hover hover:border-border-default active:bg-surface-active';

    return (
        <button type="button" className={`${base} ${state} ${className ?? ''}`} {...rest}>
            <span className="text-timePill font-normal">{time}</span>
        </button>
    );
}
