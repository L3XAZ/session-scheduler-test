'use client';

import { ButtonHTMLAttributes } from 'react';

type PillProps = {
  selected?: boolean;
  className?: string;
  children?: React.ReactNode;
} & Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'className' | 'children'>;

export default function Pill({ selected = false, className, children, ...rest }: PillProps) {
  const base = 'border transition-colors duration-150 flex items-center justify-center select-none';

  const appearance = selected
    ? 'bg-state-selectedBg border-state-selectedBorder text-state-selectedText'
    : 'border-border-subtle bg-white text-text-primary hover:bg-surface-hover hover:border-border-default active:bg-surface-active';

  const composed = `${base} ${appearance} ${className ?? ''}`;

  return (
    <button type="button" className={composed} {...rest}>
      {children}
    </button>
  );
}
