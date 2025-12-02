'use client';

interface DatePillProps {
    day: string;
    date: string;
    selected?: boolean;
}

export default function DatePill({ day, date, selected }: DatePillProps) {
    return (
        <button
            type="button"
            className={[
                'flex min-w-[72px] flex-col items-center justify-center rounded-2xl border px-3 py-2 text-sm transition',
                selected
                    ? 'border-[#F598A5] bg-[#FFEFF2] text-[#F14C6E]'
                    : 'border-[#E8EBF4] bg-white text-[#16171B] hover:bg-[#F7F7FC]',
            ].join(' ')}
        >
            <span className="text-[12px]">{day}</span>
            <span className="mt-1 text-[16px] font-medium">{date}</span>
        </button>
    );
}
