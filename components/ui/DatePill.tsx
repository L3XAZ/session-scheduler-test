'use client';

type Props = {
    day: string;
    date: string;
    selected?: boolean;
};

export default function DatePill({ day, date, selected }: Props) {
    return (
        <button
            className={[
                'flex h-[64px] w-[64px] flex-none flex-col items-center justify-center rounded-[8px] border',
                selected
                    ? 'bg-state-selectedBg border-state-selectedBorder text-state-selectedText'
                    : 'border-border-subtle bg-white text-text-primary',
            ].join(' ')}
        >
            <span className="text-pill font-normal">{day}</span>
            <span className="text-pill font-normal">{date}</span>
        </button>
    );
}
