'use client';

import Button from '@/components/ui/Button';

export default function ConfirmBar({ disabled }: { disabled?: boolean }) {
    return (
        <div className="flex w-full justify-center">
            <div className="w-full max-w-[370px]">
                <Button variant="primary" fullWidth disabled={disabled}>
                    Confirm
                </Button>
            </div>
        </div>
    );
}
