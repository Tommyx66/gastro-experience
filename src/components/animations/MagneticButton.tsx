"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface Props {
  children: ReactNode;
  className?: string;
}

export function MagneticButton({ children, className }: Props) {
  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      transition={{ type: "spring", stiffness: 400, damping: 17 }}
      className={cn(
        "px-6 py-3 rounded-full font-bold transition-all duration-300",
        "bg-brand-ladrillo text-white hover:bg-brand-ladrillo-hover",
        className
      )}
    >
      {children}
    </motion.button>
  );
}