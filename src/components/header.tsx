"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

import { profile } from "@/data/content";

import { sections } from "./sections";

/**
 * Fixed header. The row of bars on top works like Instagram story progress:
 * one bar per section, filling as you scroll through it.
 */
export function Header() {
  const barsRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState<string>(sections[0].id);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const elements = sections.map((section) => document.getElementById(section.id));
    let frame = 0;

    const update = () => {
      frame = 0;
      const viewport = window.innerHeight;
      const line = viewport * 0.3;
      const atBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 4;
      let current: string = sections[0].id;

      elements.forEach((element, index) => {
        const bar = barsRef.current?.children[index] as HTMLElement | undefined;
        if (!element || !bar) return;
        const rect = element.getBoundingClientRect();
        const isLast = index === elements.length - 1;
        const progress = atBottom ? 1 : isLast ? (viewport - rect.top) / rect.height : (line - rect.top) / rect.height;
        bar.style.setProperty("--fill", Math.min(1, Math.max(0, progress)).toFixed(4));
        if (rect.top <= line) current = sections[index]?.id ?? current;
      });

      setActive((previous) => (previous === current ? previous : current));
      setScrolled(window.scrollY > 24);
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
    };
  }, []);

  return (
    <header className="site-header" data-scrolled={scrolled}>
      <div ref={barsRef} className="story-progress" aria-hidden="true">
        {sections.map((section) => (
          <span key={section.id} />
        ))}
      </div>
      <div className="wrap header-row">
        <a href="#top" className="brand">
          <span className="ring ring-sm">
            <Image src="/images/alaa.webp" alt="" width={56} height={56} />
          </span>
          <span>{profile.name}</span>
        </a>
        <nav aria-label="Sections" className="header-nav">
          <ul>
            {sections
              .filter((section) => section.nav)
              .map((section) => (
                <li key={section.id}>
                  <a href={`#${section.id}`} aria-current={active === section.id ? "true" : undefined}>
                    {section.label}
                  </a>
                </li>
              ))}
          </ul>
        </nav>
        <a href="#contact" className="btn btn-small btn-sage">
          Contact
        </a>
      </div>
    </header>
  );
}
