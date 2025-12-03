'use client';

import Image from 'next/image';

type Props = {
    iconSrc?: string;
    label: string;
};

export default function Chip({ iconSrc, label }: Props) {
    return (
        <div className="inline-flex h-[28px] w-[93px] items-center justify-center gap-2 rounded-pill bg-white/20 px-3 py-1 backdrop-blur-sm">
            {iconSrc && <Image src={iconSrc} alt="" width={16} height={16} />}

            <span className="font-poppins text-[13px] font-normal leading-[20px] text-white">
                {label}
            </span>
        </div>
    );
}
