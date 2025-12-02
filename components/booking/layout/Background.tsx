'use client';

export default function Background() {
    return (
        <>
            <div
                aria-hidden="true"
                className="pointer-events-none absolute right-[-20%] top-[-20%] h-[500px] w-[500px] rounded-full bg-[#AA580D] blur-[200px]"
            />
            <div
                aria-hidden="true"
                className="pointer-events-none absolute bottom-[-25%] left-[-25%] h-[550px] w-[550px] rounded-full bg-[#AA580D] blur-[200px]"
            />
        </>
    );
}
