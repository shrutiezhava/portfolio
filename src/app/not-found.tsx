import Link from 'next/link';
import { Button } from '@/components/ui/Button';

export default function NotFound() {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-background text-ink p-6 text-center">
            <h1 className="text-9xl font-display font-black tracking-tighter mb-4 text-slate/20">404</h1>
            <h2 className="text-4xl font-bold mb-6">SIGNAL LOST.</h2>
            <p className="text-slate mb-8 max-w-md">
                The frequency you are looking for does not exist or has been scrambled.
            </p>
            <Link href="/">
                <Button>Re-establish Connection</Button>
            </Link>
        </div>
    );
}
