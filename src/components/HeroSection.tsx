'use client';

import { motion } from 'framer-motion';
import { ArrowDown } from 'lucide-react';

export function HeroSection() {
    return (
        <section className="relative h-[90vh] flex flex-col items-center justify-center text-center overflow-hidden">
            <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_50%_50%,rgba(59,130,246,0.1),transparent_50%)]" />

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="max-w-4xl px-4"
            >
                <motion.span
                    className="inline-block mb-4 text-sm font-mono tracking-widest text-accent-blue uppercase"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.2 }}
                >
                    Status: Operational
                </motion.span>

                <h1 className="text-6xl md:text-8xl font-display font-black tracking-tighter mb-6 leading-tight">
                    DIGITAL <span className="text-slate/20">LAB</span><br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-ink to-slate">WITH ATTITUDE.</span>
                </h1>

                <p className="text-xl md:text-2xl text-slate max-w-2xl mx-auto font-light leading-relaxed">
                    Not a corporate portfolio. This is where I break code, design systems, and occasionally production.
                </p>

                <motion.div
                    className="mt-12 flex gap-4 justify-center"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.6 }}
                >
                    <a href="#projects" className="px-8 py-4 bg-ink text-background font-bold tracking-tight hover:scale-105 transition-transform rounded-full">
                        View Experiments
                    </a>
                    <a href="/blog" className="px-8 py-4 border border-slate/20 hover:border-ink hover:bg-slate/5 transition-all rounded-full font-medium">
                        Read Logs
                    </a>
                </motion.div>
            </motion.div>

            <motion.div
                className="absolute bottom-10 animate-bounce text-slate/40"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1, duration: 1 }}
            >
                <ArrowDown size={32} />
            </motion.div>
        </section>
    );
}
