"use client";

import { useEffect, useState, type RefObject } from "react";

/** True while a media query matches (false during the server render). */
export function useMediaQuery(query: string) {
  const [matches, setMatches] = useState(false);
  useEffect(() => {
    const list = window.matchMedia(query);
    const update = () => setMatches(list.matches);
    update();
    list.addEventListener("change", update);
    return () => list.removeEventListener("change", update);
  }, [query]);
  return matches;
}

export const prefersReducedMotion = () =>
  typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/**
 * Writes how far an element has travelled through the viewport (0–1) to its
 * --progress CSS variable. 0 when its top reaches `start` (share of the
 * viewport height), 1 when its bottom reaches `end`.
 */
export function useScrollProgress(ref: RefObject<HTMLElement | null>, start = 0.85, end = 0.45) {
  useEffect(() => {
    const element = ref.current;
    if (!element || prefersReducedMotion()) return;
    let frame = 0;
    const update = () => {
      frame = 0;
      const rect = element.getBoundingClientRect();
      const from = window.innerHeight * start;
      const to = window.innerHeight * end;
      const progress = Math.min(1, Math.max(0, (from - rect.top) / (rect.height + from - to)));
      element.style.setProperty("--progress", progress.toFixed(4));
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      element.style.removeProperty("--progress");
    };
  }, [ref, start, end]);
}

/** Becomes true the first time the element scrolls into view, and stays true. */
export function useSeenOnce(ref: RefObject<HTMLElement | null>, rootMargin = "0px 0px -12% 0px") {
  const [seen, setSeen] = useState(false);
  useEffect(() => {
    const element = ref.current;
    if (!element || seen) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setSeen(true);
          observer.disconnect();
        }
      },
      { rootMargin },
    );
    observer.observe(element);
    return () => observer.disconnect();
  }, [ref, rootMargin, seen]);
  return seen;
}
