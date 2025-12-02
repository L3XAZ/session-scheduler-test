'use client';

interface FaderOverlayProps {
    side: 'left' | 'right';
    visible: boolean;
}

export default function FaderOverlay({ side, visible }: FaderOverlayProps) {
    if (!visible) return null;

    return (
        <div
            className={[
                'pointer-events-none absolute top-0 hidden h-full w-10 md:block',
                side === 'left'
                    ? 'left-0 bg-gradient-to-r from-white to-transparent'
                    : 'right-0 bg-gradient-to-l from-white to-transparent',
            ].join(' ')}
        />
    );
}
