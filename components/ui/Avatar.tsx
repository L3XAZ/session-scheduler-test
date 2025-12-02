'use client';

import type React from 'react';
import CircleAccent from './CircleAccent';

interface AvatarProps {
    size?: number;
    src: string;
    alt?: string;
}

const Avatar: React.FC<AvatarProps> = ({ size = 120, src, alt = 'Avatar' }) => {
    const px = `${size}px`;

    return (
        <div
            style={{ width: px, height: px }}
            className="relative overflow-hidden rounded-full bg-[#E28F11]"
        >
            {/* Акцент-круг, торчит только уголок слева снизу */}
            <CircleAccent size={size * 1.6} className="absolute -left-1/2 bottom-[-15%]" />
            <img src={src} alt={alt} className="relative z-10 h-full w-full object-cover" />
        </div>
    );
};

export default Avatar;
