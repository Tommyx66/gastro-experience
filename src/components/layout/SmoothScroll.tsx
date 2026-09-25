"use client";

import {
  useEffect,
} from "react";

import Lenis from "lenis";

export default function SmoothScroll({
  children,
}: {
  children: React.ReactNode;
}) {
  useEffect(() => {
    const prefersReducedMotion =
      window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;

    if (
      prefersReducedMotion
    ) {
      return;
    }

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) =>
        Math.min(
          1,
          1.001 -
            Math.pow(
              2,
              -10 * t
            )
        ),
      orientation: "vertical",
      gestureOrientation:
        "vertical",
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,

      prevent: (
        node
      ) =>
        Boolean(
          node.closest?.(
            "[data-lenis-prevent]"
          )
        ),
    });

    (
      window as unknown as Window & {
  lenis?: Lenis;
}
    ).lenis = lenis;

    let frameId = 0;

    const raf = (
      time: number
    ) => {
      lenis.raf(time);
      frameId =
        requestAnimationFrame(
          raf
        );
    };

    frameId =
      requestAnimationFrame(
        raf
      );

    return () => {
      cancelAnimationFrame(
        frameId
      );

      lenis.destroy();

      Reflect.deleteProperty(window, "lenis");
    };
  }, []);

  return (
    <>
      {children}
    </>
  );
}