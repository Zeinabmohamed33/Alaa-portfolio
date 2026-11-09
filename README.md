# Alaa Adel Fekry, portfolio

Next.js 16 (App Router), React 19 and plain CSS. No other runtime libraries: every animation is CSS plus a few small hooks.

## Run it

```bash
npm install
npm run dev        # http://localhost:3005
```

Production: `npm run build` then `npm start`.

## Edit the content

All text lives in `src/data/content.ts`: profile and contact details, Instagram pages, scripts, projects, jobs, process, skills, tools and education. Change it there and the page follows.

- **New project deck:** put the slides in `public/work/<slug>/` as `01.webp`, `02.webp`, … (1600×900), then add an entry to `projects` with the slide count and which slide to use as the cover.
- **New Instagram page:** add it to `managedPages`.
- **Job dates:** fill `period` on a job in `experience`.

## Where things are

| Path | What it is |
| --- | --- |
| `src/app/page.tsx` | Page order |
| `src/app/globals.css` | Colours, type and every section's styles |
| `src/components/` | One file per section |
| `public/images/alaa.webp` | Portrait used in the hero story and the header |

## Motion

- The hero plays once on load; the story card auto-advances every 5 s and pauses on hover, off screen and with its pause button.
- Section headings type in word by word, like reel captions.
- The work row pins and slides sideways on screens at least 960 × 620; smaller screens get a normal stacked list.
- With *reduce motion* switched on in the OS, the moving parts stop and everything is shown fully drawn.
