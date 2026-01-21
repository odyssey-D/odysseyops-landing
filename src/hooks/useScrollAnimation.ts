"use client";

import { useEffect, useRef, useState } from "react";

type Options = {
  threshold?: number;
  rootMargin?: string;
  once?: boolean; // default true: reveal once and never toggle back
};

export function useScrollAnimation<T extends HTMLElement = HTMLElement>(
  options: Options = {}
) {
  const { threshold = 0.15, rootMargin = "0px 0px -10% 0px", once = true } =
    options;

  const ref = useRef<T | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Fallback for environments where IntersectionObserver is unavailable/unreliable
    if (typeof window === "undefined" || typeof IntersectionObserver === "undefined") {
      setIsVisible(true);
      return;
    }

    let cancelled = false;

    const reveal = () => {
      if (cancelled) return;
      // rAF helps Safari repaint correctly after intersection changes
      requestAnimationFrame(() => {
        if (!cancelled) setIsVisible(true);
      });
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry) return;

        if (entry.isIntersecting) {
          reveal();
          if (once) observer.disconnect();
        } else if (!once) {
          // Only toggle back if you explicitly want it
          setIsVisible(false);
        }
      },
      { threshold, rootMargin }
    );

    observer.observe(el);

    return () => {
      cancelled = true;
      observer.disconnect();
    };
  }, [threshold, rootMargin, once]);

  return { ref, isVisible };
}
