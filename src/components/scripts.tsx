"use client";

import { useRef, useState, type KeyboardEvent } from "react";

import { scripts } from "@/data/content";

import { Caption } from "./caption";
import { useSeenOnce } from "./hooks";

/**
 * Real scripts from client work, laid out the way a reel is built:
 * hook, body, call to action. A playhead runs across the three parts each
 * time a script opens.
 */
export function Scripts() {
  const [selected, setSelected] = useState(0);
  const tabsRef = useRef<Array<HTMLButtonElement | null>>([]);
  const panelRef = useRef<HTMLDivElement>(null);
  const seen = useSeenOnce(panelRef, "0px 0px -25% 0px");
  const script = scripts[selected] ?? scripts[0]!;

  const select = (index: number) => {
    const next = (index + scripts.length) % scripts.length;
    setSelected(next);
    tabsRef.current[next]?.focus();
  };

  const onKeyDown = (event: KeyboardEvent<HTMLButtonElement>) => {
    const keys: Record<string, number> = {
      ArrowDown: selected + 1,
      ArrowRight: selected + 1,
      ArrowUp: selected - 1,
      ArrowLeft: selected - 1,
      Home: 0,
      End: scripts.length - 1,
    };
    const target = keys[event.key];
    if (target === undefined) return;
    event.preventDefault();
    select(target);
  };

  const dir = script.lang === "ar" ? "rtl" : "ltr";

  return (
    <section id="scripts" className="section section-light" aria-labelledby="scripts-title">
      <div className="wrap">
        <div className="section-head">
          <Caption id="scripts-title" text="Every post starts as a script." />
          <p className="lede">Hook, body, call to action. Pick a brand to read one of the scripts I wrote for it.</p>
        </div>

        <div className="scripts">
          <div className="script-tabs" role="tablist" aria-label="Scripts" aria-orientation="vertical">
            {scripts.map((item, index) => (
              <button
                key={item.id}
                ref={(element) => {
                  tabsRef.current[index] = element;
                }}
                type="button"
                role="tab"
                id={`script-tab-${item.id}`}
                aria-selected={index === selected}
                aria-controls="script-panel"
                tabIndex={index === selected ? 0 : -1}
                className="script-tab"
                onClick={() => setSelected(index)}
                onKeyDown={onKeyDown}
              >
                <span className="script-tab-brand">{item.brand}</span>
                <span className="script-tab-format">{item.format}</span>
              </button>
            ))}
          </div>

          <div
            ref={panelRef}
            id="script-panel"
            role="tabpanel"
            aria-labelledby={`script-tab-${script.id}`}
            className="script-panel"
            data-playing={seen}
            tabIndex={0}
          >
            <div key={script.id} className="script-sheet">
              <div className="script-timeline" aria-hidden="true">
                <span data-part="hook" />
                <span data-part="body" />
                <span data-part="cta" />
                <i className="script-playhead" />
              </div>

              <div className="script-part" data-part="hook">
                <p className="script-label">Hook</p>
                <p className="script-hook" lang={script.lang} dir={dir}>
                  {script.hook}
                </p>
              </div>

              <div className="script-part" data-part="body">
                <p className="script-label">Body</p>
                <div className="script-body" lang={script.lang} dir={dir}>
                  {script.body.map((line) => (
                    <p key={line}>{line}</p>
                  ))}
                </div>
              </div>

              <div className="script-part" data-part="cta">
                <p className="script-label">Call to action</p>
                <p className="script-cta" lang={script.lang} dir={dir}>
                  {script.cta}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
