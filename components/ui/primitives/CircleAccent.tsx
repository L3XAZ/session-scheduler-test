'use client';

type Props = {
    size?: number;
    strokeWidth?: number;
    className?: string;
    fillColor?: string;
    strokeColor?: string;
};

export default function CircleAccent({
    size = 301,
    strokeWidth = 4,
    className,
    fillColor = '#AD5707',
    strokeColor = '#FFAD32',
}: Props) {
    const radius = (size - strokeWidth) / 2;

    return (
        <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className={className}>
            <circle
                cx={size / 2}
                cy={size / 2}
                r={radius}
                fill={fillColor}
                stroke={strokeColor}
                strokeWidth={strokeWidth}
            />
        </svg>
    );
}
