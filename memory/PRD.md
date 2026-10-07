# AMO WORLD — PRD

## Original problem statement
Build the official digital home of **AMO** — a relationship app whose philosophy is "LOVE IS PAYING ATTENTION. FEEL SEEN." Not a landing page: an interactive, cinematic scroll-driven world covering brand philosophy, 12–24 month research story, product map, AMO Stories, development journal, community submissions, reviews, and the wider AMO ecosystem. Full spec: 58 sections (chapters, motion language, content architecture, community data models, accessibility, performance).

## User choices (session 1)
- Scope: cinematic homepage + Explore/Map/Stories/Journal/Community pages, submission forms working end-to-end
- Media: empty labeled placeholders only (no stock photos, no fake videos)
- Visuals: follow spec exactly — AMO red (#E63B48) / obsidian (#0A0A0B) / warm bone (#F5F3EF), huge editorial typography
- Community data: MongoDB backend with moderation states
- GET AMO: scrolls to a "coming soon" section (no waitlist capture yet)
- Bar: Awwwards-level; motion (framer-motion) + lenis smooth scroll; original SVG logo as favicon

## Architecture
- Frontend: Vite + React 19 + TS strict, Tailwind v4 (theme in `src/index.css`), `motion` (framer-motion v12) for animation, `lenis` for momentum scroll, react-router pages, shadcn/base-ui components
- Fonts: Playfair Display Variable (serif display), Plus Jakarta Sans (body), JetBrains Mono (labels) via @fontsource
- Backend: FastAPI + motor, `backend/routers/community.py` (submissions, public board, stats, reviews), `backend/seed.py` (counter + demo board entries), indexes in `lib/db.py`
- Content layer: `src/content/features.ts` (12 product nodes, 5 groups), `src/content/journal.ts` (6 articles), `src/content/stories.ts` (8 stories) — CMS-replaceable later
- Community data: `submissions` collection (id, number, type, content, name, email, public, status, demo, created_at); `counters` for sequential IDEA #; `reviews` (approved-only public endpoint; intentionally empty — no fabricated reviews)

## User personas
- First-time visitor discovering AMO (the scroll-film audience)
- Couples/community members submitting ideas, date ideas, feedback, bugs, stories
- Journal readers following development

## Core requirements (static)
- Homepage story arc: hero → falling in love → 12–24mo research → love becomes a verb → why AMO → one relationship one place → engine → explore → stories → journal → community → reviews → loop → finale → get AMO
- Pages: / /philosophy /explore /map /stories /journal /journal/:slug /community /about /privacy /terms
- Global "+ ADD TO AMO" bottom sheet with 7 submission types, public/private choice, IDEA #N success
- Video/media: labeled placeholders only, drop-in paths documented in the UI
- Easter eggs: hovering "AGAIN." spawns "again."; tappable Kodi & Mimi bears; hidden corner of the map
- prefers-reduced-motion respected (lenis + CSS animations off)

## Implemented (2026-07 session 1)
- Cinematic homepage with all 11 chapters, masked line reveals, sticky 12→18→24-month research timeline with "AND THEN?" + research reference link, engine ring, phone scene with orbiting widgets, marquee, finale chapters, coming-soon section
- /explore interactive product map (12 nodes, dialog details, ?node= deep links)
- /map constellation universe with drawer + easter egg
- /stories horizontal 9:16 placeholder rail · /journal + /journal/:slug reader · /philosophy · /about · /privacy · /terms
- Community backend live: POST /api/community/submissions (201, sequential #), GET /board (public only, email never exposed), GET /stats (demo-flagged), GET /reviews (empty until real, moderated reviews exist)
- Board seeded with 6 clearly-marked DEMO entries; counter seeded at 183 (first real idea = #184)
- AMO heart-eye SVG mark + favicon; Kodi & Mimi bear SVGs in footer/success/about

## Verified
- curl: root, submit (#184), board, stats, reviews, 422 negative case — all pass via public URL
- `yarn typecheck` clean; browser passes: hero, chapters, sheet submit flow (#185 success state), explore dialog, map, community, journal article, mobile 390px

## Backlog
- P0: real video assets (drop into /public/videos/, paths labeled in UI); journal cover images (/public/images/journal/<slug>.webp)
- P1: admin moderation UI for submissions/reviews; idea upvoting; waitlist capture if GET AMO changes scope
- P1: 1080×1920 story export preview; subtitles/captions plumbing once videos exist
- P2: more easter eggs; ambient audio toggle; visited-country trip map; social feed links to real profiles

## Next tasks
1. Replace placeholders with final AMO films/covers
2. Moderation dashboard + approve flow for reviews/submissions
3. Public idea support (votes) on the community board
