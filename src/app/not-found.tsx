
import Link from 'next/link';

export default function NotFound() {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-background text-ink">
            <h1 className="text-9xl font-display font-black text-slate/20">404</h1>
            <h2 className="text-3xl font-bold mb-4">Signal Lost</h2>
            <p className="text-slate mb-8 text-center max-w-md">
                The requested digital artifact could not be located. It may have been archived or never existed.
            </p>
            <Link
                href="/"
                className="px-6 py-3 bg-ink text-background font-medium rounded-full hover:bg-slate-800 transition-colors"
            >
                Return to Base
            </Link>
        </div>
    );
}
