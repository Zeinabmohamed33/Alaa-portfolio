"use client";

import { Fragment, useEffect, useRef, useState } from "react";

import { prefersReducedMotion } from "./hooks";
import { vars } from "./style";

type Level = "h2" | "h3";

/**
 * A heading that types itself in like reel captions: word by word, each word
 * lighting up as it lands. Headings already on screen at load stay still, and
 * reduced motion turns the effect off.
 */
export function Caption({ text, as: Tag = "h2", id, className }: { text: string; as?: Level; id?: string; className?: string }) {
  const ref = useRef<HTMLHeadingElement>(null);
  const [state, setState] = useState<"still" | "waiting" | "playing">("still");

  useEffect(() => {
    const element = ref.current;
    if (!element || prefersReducedMotion()) return;
    if (element.getBoundingClientRect().top < window.innerHeight * 0.92) return;
    setState("waiting");
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setState("playing");
          observer.disconnect();
        }
      },
      { rootMargin: "0px 0px -12% 0px" },
    );
    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  const words = text.split(" ");

  return (
    <Tag ref={ref} id={id} className={["caption", className].filter(Boolean).join(" ")} data-state={state}>
      <span className="sr-only">{text}</span>
      <span aria-hidden="true">
        {words.map((word, i) => (
          <Fragment key={i}>
            <span className="caption-word" style={vars({ "--i": i })}>
              {word}
            </span>
            {i < words.length - 1 ? " " : null}
          </Fragment>
        ))}
      </span>
    </Tag>
  );
}
