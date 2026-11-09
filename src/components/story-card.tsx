"use client";

import Image from "next/image";
import { useEffect, useRef, useState, type KeyboardEvent } from "react";

import { heroStories, profile } from "@/data/content";

import { prefersReducedMotion } from "./hooks";
import { PauseIcon, PlayIcon } from "./icons";

const { photo, screens } = heroStories;
const FRAMES = 1 + screens.length;

/**
 * A 9:16 story in the hero: Alaa's photo, then screenshots of pages she
 * runs. It plays on its own (5 s a frame), pauses on hover, off screen and
 * with the pause button, and starts paused for people who ask for reduced
 * motion. Tap the left or right side to move.
 */
export function StoryCard() {
  const ref = useRef<HTMLDivElement>(null);
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [hovering, setHovering] = useState(false);
  const [onScreen, setOnScreen] = useState(true);

  useEffect(() => {
    if (prefersReducedMotion()) setPaused(true);
    const element = ref.current;
    if (!element) return;
    const observer = new IntersectionObserver(([entry]) => setOnScreen(Boolean(entry?.isIntersecting)), { threshold: 0.25 });
    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  const running = !paused && !hovering && onScreen;
  const go = (next: number) => setIndex((next + FRAMES) % FRAMES);

  const onKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "ArrowRight") go(index + 1);
    else if (event.key === "ArrowLeft") go(index - 1);
    else return;
    event.preventDefault();
  };

  return (
    <div
      ref={ref}
      className="story"
      data-running={running}
      role="region"
      aria-roledescription="carousel"
      aria-label={`About ${profile.firstName}`}
      onPointerEnter={(event) => event.pointerType === "mouse" && setHovering(true)}
      onPointerLeave={() => setHovering(false)}
      onKeyDown={onKeyDown}
    >
      <div className="story-bars" aria-hidden="true">
        {Array.from({ length: FRAMES }, (_, i) => (
          <span key={i} className="story-bar" data-state={i < index ? "done" : i === index ? "active" : "next"}>
            <span key={i === index ? `active-${index}` : `idle-${i}`} onAnimationEnd={i === index ? () => go(index + 1) : undefined} />
          </span>
        ))}
      </div>

      <div className="story-head">
        <span className="ring ring-sm">
          <Image src="/images/alaa.webp" alt="" width={56} height={56} />
        </span>
        <span className="story-name">Alaa Adel</span>
        <span className="story-place">{profile.city.split(",")[0]}</span>
        <button
          type="button"
          className="story-toggle"
          onClick={() => setPaused((value) => !value)}
          aria-label={paused ? "Play stories" : "Pause stories"}
        >
          {paused ? <PlayIcon width={16} height={16} /> : <PauseIcon width={16} height={16} />}
        </button>
      </div>

      <div className="story-frames" aria-live={running ? "off" : "polite"}>
        <div className="story-frame story-frame-media" data-active={index === 0} aria-hidden={index !== 0}>
          <Image
            src="/images/alaa.webp"
            alt={`Portrait of ${profile.name}`}
            fill
            preload
            sizes="(min-width: 900px) 360px, 80vw"
            className="story-photo"
          />
          <div className="story-caption">
            <p className="sticker sticker-lg">{photo.title}</p>
            <p className="story-detail">{photo.detail}</p>
          </div>
        </div>

        {screens.map((screen, i) => (
          <div key={screen.handle} className="story-frame story-frame-media" data-active={index === i + 1} aria-hidden={index !== i + 1}>
            <Image
              src={screen.image}
              alt={`Instagram grid of @${screen.handle}`}
              fill
              sizes="(min-width: 900px) 360px, 80vw"
              className="story-screen"
            />
            <div className="story-caption">
              <p className="sticker">@{screen.handle}</p>
              <p className="story-detail">{screen.detail}</p>
            </div>
          </div>
        ))}
      </div>

      <button type="button" className="story-tap story-tap-prev" onClick={() => go(index - 1)} aria-label="Previous story" />
      <button type="button" className="story-tap story-tap-next" onClick={() => go(index + 1)} aria-label="Next story" />
    </div>
  );
}
