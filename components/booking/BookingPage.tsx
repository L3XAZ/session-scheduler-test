'use client';

import Background from './layout/Background';
import DesktopShell from './layout/DesktopShell';
import MobileShell from './layout/MobileShell';

export default function BookingPage() {
    return (
        <main className="relative min-h-screen overflow-hidden bg-[#E28F11]">
            <Background />
            <DesktopShell />
            <MobileShell />
        </main>
    );
}
