import { cn } from "@/lib/utils";
import { motion, HTMLMotionProps } from "framer-motion";

interface ButtonProps extends HTMLMotionProps<"button"> {
  variant?: "primary" | "outline";
}

export function Button({ className, variant = "primary", ...props }: ButtonProps) {
  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={cn(
        "px-8 py-3 rounded-full font-bold transition-colors",
        variant === "primary" && "bg-brand-ladrillo text-white hover:bg-brand-ladrillo-hover",
        variant === "outline" && "border border-white/10 text-white hover:bg-white/5",
        className
      )}
      {...props}
    />
  );
}