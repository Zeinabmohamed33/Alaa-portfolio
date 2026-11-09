"use client";

import { useRef } from "react";

import { process } from "@/data/content";

import { Caption } from "./caption";
import { useScrollProgress } from "./hooks";
import { vars } from "./style";

/** The monthly cycle, step by step; each step fills in as you scroll past it. */
export function Process() {
  const ref = useRef<HTMLOListElement>(null);
  useScrollProgress(ref, 0.85, 0.55);

  return (
    <section id="process" className="section section-plum" aria-labelledby="process-title">
      <div className="wrap">
        <div className="section-head">
          <Caption id="process-title" text="How I run an account." />
          <p className="lede">Eight steps, from the first brief to the monthly report, and then the next month starts sharper.</p>
        </div>

        <ol ref={ref} className="steps" style={vars({ "--count": process.length })}>
          {process.map((item, index) => (
            <li key={item.step} className="step" style={vars({ "--i": index })}>
              <span className="step-track" aria-hidden="true">
                <span />
              </span>
              <span className="step-number" aria-hidden="true">
                {String(index + 1).padStart(2, "0")}
              </span>
              <h3 className="step-title">{item.step}</h3>
              <p className="step-note">{item.note}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
