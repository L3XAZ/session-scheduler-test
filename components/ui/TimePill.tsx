'use client';

interface TimePillProps {
    time: string;
    selected?: boolean;
}

export default function TimePill({ time, selected }: TimePillProps) {
    return (
        <button
            type="button"
            className={[
                'flex h-10 min-w-[88px] items-center justify-center rounded-full border px-4 text-sm transition',
                selected
                    ? 'border-[#F598A5] bg-[#FFEFF2] text-[#F14C6E]'
                    : 'border-[#E8EBF4] bg-white text-[#16171B] hover:bg-[#F7F7FC]',
            ].join(' ')}
        >
            {time}
        </button>
    );
}
