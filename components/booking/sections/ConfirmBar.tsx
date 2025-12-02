'use client';

import Button from '@/components/ui/Button';

export default function ConfirmBar({ disabled }: { disabled?: boolean }) {
    return (
        <div className="flex w-full justify-center font-poppins">
            <div className="w-full max-w-[370px]">
                <Button
                    variant="primary"
                    fullWidth
                    disabled={disabled}
                    className="tracking-[0.03em]"
                >
                    Confirm
                </Button>
            </div>
        </div>
    );
}
