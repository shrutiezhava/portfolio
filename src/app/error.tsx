
'use client';

import { useEffect } from 'react';
import { Button } from '@/components/ui/Button';

export default function Error({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    useEffect(() => {
        console.error(error);
    }, [error]);

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-background text-ink">
            <h2 className="text-3xl font-display font-bold mb-4">System Malfunction</h2>
            <p className="text-slate mb-8 max-w-md text-center">
                A critical error occurred while processing your request. The system has logged this incident.
            </p>
            <div className="flex gap-4">
                <Button onClick={() => reset()}>
                    Retry Sequence
                </Button>
                <Button variant="outline" onClick={() => window.location.href = '/'}>
                    Emergency Exit
                </Button>
            </div>
        </div>
    );
}
