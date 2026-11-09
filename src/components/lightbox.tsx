"use client";

import Image from "next/image";
import { useEffect, useRef, useState, type KeyboardEvent, type PointerEvent } from "react";

import { slideSrc, type Project } from "@/data/content";

import { ChevronLeftIcon, ChevronRightIcon, CloseIcon } from "./icons";

/** Full-screen slide viewer for one project deck. Esc, arrow keys and swipes work. */
export function Lightbox({ project, onClose }: { project: Project; onClose: () => void }) {
  const ref = useRef<HTMLDialogElement>(null);
  const swipeStart = useRef<number | null>(null);
  const [index, setIndex] = useState(0);
  const total = project.slides;

  useEffect(() => {
    const dialog = ref.current;
    if (dialog && !dialog.open) dialog.showModal();
    document.documentElement.classList.add("is-locked");
    return () => document.documentElement.classList.remove("is-locked");
  }, []);

  const go = (next: number) => setIndex((next + total) % total);
  const close = () => ref.current?.close();

  const onKeyDown = (event: KeyboardEvent<HTMLDialogElement>) => {
    if (event.key === "ArrowRight") go(index + 1);
    else if (event.key === "ArrowLeft") go(index - 1);
  };

  const onPointerDown = (event: PointerEvent<HTMLDivElement>) => {
    if (event.pointerType !== "mouse") swipeStart.current = event.clientX;
  };
  const onPointerUp = (event: PointerEvent<HTMLDivElement>) => {
    if (swipeStart.current === null) return;
    const distance = event.clientX - swipeStart.current;
    swipeStart.current = null;
    if (Math.abs(distance) > 48) go(distance < 0 ? index + 1 : index - 1);
  };

  return (
    <dialog
      ref={ref}
      className="lightbox"
      aria-labelledby="lightbox-title"
      onClose={onClose}
      onKeyDown={onKeyDown}
      onClick={(event) => {
        if (event.target === event.currentTarget) close();
      }}
    >
      <div className="lightbox-bar">
        <p id="lightbox-title" className="lightbox-title" lang={project.titleLang} dir={project.titleLang ? "rtl" : undefined}>
          {project.title}
        </p>
        <p className="lightbox-count" aria-live="polite">
          Slide {index + 1} of {total}
        </p>
        <button type="button" className="icon-btn" onClick={close} aria-label="Close slides">
          <CloseIcon />
        </button>
      </div>

      <div className="lightbox-stage" onPointerDown={onPointerDown} onPointerUp={onPointerUp}>
        <button type="button" className="icon-btn lightbox-nav" onClick={() => go(index - 1)} aria-label="Previous slide">
          <ChevronLeftIcon />
        </button>
        <Image
          key={index}
          src={slideSrc(project.slug, index + 1)}
          alt={`${project.title}, slide ${index + 1} of ${total}`}
          width={1600}
          height={900}
          sizes="(min-width: 1200px) 1100px, 92vw"
          className="lightbox-image"
          draggable={false}
        />
        <button type="button" className="icon-btn lightbox-nav" onClick={() => go(index + 1)} aria-label="Next slide">
          <ChevronRightIcon />
        </button>
      </div>

      <ol className="lightbox-thumbs">
        {Array.from({ length: total }, (_, i) => (
          <li key={i}>
            <button type="button" aria-label={`Go to slide ${i + 1}`} aria-current={i === index ? "true" : undefined} onClick={() => setIndex(i)}>
              <Image src={slideSrc(project.slug, i + 1)} alt="" width={160} height={90} sizes="96px" />
            </button>
          </li>
        ))}
      </ol>
    </dialog>
  );
}
