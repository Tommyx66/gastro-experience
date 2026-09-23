"use client";

import { useEffect, useState } from "react";

export function useLenis() {
  const [lenisInstance, setLenisInstance] = useState<any>(null);

  useEffect(() => {
    const lenis = (window as any).lenis;
    if (lenis) {
      setLenisInstance(lenis);
    }
  }, []);

  const scrollTo = (
    target: number | string | HTMLElement,
    options: { offset?: number; duration?: number } = {}
  ) => {
    const lenis = (window as any).lenis;
    if (lenis && typeof lenis.scrollTo === "function") {
      lenis.scrollTo(target, { duration: 1.1, ...options });
    } else {
      if (typeof target === "number") {
        window.scrollTo({ top: target, behavior: "smooth" });
      } else if (typeof target === "string") {
        const cleanId = target.replace(/^#/, "");
        const el = document.getElementById(cleanId);
        if (el) {
          const top = el.getBoundingClientRect().top + window.scrollY + (options.offset || 0);
          window.scrollTo({ top, behavior: "smooth" });
        }
      } else if (target instanceof HTMLElement) {
        const top = target.getBoundingClientRect().top + window.scrollY + (options.offset || 0);
        window.scrollTo({ top, behavior: "smooth" });
      }
    }
  };

  return { lenis: lenisInstance, scrollTo };
}