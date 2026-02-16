"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { FileText, Beaker, User, Settings, LogOut } from 'lucide-react';
import { createClient } from '@/lib/supabase/client';
import { useRouter } from 'next/navigation';

const sidebarItems = [
    { name: 'Signals', path: '/admin/posts', icon: FileText },
    { name: 'Experiments', path: '/admin/projects', icon: Beaker },
    { name: 'Profile', path: '/admin/profile', icon: User },
    // { name: 'Settings', path: '/admin/settings', icon: Settings }, // Future
];

export default function AdminSidebar() {
    const pathname = usePathname();
    const router = useRouter();
    const supabase = createClient();

    const handleSignOut = async () => {
        await supabase.auth.signOut();
        router.push('/');
        router.refresh();
    };

    return (
        <aside className="w-64 bg-background border-r border-border h-screen flex flex-col sticky top-0">
            <div className="p-6 border-b border-border">
                <Link href="/admin" className="font-display text-xl font-bold tracking-tighter hover:text-accent-blue transition-colors">
                    MISSION CONTROL
                </Link>
            </div>

            <nav className="flex-1 p-4 space-y-1">
                {sidebarItems.map((item) => {
                    const isActive = pathname.startsWith(item.path);
                    const Icon = item.icon;
                    return (
                        <Link
                            key={item.path}
                            href={item.path}
                            className={cn(
                                "flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors",
                                isActive
                                    ? "bg-ink text-background"
                                    : "text-slate hover:bg-alt-section hover:text-ink"
                            )}
                        >
                            <Icon className="w-4 h-4" />
                            {item.name}
                        </Link>
                    );
                })}
            </nav>

            <div className="p-4 border-t border-border">
                <button
                    onClick={handleSignOut}
                    className="flex w-full items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium text-slate hover:bg-red-500/10 hover:text-red-500 transition-colors"
                >
                    <LogOut className="w-4 h-4" />
                    Disconnect
                </button>
            </div>
        </aside>
    );
}
