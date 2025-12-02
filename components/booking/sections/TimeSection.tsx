import ScrollRail from '@/components/ui/ScrollRail';
import TimePill from '@/components/ui/TimePill';

export default function TimeSection() {
    return (
        <ScrollRail>
            <TimePill time="1:00 PM" />
            <TimePill time="1:15 PM" selected />
            <TimePill time="1:30 PM" />
            <TimePill time="1:45 PM" />
            <TimePill time="2:00 PM" />
            <TimePill time="1:30 PM" />
            <TimePill time="1:45 PM" />
            <TimePill time="2:00 PM" />
            <TimePill time="1:30 PM" />
            <TimePill time="1:45 PM" />
            <TimePill time="2:00 PM" />
        </ScrollRail>
    );
}
