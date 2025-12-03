export type BookingDate = {
    date: Date;
    dayLabel: string;
    dateLabel: string;
    monthLabel: string; // добавили
    isToday: boolean;
};

export type TimeSlot = {
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
