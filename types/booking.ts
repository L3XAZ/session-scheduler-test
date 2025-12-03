export type ISODateString = string;
export type TimeLabel = string;

export type BookingDate = {
  id: ISODateString;
  date: Date;
  dayLabel: string;
  dateLabel: string;
  monthLabel: string;
  isToday: boolean;
};

export type TimeSlot = {
  id: TimeLabel;
  time: Date;
};
