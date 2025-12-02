export function ScrollFadeLeft({ show }: { show: boolean }) {
    if (!show) return null;
    return (
        <div className="pointer-events-none absolute left-0 top-0 z-10 h-full w-10 bg-gradient-to-r from-white to-transparent" />
    );
}

export function ScrollFadeRight({ show }: { show: boolean }) {
    if (!show) return null;
    return (
        <div className="pointer-events-none absolute right-0 top-0 z-10 h-full w-10 bg-gradient-to-l from-white to-transparent" />
    );
}
