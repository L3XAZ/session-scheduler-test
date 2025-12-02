'use client';

export default function Backdrop() {
    return (
        <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
            <div className="hidden md:block">
                <div className="absolute right-[-290px] top-[-380px] h-[720px] w-[720px] rounded-full bg-brand-secondary blur-[180px]" />
                <div className="absolute bottom-[-440px] left-[-270px] h-[880px] w-[880px] rounded-full bg-brand-secondary blur-[190px]" />
            </div>

            <div className="md:hidden">
                <div className="absolute right-[-90px] top-[-200px] h-[320px] w-[320px] rounded-full bg-brand-dark blur-[100px]" />
                <div className="absolute left-[-210px] top-[140px] h-[473px] w-[473px] rounded-full bg-brand-dark blur-[110px]" />
            </div>
        </div>
    );
}
