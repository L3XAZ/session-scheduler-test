'use client';

import Image from 'next/image';

type Props = {
  direction: 'left' | 'right';
  onClick: () => void;
  disabled?: boolean;
};

export default function ChevronButton({ direction, onClick, disabled }: Props) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={[
        'flex items-center justify-center',
        'h-8 w-8 rounded-full',
        'select-none transition-opacity',
        disabled ? 'cursor-default opacity-30' : 'opacity-80 hover:opacity-100',
      ].join(' ')}
    >
      <Image
        src="/icons/chevron-right.svg"
        alt=""
        width={10}
        height={18}
        className={direction === 'left' ? 'pointer-events-none rotate-180' : 'pointer-events-none'}
      />
    </button>
  );
}
