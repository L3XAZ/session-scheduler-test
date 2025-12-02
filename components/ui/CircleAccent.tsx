'use client';

interface CircleAccentProps {
    size?: number;
    strokeWidth?: number;
    className?: string;
}

export default function CircleAccent({
    size = 301,
    strokeWidth = 4,
    className,
}: CircleAccentProps) {
    const radius = (size - strokeWidth) / 2;

    return (
        <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className={className}>
            <circle
                cx={size / 2}
                cy={size / 2}
                r={radius}
                fill="#AD5707"
                stroke="#FFAD32"
                strokeWidth={strokeWidth}
            />
        </svg>
    );
}
