"use client";

import { useEffect, useState } from "react";

import { managedPages, otherBrands } from "@/data/content";

import { prefersReducedMotion } from "./hooks";
import { PauseIcon, PlayIcon } from "./icons";

const items = [...managedPages.map((page) => `@${page.handle}`), ...otherBrands];

/** A moving strip of the accounts and brands Alaa has written for. */
export function Handles() {
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (prefersReducedMotion()) setPaused(true);
  }, []);

  return (
    <section className="handles" aria-label="Accounts and brands" data-paused={paused}>
      <div className="marquee">
        <ul>
          {items.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
        <ul aria-hidden="true">
          {items.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </div>
      <button
        type="button"
        className="handles-toggle"
        onClick={() => setPaused((value) => !value)}
        aria-label={paused ? "Play the moving list" : "Pause the moving list"}
      >
        {paused ? <PlayIcon width={16} height={16} /> : <PauseIcon width={16} height={16} />}
      </button>
    </section>
  );
}
