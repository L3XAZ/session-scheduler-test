'use client';

import { ButtonHTMLAttributes } from 'react';

type PillProps = {
    selected?: boolean;
} & ButtonHTMLAttributes<HTMLButtonElement>;

export default function Pill({ selected, className, ...rest }: PillProps) {
    const base = 'border transition-colors duration-150';

    const stateClass = selected
        ? 'bg-state-selectedBg border-state-selectedBorder text-state-selectedText'
        : 'border-border-subtle bg-white text-text-primary hover:bg-surface-hover hover:border-border-default active:bg-surface-active';

    return (
        <button type="button" className={`${base} ${stateClass} ${className ?? ''}`} {...rest} />
    );
}
