'use client';

import { ButtonHTMLAttributes, memo } from 'react';
import Pill from './Pill';

type DatePillProps = {
    day: string;
    date: string;
    selected?: boolean;
    className?: string;
} & Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'className'>;

function DatePill({ day, date, selected = false, className, ...rest }: DatePillProps) {
    const layout =
        'flex h-[64px] w-[64px] flex-none flex-col items-center justify-center rounded-sm';

    return (
        <Pill selected={selected} className={`${layout} ${className ?? ''}`} {...rest}>
            <span className="text-pill font-normal">{day}</span>
            <span className="text-pill font-normal">{date}</span>
        </Pill>
    );
}

export default memo(DatePill);
