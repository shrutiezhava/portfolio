'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { useState } from 'react';

const navItems = [
    { name: 'Home', path: '/' },
    { name: 'Blog', path: '/blog' },
    { name: 'Projects', path: '/projects' },
];

export default function Navbar() {
    const pathname = usePathname();
    const [hoveredPath, setHoveredPath] = useState(pathname);

    return (
        <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/80 backdrop-blur-xl supports-[backdrop-filter]:bg-background/60">
            <div className="container flex h-16 items-center justify-between px-6 mx-auto max-w-5xl">
                <Link href="/" className="mr-8 flex items-center space-x-2">
                    <span className="font-display text-xl font-bold tracking-tighter hover:text-accent-blue transition-colors">
                        SHRUTI.LAB
                    </span>
                </Link>
                <nav className="flex items-center gap-1">
                    {navItems.map((item) => {
                        const isActive = item.path === pathname;

                        return (
                            <Link
                                key={item.path}
                                href={item.path}
                                className={cn(
                                    "relative px-4 py-2 text-sm font-medium transition-colors hover:text-ink",
                                    isActive ? "text-ink" : "text-slate"
                                )}
                                onMouseEnter={() => setHoveredPath(item.path)}
                                onMouseLeave={() => setHoveredPath(pathname)}
                            >
                                <span>{item.name}</span>
                                {item.path === hoveredPath && (
                                    <motion.div
                                        className="absolute inset-0 -z-10 rounded-md bg-alt-section"
                                        layoutId="navbar-hover"
                                        transition={{
                                            type: "spring",
                                            stiffness: 350,
                                            damping: 30,
                                        }}
                                    />
                                )}
                                {isActive && (
                                    <motion.div
                                        className="absolute bottom-0 left-0 right-0 h-[2px] bg-accent-blue"
                                        layoutId="navbar-underline"
                                        transition={{
                                            type: "spring",
                                            stiffness: 350,
                                            damping: 30,
                                        }}
                                    />
                                )}
                            </Link>
                        );
                    })}
                </nav>
            </div>
        </header>
    );
}
