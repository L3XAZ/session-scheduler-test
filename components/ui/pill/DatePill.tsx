'use client';

import { ButtonHTMLAttributes } from 'react';
import Pill from './Pill';

type Props = {
    day: string;
    date: string;
    selected?: boolean;
} & ButtonHTMLAttributes<HTMLButtonElement>;

export default function DatePill({ day, date, selected, className, ...rest }: Props) {
    const layout =
        'flex h-[64px] w-[64px] flex-none flex-col items-center justify-center rounded-sm';

    return (
        <Pill selected={selected} className={`${layout} ${className ?? ''}`} {...rest}>
            <span className="text-pill font-normal">{day}</span>
            <span className="text-pill font-normal">{date}</span>
        </Pill>
    );
}
