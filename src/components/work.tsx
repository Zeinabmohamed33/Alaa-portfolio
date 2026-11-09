"use client";

import Image from "next/image";
import { useEffect, useRef, useState, type FocusEvent } from "react";

import { projects, serova, slideSrc, type Project } from "@/data/content";

import { Caption } from "./caption";
import { useMediaQuery } from "./hooks";
import { ExpandIcon } from "./icons";
import { Lightbox } from "./lightbox";

/** Pin the row and move it sideways only where there is room for it, and motion is welcome. */
const PIN_QUERY = "(min-width: 960px) and (min-height: 620px) and (prefers-reduced-motion: no-preference)";

/**
 * Client decks. On large screens the section pins and the cards slide
 * sideways as you scroll down; elsewhere they stack.
 */
export function Work() {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLUListElement>(null);
  const pinned = useMediaQuery(PIN_QUERY);
  const [distance, setDistance] = useState(0);
  const [open, setOpen] = useState<Project | null>(null);

  // How far the row has to travel: from the first card to the end of the last one.
  useEffect(() => {
    const track = trackRef.current;
    if (!pinned || !track) {
      setDistance(0);
      return;
    }
    const measure = () => {
      const last = track.lastElementChild as HTMLElement | null;
      if (!last) return;
      const padding = parseFloat(getComputedStyle(track).paddingLeft) || 0;
      setDistance(Math.max(0, Math.round(last.offsetLeft + last.offsetWidth + padding - track.clientWidth)));
    };
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(track);
    return () => observer.disconnect();
  }, [pinned]);

  // Scroll position -> sideways position of the row.
  useEffect(() => {
    const section = sectionRef.current;
    const track = trackRef.current;
    if (!pinned || !distance || !section || !track) return;
    let frame = 0;
    const update = () => {
      frame = 0;
      const progress = Math.min(1, Math.max(0, -section.getBoundingClientRect().top / distance));
      track.style.transform = `translate3d(${(-progress * distance).toFixed(1)}px, 0, 0)`;
      section.style.setProperty("--progress", progress.toFixed(4));
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
      track.style.transform = "";
      section.style.removeProperty("--progress");
    };
  }, [pinned, distance]);

  // Keyboard users: bring a card into view by scrolling the page to it.
  const onCardFocus = (event: FocusEvent<HTMLLIElement>) => {
    const section = sectionRef.current;
    const track = trackRef.current;
    if (!pinned || !distance || !section || !track) return;
    const padding = parseFloat(getComputedStyle(track).paddingLeft) || 0;
    const offset = Math.min(distance, Math.max(0, event.currentTarget.offsetLeft - padding));
    const sectionTop = window.scrollY + section.getBoundingClientRect().top;
    window.scrollTo({ top: sectionTop + offset, behavior: "instant" });
  };

  const pinnedReady = pinned && distance > 0;

  return (
    <section
      ref={sectionRef}
      id="work"
      className="work section-dark"
      aria-labelledby="work-title"
      data-pinned={pinned}
      style={pinnedReady ? { height: `calc(100vh + ${distance}px)` } : undefined}
    >
      <div className="work-sticky">
        <div className="wrap work-head">
          <Caption id="work-title" text="Campaigns, launches and reel plans." />
          <p className="lede">Client decks: launch funnels, reel scripts, content plans, a sales deck, an offer strategy and a film concept. Open one to flip through the slides.</p>
        </div>

        <ul ref={trackRef} className="work-track">
          {projects.map((project) => (
            <li key={project.slug} className="work-card" onFocus={onCardFocus}>
              <button type="button" className="work-cover" onClick={() => setOpen(project)}>
                <Image src={slideSrc(project.slug, project.cover)} alt="" width={1600} height={900} sizes="(min-width: 960px) 46vw, 92vw" />
                <span className="work-open">
                  <ExpandIcon width={16} height={16} />
                  <span>
                    View {project.slides} slides<span className="sr-only"> of {project.title}</span>
                  </span>
                </span>
              </button>
              <div className="work-meta">
                <h3 className="work-title" lang={project.titleLang} dir={project.titleLang ? "rtl" : undefined}>
                  {project.title}
                </h3>
                <p className="work-client">{project.client}</p>
                <p className="work-summary">{project.summary}</p>
                <ul className="tags" aria-label="Tags">
                  {project.tags.map((tag) => (
                    <li key={tag}>{tag}</li>
                  ))}
                </ul>
              </div>
            </li>
          ))}

          <li className="work-card work-card-text" onFocus={onCardFocus}>
            <div className="serova">
              <p className="serova-name" aria-hidden="true">
                {serova.title}
              </p>
              <ol className="serova-phases" aria-label="Campaign phases">
                {serova.phases.map((phase) => (
                  <li key={phase.name}>
                    <span className="serova-phase">{phase.name}</span>
                    <span className="serova-note">{phase.note}</span>
                  </li>
                ))}
              </ol>
            </div>
            <div className="work-meta">
              <h3 className="work-title">{serova.title} teaser campaign</h3>
              <p className="work-client">Luxury brand launch, in three phases</p>
              <p className="work-summary">{serova.summary}</p>
              <ul className="tags" aria-label="Tags">
                <li>Teaser campaign</li>
                <li>Luxury</li>
                <li>Brand voice</li>
              </ul>
            </div>
          </li>
        </ul>

        <div className="wrap work-foot" aria-hidden="true">
          <span className="work-bar">
            <span />
          </span>
        </div>
      </div>

      {open && <Lightbox project={open} onClose={() => setOpen(null)} />}
    </section>
  );
}
