'use client';

import DesktopShell from './layout/DesktopShell';
import MobileShell from './layout/MobileShell';
import Backdrop from '@/components/booking/layout/Backdrop';

export default function BookingPage() {
    return (
        <main className="relative min-h-screen overflow-hidden bg-brand-primary">
            <Backdrop />
            <DesktopShell />
            <MobileShell />
        </main>
    );
}
