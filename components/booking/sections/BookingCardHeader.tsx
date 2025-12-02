'use client';

import Image from 'next/image';
import CircleAccent from '@/components/ui/CircleAccent';
import { STYLIST_IMG } from '../constants';

export default function BookingCardHeader() {
    return (
        <div className="flex items-start gap-4">
            <div className="relative hidden h-[120px] w-[120px] overflow-hidden rounded-full md:block">
                <div className="absolute inset-0 bg-[#E28F11]" />

                <CircleAccent
                    size={160}
                    strokeWidth={4}
                    className="absolute bottom-[-45px] left-[-130px]"
                />

                <Image
                    src={STYLIST_IMG}
                    alt="Stylist"
                    width={150}
                    height={150}
                    className="absolute inset-0 left-[-35px] h-full w-full scale-[1.8] object-cover object-[68%_28%]"
                />
            </div>

            <div className="flex-1">
                <h2 className="text-xl font-semibold text-[#16171B] md:text-[28px] md:leading-[41px]">
                    Book a Session
                </h2>

                <p className="mt-1 text-sm leading-[24px] text-[#8F91A1] md:max-w-[309px] md:text-[14px] md:leading-[21px]">
                    Choose a date and time that is convenient for you to e-meet your stylist
                </p>
            </div>
        </div>
    );
}
