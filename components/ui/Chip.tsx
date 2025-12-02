'use client';

import Image from 'next/image';

interface ChipProps {
    iconSrc?: string;
    label: string;
}

export default function Chip({ iconSrc, label }: ChipProps) {
    return (
        <div className="inline-flex h-[28px] w-[93px] items-center justify-center gap-2 rounded-full bg-white/20 px-[12px] py-[4px] backdrop-blur-sm">
            {iconSrc && <Image src={iconSrc} alt={iconSrc} width={16} height={16} />}

            <span className="font-poppins text-[13px] font-normal leading-[20px] text-white">
                {label}
            </span>
        </div>
    );
}
