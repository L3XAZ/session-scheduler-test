'use client';

import Image from 'next/image';
import CircleAccent from '@/components/ui/CircleAccent';
import { STYLIST_IMG } from '../constants';

export default function BookingCardHeader() {
    return (
        <div className="mx-auto flex w-fit items-center gap-5">
            <div className="relative hidden h-[100px] w-[100px] overflow-hidden rounded-full md:block">
                <div className="absolute inset-0 bg-brand-primary" />
                <CircleAccent
                    size={140}
                    strokeWidth={3}
                    className="absolute bottom-[-38px] left-[-110px]"
                />
                <Image
                    src={STYLIST_IMG}
                    alt="Stylist"
                    width={120}
                    height={120}
                    className="absolute inset-0 left-[-28px] h-full w-full scale-[1.6] object-cover object-[68%_28%]"
                />
            </div>

            <div className="flex flex-col justify-center">
                <h2 className="font-kaisei text-title3 text-text-primary">Book a Session</h2>

                <p className="mt-1 max-w-[300px] text-paragraph text-text-secondary">
                    Choose a date and time that is convenient for you to e-meet your stylist
                </p>
            </div>
        </div>
    );
}
