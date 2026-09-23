"use client";

import {
  motion,
  type HTMLMotionProps,
} from "framer-motion";

import { cn } from "@/lib/utils";

type AnimationType =
  | "fadeIn"
  | "fadeInUp"
  | "rollIn"
  | "whipIn"
  | "popIn"
  | "shiftInUp"
  | "whipInUp"
  | "calmInUp";

interface TextAnimateProps
  extends Omit<
    HTMLMotionProps<"div">,
    "children"
  > {
  text: string;
  type?: AnimationType;
  delay?: number;
}

const animationMap = {
  fadeIn: {
    initial: {
      opacity: 0,
    },
    animate: {
      opacity: 1,
    },
  },

  fadeInUp: {
    initial: {
      opacity: 0,
      y: 18,
    },
    animate: {
      opacity: 1,
      y: 0,
    },
  },

  rollIn: {
    initial: {
      opacity: 0,
      rotateX: -90,
      y: 20,
    },
    animate: {
      opacity: 1,
      rotateX: 0,
      y: 0,
    },
  },

  whipIn: {
    initial: {
      opacity: 0,
      x: -28,
      rotate: -2,
    },
    animate: {
      opacity: 1,
      x: 0,
      rotate: 0,
    },
  },

  popIn: {
    initial: {
      opacity: 0,
      scale: 0.92,
    },
    animate: {
      opacity: 1,
      scale: 1,
    },
  },

  shiftInUp: {
    initial: {
      opacity: 0,
      y: 32,
      filter: "blur(7px)",
    },
    animate: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
    },
  },

  whipInUp: {
    initial: {
      opacity: 0,
      x: -20,
      y: 24,
      rotate: -1.5,
    },
    animate: {
      opacity: 1,
      x: 0,
      y: 0,
      rotate: 0,
    },
  },

  calmInUp: {
    initial: {
      opacity: 0,
      y: 14,
      filter: "blur(4px)",
    },
    animate: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
    },
  },
} as const;

export default function TextAnimate({
  text,
  type = "fadeInUp",
  delay = 0,
  className,
  ...props
}: TextAnimateProps) {
  const animation =
    animationMap[type];

  return (
    <motion.div
      initial={animation.initial}
      whileInView={animation.animate}
      viewport={{
        once: true,
        amount: 0.25,
      }}
      transition={{
        duration: 0.7,
        delay,
        ease: [0.22, 1, 0.36, 1],
      }}
      className={cn(
        "will-change-transform",
        className
      )}
      {...props}
    >
      {text}
    </motion.div>
  );
}