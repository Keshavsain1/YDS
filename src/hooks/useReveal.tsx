import { useEffect, useRef, useState } from "react";

/**
 * A refined useReveal hook to trigger element visibility-based animations.
 * Features:
 *  - supports reduced motion preference
 *  - optional delay for staggered effects
 *  - can be configured to trigger once or multiple times
 */
export default function useReveal<T extends HTMLElement>(
  options?: IntersectionObserverInit & { delay?: number; once?: boolean }
) {
  const ref = useRef<T | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    // Skip animation if user prefers reduced motion
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReducedMotion) {
      setVisible(true);
      return;
    }

    const { delay = 0, once = true, ...observerOptions } = options || {};

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            if (delay > 0) {
              const timer = setTimeout(() => setVisible(true), delay);
              return () => clearTimeout(timer);
            } else {
              setVisible(true);
            }
            if (once) observer.unobserve(entry.target);
          } else if (!once) {
            setVisible(false);
          }
        });
      },
      { threshold: 0.15, ...observerOptions }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [options]);

  return { ref, visible };
}
