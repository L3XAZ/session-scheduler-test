'use client';

import Image from 'next/image';
import CircleAccent from '@/components/ui/primitives/CircleAccent';
import Chip from '@/components/ui/primitives/Chip';
import { CLOCK_ICON, STYLIST_IMG } from '../bookingConstants';

export default function BookingHeaderMobile() {
    return (
        <header className="mobile-header-condensed relative h-[486px] overflow-hidden px-5 pt-10 font-poppins text-white">
            <div className="absolute right-[-10px] top-[55px] z-10">
                <div className="relative h-[320px] w-[235px]">
                    <CircleAccent
                        size={301}
                        strokeWidth={4}
                        className="absolute left-[20px] top-[45px]"
                    />

                    <Image
                        src={STYLIST_IMG}
                        alt="Stylist"
                        width={235}
                        height={320}
                        className="absolute right-0 top-0 h-[320px] w-[235px] origin-bottom-right scale-[1.2] object-cover"
                        priority
                    />
                </div>
            </div>

            <div className="absolute left-5 top-[122px] z-20 flex w-[259px] flex-col gap-6">
                <div>
                    <p className="text-[27px] font-medium leading-none">Cool session</p>
                    <p className="text-[16px] leading-[24px] text-white/80">Additional type</p>
                </div>

                <Chip iconSrc={CLOCK_ICON} label="30 min" />
            </div>
        </header>
    );
}
