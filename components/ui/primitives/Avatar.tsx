'use client';

import CircleAccent from './CircleAccent';

type Props = {
    size?: number;
    src: string;
    alt?: string;
};

export default function Avatar({ size = 120, src, alt = 'Avatar' }: Props) {
    const px = `${size}px`;

    return (
        <div
            style={{ width: px, height: px }}
            className="relative overflow-hidden rounded-full bg-brand-primary"
        >
            <CircleAccent size={size * 1.6} className="absolute -left-1/2 bottom-[-15%]" />

            <img src={src} alt={alt} className="relative z-10 h-full w-full object-cover" />
        </div>
    );
}
