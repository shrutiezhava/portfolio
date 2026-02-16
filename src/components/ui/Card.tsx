"use client";

import { motion, HTMLMotionProps } from "framer-motion";
import { cn } from "@/lib/utils";
import React from "react";

interface CardProps extends HTMLMotionProps<"div"> {
    variant?: "solid" | "bordered";
}

const variants = {
    solid: "bg-alt-section border border-transparent hover:shadow-lg shadow-sm w-full",
    bordered: "bg-background border-2 border-slate/20 hover:border-ink hover:shadow-xl w-full",
};

export const Card = React.forwardRef<HTMLDivElement, CardProps>(
    ({ className, variant = "bordered", children, ...props }, ref) => {
        return (
            <motion.div
                ref={ref}
                whileHover={{ y: -5, scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className={cn("rounded-2xl p-6 overflow-hidden relative group", variants[variant], className)}
                {...props}
            >
                {children}
            </motion.div>
        );
    }
);
Card.displayName = "Card";
