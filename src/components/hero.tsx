import { profile } from "@/data/content";

import { StoryCard } from "./story-card";
import { vars } from "./style";

/** The hook: the first three seconds of the page. */
export function Hero() {
  return (
    <section id="top" className="hero" aria-labelledby="hero-title">
      <div className="mesh" aria-hidden="true">
        <span />
        <span />
        <span />
      </div>
      <div className="grain" aria-hidden="true" />

      <div className="wrap hero-grid">
        <div className="hero-copy">
          <p className="hero-roles load" style={vars({ "--d": "0ms" })}>
            Content creator, social media specialist and account manager
          </p>
          <h1 id="hero-title" className="hero-title">
            <span className="hero-hook">
              <span className="line">
                <span className="load-rise" style={vars({ "--d": "120ms" })}>
                  Stop
                </span>
              </span>
              <span className="line">
                <span className="load-rise" style={vars({ "--d": "260ms" })}>
                  scrolling.
                </span>
              </span>
            </span>
            <span className="hero-sub load" style={vars({ "--d": "620ms" })}>
              Your next content creator is right here.
            </span>
          </h1>
          <p className="hero-intro load" style={vars({ "--d": "760ms" })}>
            {profile.intro}
          </p>
          <div className="hero-actions load" style={vars({ "--d": "880ms" })}>
            <a href="#work" className="btn btn-sage">
              See my work
            </a>
            <a href={`mailto:${profile.email}`} className="btn btn-outline">
              Email me
            </a>
          </div>
        </div>

        <div className="hero-story load-card" style={vars({ "--d": "400ms" })}>
          <StoryCard />
        </div>
      </div>
    </section>
  );
}
