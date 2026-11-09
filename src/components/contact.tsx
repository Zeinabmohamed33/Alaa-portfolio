"use client";

import { useEffect, useRef, useState, type PointerEvent } from "react";

import { profile } from "@/data/content";

import { Caption } from "./caption";
import { prefersReducedMotion } from "./hooks";
import { CheckIcon, CopyIcon } from "./icons";

/** The call to action: the last frame of the page. */
export function Contact() {
  const [copied, setCopied] = useState(false);
  const timer = useRef<number | undefined>(undefined);

  useEffect(() => () => window.clearTimeout(timer.current), []);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(profile.email);
      setCopied(true);
      window.clearTimeout(timer.current);
      timer.current = window.setTimeout(() => setCopied(false), 2400);
    } catch {
      window.location.href = `mailto:${profile.email}`;
    }
  };

  // The main button leans a little towards the mouse.
  const onMove = (event: PointerEvent<HTMLAnchorElement>) => {
    if (event.pointerType !== "mouse" || prefersReducedMotion()) return;
    const rect = event.currentTarget.getBoundingClientRect();
    const x = event.clientX - (rect.left + rect.width / 2);
    const y = event.clientY - (rect.top + rect.height / 2);
    event.currentTarget.style.transform = `translate(${(x * 0.22).toFixed(1)}px, ${(y * 0.3).toFixed(1)}px)`;
  };
  const onLeave = (event: PointerEvent<HTMLAnchorElement>) => {
    event.currentTarget.style.transform = "";
  };

  return (
    <section id="contact" className="contact" aria-labelledby="contact-title">
      <div className="mesh mesh-contact" aria-hidden="true">
        <span />
        <span />
        <span />
      </div>
      <div className="grain" aria-hidden="true" />

      <div className="wrap contact-inner">
        <Caption id="contact-title" className="contact-title" text="Let’s give your audience a reason to stop." />
        <p className="lede">Tell me about your brand, who it talks to and what you need from social media.</p>

        <div className="contact-actions">
          <a href={`mailto:${profile.email}`} className="btn btn-sage btn-large magnetic" onPointerMove={onMove} onPointerLeave={onLeave}>
            Email me
          </a>
          <a href={profile.whatsapp} target="_blank" rel="noopener noreferrer" className="btn btn-outline btn-large">
            Message on WhatsApp<span className="sr-only"> (opens in a new tab)</span>
          </a>
        </div>

        <dl className="contact-details">
          <div>
            <dt>Email</dt>
            <dd>
              <a href={`mailto:${profile.email}`}>{profile.email}</a>
              <button type="button" className="copy-btn" onClick={copyEmail}>
                {copied ? <CheckIcon width={16} height={16} /> : <CopyIcon width={16} height={16} />}
                <span>{copied ? "Copied" : "Copy"}</span>
              </button>
              <span className="sr-only" aria-live="polite">
                {copied ? "Email address copied" : ""}
              </span>
            </dd>
          </div>
          <div>
            <dt>Phone</dt>
            <dd>
              <a href={`tel:${profile.phone.replace(/\s/g, "")}`} dir="ltr">
                {profile.phone}
              </a>
            </dd>
          </div>
          <div>
            <dt>Based in</dt>
            <dd>{profile.city}</dd>
          </div>
        </dl>
      </div>
    </section>
  );
}
