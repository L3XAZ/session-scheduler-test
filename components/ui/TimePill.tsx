'use client';

type Props = {
    time: string;
    selected?: boolean;
};

export default function TimePill({ time, selected }: Props) {
    return (
        <button
            className={[
                'inline-flex h-[45px] w-[81px] flex-none items-center justify-center whitespace-nowrap rounded-pill border px-4',
                selected
                    ? 'bg-state-selectedBg border-state-selectedBorder text-state-selectedText'
                    : 'border-border-subtle bg-white text-text-primary',
            ].join(' ')}
        >
            <span className="text-timePill font-normal">{time}</span>
        </button>
    );
}
