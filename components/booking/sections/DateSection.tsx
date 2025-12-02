import ScrollRail from '@/components/ui/ScrollRail';
import DatePill from '@/components/ui/DatePill';

export default function DateSection() {
    return (
        <ScrollRail>
            <DatePill day="Thu" date="30" selected />
            <DatePill day="Fri" date="1" />
            <DatePill day="Sat" date="2" />
            <DatePill day="Sun" date="3" />
            <DatePill day="Mon" date="4" />
            <DatePill day="Tue" date="5" />
        </ScrollRail>
    );
}
