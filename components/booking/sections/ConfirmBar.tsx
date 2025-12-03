'use client';

import Button from '@/components/ui/buttons/Button';

type ConfirmBarProps = {
    enabled: boolean;
    onConfirm?: () => void;
};

export default function ConfirmBar({ enabled, onConfirm }: ConfirmBarProps) {
    return (
        <div className="flex w-full justify-center">
            <div className="w-full max-w-[370px]">
                <Button variant="primary" fullWidth disabled={!enabled} onClick={onConfirm}>
                    Confirm
                </Button>
            </div>
        </div>
    );
}
