
export default function Loading() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-background">
            <div className="flex flex-col items-center gap-4">
                <div className="w-12 h-12 border-4 border-slate/20 border-t-accent-lime rounded-full animate-spin"></div>
                <p className="font-mono text-sm text-slate animate-pulse">
                    INITIALIZING...
                </p>
            </div>
        </div>
    );
}
