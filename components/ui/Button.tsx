'use client';

import { ButtonHTMLAttributes } from 'react';

type Variant = 'primary' | 'icon';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
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
}: ButtonProps) {
    const base =
        'inline-flex items-center justify-center rounded-full font-poppins text-[16px] font-semibold leading-none tracking-[0.03em] transition';
    const width = fullWidth ? 'w-full' : '';

    const palette =
        variant === 'primary'
            ? disabled
                ? 'bg-[#DADBE8] text-white/80 cursor-not-allowed'
                : 'bg-[#16171B] text-white hover:opacity-90'
            : disabled
              ? 'bg-white text-[#C0C1D1] border border-[#E8EBF4] cursor-not-allowed'
              : 'bg-white text-[#16171B] border border-[#E8EBF4] hover:bg-[#F7F7FC]';

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
