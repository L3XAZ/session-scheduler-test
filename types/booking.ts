export type BookingDate = {
    id: string;
    date: Date;
    dayLabel: string;
    dateLabel: string;
    monthLabel: string;
    isToday: boolean;
};

export type TimeSlot = {
    id: string;
    time: Date;
};

export type BookingSelection = {
    date: Date | null;
    time: Date | null;
};

export enum TimeFormat {
    TWELVE_HOUR = '12h',
    TWENTY_FOUR_HOUR = '24h',
}
