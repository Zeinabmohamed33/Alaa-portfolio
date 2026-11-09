import { managedPages } from "@/data/content";

import { Caption } from "./caption";
import { ExternalIcon } from "./icons";
import { vars } from "./style";

const initials = (name: string) =>
  name
    .split(" ")
    .slice(0, 2)
    .map((word) => word[0])
    .join("");

/** The Instagram accounts Alaa has created content for. */
export function Pages() {
  return (
    <section id="pages" className="section section-light" aria-labelledby="pages-title">
      <div className="wrap">
        <div className="section-head">
          <Caption id="pages-title" text="Accounts I’ve worked on." />
          <p className="lede">Instagram pages in marketing, law, travel, food and tech, across Egypt and the Gulf.</p>
        </div>

        <ul className="pages-grid">
          {managedPages.map((page, index) => (
            <li key={page.handle}>
              <a href={page.url} target="_blank" rel="noopener noreferrer" className="page-card" style={vars({ "--start": `${index * 47}deg` })}>
                <span className="ring ring-lg" aria-hidden="true">
                  <span className="page-avatar">{initials(page.name)}</span>
                </span>
                <span className="page-text">
                  <span className="page-handle">@{page.handle}</span>
                  <span className="page-name">{page.name}</span>
                  {(page.sector || page.market) && <span className="page-meta">{[page.sector, page.market].filter(Boolean).join(", ")}</span>}
                </span>
                <span className="page-open">
                  Open on Instagram
                  <ExternalIcon width={16} height={16} />
                  <span className="sr-only"> (opens in a new tab)</span>
                </span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
