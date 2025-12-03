'use client';

import Button from '@/components/ui/Button';

type ConfirmBarProps = {
    disabled?: boolean;
    onConfirm?: () => void;
};

export default function ConfirmBar({ disabled, onConfirm }: ConfirmBarProps) {
    return (
        <div className="flex w-full justify-center">
            <div className="w-full max-w-[370px]">
                <Button variant="primary" fullWidth disabled={disabled} onClick={onConfirm}>
                    Confirm
                </Button>
            </div>
        </div>
    );
}
