'use client';

import { ButtonHTMLAttributes } from 'react';

type Variant = 'primary' | 'icon';

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: Variant;
    fullWidth?: boolean;
}

export default function Button({
    variant = 'primary',
    fullWidth,
    disabled,
    className,
    children,
    ...rest
}: Props) {
    const base =
        'inline-flex items-center justify-center rounded-pill font-poppins text-[16px] font-semibold leading-none tracking-[0.03em] transition';

    const width = fullWidth ? 'w-full' : '';

    const palette =
        variant === 'primary'
            ? disabled
                ? 'bg-[#DADBE8] text-white/80 cursor-not-allowed'
                : 'bg-text-primary text-white hover:opacity-90'
            : disabled
              ? 'bg-white text-text-muted border border-border-subtle cursor-not-allowed'
              : 'bg-white text-text-primary border border-border-subtle hover:bg-surface-subtle';

    const padding = variant === 'primary' ? 'h-[60px] px-8' : 'h-8 w-8 p-0';

    return (
        <button
            disabled={disabled}
            className={`${base} ${width} ${palette} ${padding} ${className ?? ''}`}
            {...rest}
        >
            {children}
        </button>
    );
}
