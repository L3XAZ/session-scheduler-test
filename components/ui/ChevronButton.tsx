'use client';

import Image from 'next/image';

interface ChevronButtonProps {
    direction?: 'left' | 'right';
    onClick?: () => void;
    disabled?: boolean;
}

export default function ChevronButton({
    direction = 'right',
    onClick,
    disabled,
}: ChevronButtonProps) {
    return (
        <button
            onClick={onClick}
            disabled={disabled}
            className={[
                'flex h-8 w-8 items-center justify-center rounded-full bg-white transition',
                disabled ? 'cursor-not-allowed opacity-30' : 'hover:opacity-90',
            ].join(' ')}
        >
            <Image
                src="/icons/chevron-right.png"
                alt="chevron"
                width={16}
                height={16}
                className={direction === 'left' ? 'rotate-180' : ''}
            />
        </button>
    );
}
