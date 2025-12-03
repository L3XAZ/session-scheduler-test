'use client';

import { ButtonHTMLAttributes, memo } from 'react';

import Pill from './Pill';

type TimePillProps = {
  time: string;
  selected?: boolean;
  className?: string;
} & Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'className'>;

function TimePill({ time, selected = false, className, ...rest }: TimePillProps) {
  const layout =
    'inline-flex h-[45px] w-[81px] flex-none items-center justify-center whitespace-nowrap rounded-pill px-4';

  return (
    <Pill selected={selected} className={`${layout} ${className ?? ''}`} {...rest}>
      <span className="text-timePill font-normal">{time}</span>
    </Pill>
  );
}

export default memo(TimePill);
