'use client';

import { ButtonHTMLAttributes } from 'react';
import Pill from './Pill';

type Props = {
    time: string;
    selected?: boolean;
} & ButtonHTMLAttributes<HTMLButtonElement>;

export default function TimePill({ time, selected, className, ...rest }: Props) {
    const layout =
        'inline-flex h-[45px] w-[81px] flex-none items-center justify-center whitespace-nowrap rounded-pill px-4';

    return (
        <Pill selected={selected} className={`${layout} ${className ?? ''}`} {...rest}>
            <span className="text-timePill font-normal">{time}</span>
        </Pill>
    );
}
