# AGENTS.md — thegr8paul.github.io

Context file for AI coding agents (Codex, etc.) building Paul Schlegel's
personal website + CV. Read this fully before writing any code.

## Goal

A personal website for Paul Schlegel, hosted for free on GitHub Pages at
`https://thegr8paul.github.io/`. Repo name must be exactly
`thegr8paul.github.io` (matching Paul's actual GitHub username, `thegr8paul`
— GitHub's free user-page auto-hosting convention, `<username>.github.io`,
needs the repo name to match the account's username, not an arbitrary
chosen name; no extra config needed beyond that, it just goes live on push
to `main`). **Repo was originally created as `paulschlegel.github.io` and
renamed to `thegr8paul.github.io` on 2026-09-22** after the site 404'd —
see the deploy decision note near the bottom of this file for the full
story. Any reference to `paulschlegel.github.io` elsewhere (old local
folder name, old notes) is the pre-rename name; don't reintroduce it as
the repo/deploy name.

No build step. Plain HTML/CSS/JS only — must run by opening the files
with a static server (e.g. `python3 -m http.server`) and by pushing
straight to GitHub Pages. No React, no bundler, no npm dependency at
runtime.

## Site structure (multi-page, per Paul's decision)

```
thegr8paul.github.io/
├── index.html          # Home: hero + short intro + nav into the rest
├── career.html          # Full CV / timeline (see "CV content" below)
├── projects.html        # Project cards grouped by category, with tags
├── project-*.html        # One detail page per project (clickable from the
│                          cards on projects.html/index.html), each with a
│                          small inline-SVG pictogram + the full write-up
├── contact.html         # Contact details + links
├── partials/
│   ├── header.html       # shared nav, loaded via fetch() in main.js
│   └── footer.html       # shared footer, loaded via fetch() in main.js
├── assets/
│   ├── css/style.css
│   ├── js/main.js        # language switcher + partial includes
│   ├── img/
│   │   └── portrait.jpg  # already extracted, see "Assets provided"
│   └── files/
│       └── Paul_Schlegel_Lebenslauf.pdf   # downloadable CV export
├── README.md             # how to run locally + how to deploy
└── (no CNAME — using the default github.io domain)
```

Header/footer are NOT duplicated by hand across pages — they're fetched
from `partials/` at runtime by `main.js`. This requires a static server
(README covers this); it will not work opening files directly via
`file://`.

Every page shares the same header nav (Home / Career / Projects /
Contact) and footer (contact links). Avoid duplicating the whole
nav/footer markup by hand in every file if you can cleanly do it with a
small JS include (fetch of a partial) — but only if it still works
correctly when opened via a static file server. If in doubt, plain
duplicated markup across pages is fine and more robust than a fragile
include mechanism.

## Bilingual requirement (important, decided explicitly)

The whole site must support **German and English with a switcher**
(a visible toggle in the header, not two separate sites). Default
language: German. Persist the chosen language (e.g. `localStorage`) so
it's remembered on page navigation. Implementation approach: every
translatable element carries `data-de` / `data-en` (can contain simple
inline HTML like `<strong>`), and `main.js` sets the visible language by
writing `data-de`/`data-en` content into the element based on the
current toggle state, applied consistently across all 5 pages.

## Design direction

Paul is a engineer who studied acrchitecture who also does BIM/laser-scanning and is doing his master
in data science. The site should feel technical and precise —
grounded in surveying/point-cloud/architectural-drawing visual language
— not a generic SaaS template.

Explicitly avoid the common AI-generated-site clichés: warm cream
background with terracotta accent; near-black background with one neon
accent; generic rounded "SaaS cards" with soft grey drop shadows;
tracked-out ALL-CAPS eyebrow labels above every heading; em-dash
"WORD — fragment" labels; arrows appended to every link.

Suggested token system (adjust as needed, but keep it intentional, not default):
- Color: paper `#F7F6F2` (background), ink `#14181F` (text/UI, the only
  neutral "accent" — used for links, active nav, focus rings, icons),
  hairline `#C9CCC3` (rules/borders), mist `#EEF1EC` (panel background).
  **No blue accent** (removed 2026-09-18 per Paul — see decision below).
  Color as an accent is reserved for tags only (see Tag categories).
- Type: **Antique Legacy** (self-hosted, `--font-sans`) for headings/body
  + **IBM Plex Mono** (Google Fonts, `--font-mono`) for tags/data/labels —
  see the 2026-09-20 decision below for the switch from Public Sans and
  why body text renders at a heavier weight than you'd expect.
- Layout: left-aligned, technical-drawing feel — hairline rules, small
  tick-mark/ruler motifs, minimal border-radius. This is justified by
  the actual subject matter (point clouds, survey grids), not decoration
  for its own sake — don't overdo it into "newspaper broadsheet" pastiche.
- Motion: sparing. One deliberate entrance moment at most; no
  fade-slide-up on every section.

Responsive down to mobile. Visible keyboard focus states. Respect
`prefers-reduced-motion`.

## Assets provided

- `assets/img/portrait.jpg` — Paul's portrait, already extracted from
  his old CV PDF and included in this handoff. Use it as-is (hero /
  about / contact — architect's choice where).
- `assets/files/Paul_Schlegel_Lebenslauf.pdf` — his previous CV PDF,
  included for reference of prior content/layout (the *content* below
  is the updated, corrected version — don't just copy the old PDF's
  text verbatim, some of it changed in conversation).

## Contact details (confirmed by Paul — use exactly as given)

- Name: Paul Schlegel
- Email: paul-schlegel@online.de
- Phone: 01605516230 (kept here for reference only — removed from
  contact.html 2026-09-18 at Paul's request, do not re-add without
  asking)
- LinkedIn: https://www.linkedin.com/in/paul-schlegel-5593031a6
- GitHub: https://github.com/thegr8paul
- Location: Freiburg im Breisgau, Germany
- Birth date: 14.08.2000

## CV / Career content (for career.html and the CV file)

Freiberufliche Tätigkeiten — BIM-Dienstleistung, Freiburg im Breisgau, 2024–heute
- Ansprechpartner für Software- & Hardwarefragen
- IFC-Modellierung & BIM-Koordination (Archicad)
- Modellbasierte LV-Erstellung (NOVA AVA)
- Lidarscan-Leistungen (Leica Geosystems)

Freiwilligenarbeit — Robert-Dyckerhoff-Stiftung, Mae-Sariang, Nordthailand, 2023–2024
- Initiierung, Planung & Bau des "Bamboo Study Hub" (Bibliothek)
- Sanierung von acht Badezimmern einer Schule (Bauleitung)
- IT-Einführungskurse (HTML, Python, Three.js) und Englischunterricht

Studentischer Mitarbeiter im Architekturbüro — Eva Schwär Dipl.Ing. Freie Architektin, Kißlegg im Allgäu / Schwarzwald, 2021–heute
- Visualisierungen und BIMx-3D-Rundgänge für Bauherren
- Erstellung von Genehmigungs-, Ausführungs- und Bauzeitenplänen
- Abstimmung mit Gewerken / Protokollierung

Architektur & Stadtplanung — Bachelorstudium, Universität Stuttgart, 2020–2023
- Bachelorarbeit "SolFibreHouse — parametrische Aufstockung"
- Planify — Grundriss-App als Einstiegsprojekt in Python, gemeinsam mit
  Magnus entwickelt (2026-09-19 correction: this bullet used to say
  "Algorithmic Floorplan Generator (Jun.-Prof. Thomas Wortmann, Ph.D.),
  Institute for Computational Design and Construction (ICD)" — Paul
  confirmed that was a misattribution and it's actually Planify, see the
  decision note near the bottom of this file for the full story. Don't
  reintroduce the ICD/Wortmann framing.)
(Note: "Living Timber Bridge" item from the old PDF was explicitly
removed by Paul — do not include it.)

Praktikum Zimmerei — Wolf Holzbau GmbH, Bad Krozingen-Hausen, 2020

Abitur / Matura — Robert-Gerwig-Schule, Furtwangen, 2017–2020

Kaderathlet Nordische Kombination — DOSB Skiinternat, Furtwangen, 2015–2020

Skills: Python, Three.js, CAD/CAM
Expertise: Rhino, Grasshopper (Karamba), IFC-Modellierung, 3D-Laserscan-Registrierung, Archicad
Data & KI: Pandas, TensorFlow, Keras, Deep Learning, Reinforcement Learning, Cloud Computing, Agentic AI & RAG (MCP)
Sprachen: Englisch (fließend), Deutsch (Muttersprache)
Interessen: Serieller Holzbau, Robotik im Bauwesen
Hobbys: Architektur, Skifahren, Podcasts hören, 3D-Druck, PC-Bau
(2026-09-27/28 revision: removed soft-skill filler (Stressresistent,
kooperativ) and dated interests (Klimawandel), removed Spanisch/Thai
from Sprachen, removed duplicate IFC.js from Skills (IFC-Modellierung
already covers it under Expertise), removed HTML and Computational
Design from their old slots, added a dedicated Data & KI row moving
Deep Learning/Reinforcement Learning/Cloud Computing/RAG(MCP) there
from Data & KI + Interessen to avoid duplication, shortened two Hobbys
entries ("Architektur entdecken" → "Architektur", "PC-Selbstbau" →
"PC-Bau"). Don't re-add any of the removed items without checking with
Paul first.)

## Projects content (for projects.html)

Group into these categories, each project gets short tag chips (mono
font). This structure was explicitly agreed with Paul — keep the
grouping and tags as given:

### Featured Projects (longer write-up, most prominent)
1. **testware.dev** — LLM+RAG platform that helps users design digital
   twin workflows. User enters a prompt (industry, application, project
   nature); an enhanced prompt drives an LLM+RAG pipeline that generates
   a workflow description, a flowchart, and suggested tools from a
   curated database; users can edit and save the flowchart. **Team
   project** — built together with Mitesh, Thais, and Emanuel. Paul's
   specific contribution: the RAG pipeline and the domain knowledge
   (digital twin / construction-tech expertise) behind it.
   Tags: `LLM` `RAG` `Team` (`Product` removed 2026-09-28 — see decision
   log; was redundant/too generic next to Team)
2. **Wilhelmstraße 5 Bauvorhaben** — a project run together
   with the architecture office (Schwär Architektur) where Paul combined
   everything he does: laser scanning (done independently/self-run),
   permit/approval documentation, construction project management
   (Bauleitung), and Holzbauarbeiten (timber construction work).
   Tags: `Laserscanning` `BIM` `Bauleitung` `Holzbau` `Team` (Team added
   2026-09-27 — see decision log; supersedes the earlier "stays solo"
   note further down this file)
3. **Bamboo Study Hub** — Robert-Dyckerhoff-Stiftung, Mae-Sariang,
   Nordthailand. Initiated, planned and built a bamboo library/study
   hub; also led a school bathroom renovation (site supervision) and
   taught IT (HTML, Python, Three.js) and English.
   Tags: `Volunteering` `Construction`

(**ScanTag** — removed 2026-09-18, was just an idea, never actually
built. Do not re-add it.)

### Architekturbüro-Organisation
4. **Nextcloud für Architekturbüros** (file:
   `project-nextcloud-architekturbuero.html`, was
   `project-konstruktionsueberwachung.html` /
   "Konstruktionsüberwachung Web-App" until 2026-09-19 — see decision
   note below, this is a full re-scope, not a rename of the same idea) —
   a self-hosted Nextcloud server Paul set up for Schwär Architektur,
   owned by the office itself and tailored to its workflows, with all
   common integrations simple enough for the office owner to manage
   herself. An AI is now connected to the database — hosted in the
   cloud but in Germany, using only open-source models, so no data is
   sent to third parties. Also the basis for the office's cost
   controlling.
   Tags: `Nextcloud` `Open Source` `KI` `Controlling`

### Studien- & Forschungsprojekte
5. **SolFibreHouse** — Bachelor's thesis, parametric building
   extension/addition ("parametrische Aufstockung").
   Tags: `Parametric Design` `Grasshopper` `Computational Design` (added
   2026-09-28 — Paul confirmed SolFibreHouse is Computational Design too)
6. **Planify** (file: `project-planify.html`, was
   `project-floorplan-generator.html` until 2026-09-19 — corrected, see
   decision note below) — a floorplan app built with Magnus so anyone
   can better visualize spatial proportions themselves. Their entry
   project into Python. Backend fully hand-built without AI; only the
   frontend was AI-generated. Self-hosted. Tools: Three.js, Python.
   **Team project** — built together with Magnus.
   Tags: `Computational Design` `Team`

Do NOT include "Living Timber Bridge" — explicitly removed. Do not
invent additional projects beyond the above without checking with Paul.

## Local testing & deploy (put this in README.md)

Local preview:
```
cd thegr8paul.github.io
python3 -m http.server 8000
# open http://localhost:8000
```

Deploy to GitHub Pages:
```
git init
git remote add origin https://github.com/thegr8paul/thegr8paul.github.io.git
git add .
git commit -m "Initial site"
git branch -M main
git push -u origin main
```
Because the repo is named `<username>.github.io` (username: `thegr8paul`),
GitHub Pages serves it automatically at `https://thegr8paul.github.io/` —
no extra Pages config needed, just confirm in the repo's Settings → Pages
that the source is "Deploy from branch: main / (root)".

## Decisions made when building the site (2026-09-18)

- **Visual direction**: "restrained technical" — kept the paper/ink
  palette, mono tags, and hairline rules, but dropped literal
  tick-mark/ruler decorations in favor of a cleaner, more editorial feel
  (inspiration: andlukyane.com/project, but stylistically cleaner as
  Paul requested).
- **No blue accent, hover via shadow, tag categories** (2026-09-18
  follow-up): Paul disliked the blue accent (`scan-blue`/`scan-blue-ink`)
  — removed entirely. Every element that used it (links, active nav,
  focus ring, timeline dots, `.label`, icons/logos on cards & detail
  pages) now uses `--ink` instead — no other element carries accent
  color. Hover feedback (cards, buttons) now uses `box-shadow` +
  `translateY`, not a color/border change. Links are underlined by
  default (`text-underline-offset`) since color no longer marks them.
  Tags are now the *only* accent-colored element, grouped into 6 pastel
  categories (tokens `--tag-ai`, `--tag-collab`, `--tag-bim`,
  `--tag-impact`, `--tag-software`, `--tag-design` in style.css), applied
  via a second class on `.tag` spans (e.g. `class="tag tag-bim"`). Current
  mapping: LLM/RAG→ai, Product/Team→collab, Laserscanning/BIM/
  Bauleitung/Holzbau→bim, Volunteering/Construction→impact, Web/SQL/
  Dashboard→software, Parametric Design/Grasshopper/Computational
  Design→design. Any new tag needs a category assigned (pick the closest
  fit or add a new `--tag-*` token) — don't leave a tag without a
  category class, it'll fall back to a plain hairline-grey chip.
- **Cards: shadow at rest, border only on hover** (2026-09-18 follow-up):
  `.card` no longer has a visible border by default — `border: 1px solid
  transparent` (kept transparent, not removed, so the box doesn't resize
  when hover adds a real border color) plus a subtle resting
  `box-shadow: 0 2px 8px rgba(20,24,31,0.08)`. On `:hover`/`:focus-visible`
  the border becomes `var(--ink)` and the shadow grows (existing `0 10px
  24px` raised shadow + `translateY(-2px)`). `.card.featured` no longer
  has its own permanent ink border either.
- **Cards fully white** (2026-09-18 follow-up): `.card` and `.card-thumb`
  background is now plain `#FFFFFF` (was `var(--mist)`/`var(--paper)`).
  The `.card.featured` background override and the `.card.featured
  .card-thumb` override were removed since there's no longer a
  background difference to make — featured cards are now visually
  identical to regular cards except for their position/grouping on the
  page. If featured cards need to look distinct again later, don't
  reach for a background-color difference (that's what was just
  removed) — use something else (e.g. a label, larger size, or an
  accent already established elsewhere).
- **Realistic layered card shadow + background grain** (2026-09-18
  follow-up): the single flat `box-shadow` felt too weak, so `.card` now
  uses 3 stacked shadows to read as a thin (~0.2mm) physical card resting
  just above the surface: a hairline edge (`0 0.5px 0 rgba(...,0.3)`), a
  tight contact shadow, and a soft ambient falloff — hover increases all
  three plus a bigger `translateY`. Also added a very subtle black/white
  grain texture to the page background (`body` `background-image: url
  ("../img/noise.png")`, tiled) for a slightly less flat/digital feel.
  **Do NOT use an SVG `feTurbulence` filter for this** (tried first) —
  it rendered solid black as a CSS `background-image` data URI in
  Chromium (filter reference silently failed, falling back to the
  `<rect>`'s default black fill) even though the exact same filter
  works fine applied directly to an SVG element in the page. The grain
  is instead a real 128×128 PNG generated once with Pillow (`paper_gray
  246 ± 6` per pixel, seeded random) and saved as a static asset at
  `assets/img/noise.png` — regenerate it with the same approach (see
  git history / ask Paul) if it ever needs to change, don't reach for an
  SVG filter approach again without testing it renders first.
- **Stronger grain + top-to-bottom wash, applied to the header too**
  (2026-09-18 follow-up): `assets/img/noise.png` was regenerated as RGBA
  (full 0–255 per-pixel value, alpha 22/255 — was fully-opaque with only
  ±6 variance around the paper tone, looked more like faint fuzz than
  grain) for a noticeably grainier look. Added a `--bg-wash` gradient
  token (`linear-gradient(to bottom, #FAF9F5, #F2F1ED)`, lighter at top /
  darker at bottom) in `:root`. Both `body` and `.site-header` now share
  `background-image: var(--bg-wash), var(--bg-noise)` with
  `background-attachment: fixed` on both layers on both elements — the
  shared `fixed` attachment is what keeps the header's background
  pixel-aligned with the page's as you scroll (no seam), even though the
  header is `position: sticky` not `fixed` — `background-attachment`
  only affects how the *background* tracks the viewport, independent of
  the element's own positioning. If any other element needs the same
  treatment later (e.g. the mobile nav dropdown), reuse `var(--bg-wash),
  var(--bg-noise)` the same way rather than inventing a new gradient.
- **Wider layout for large screens** (2026-09-18 follow-up): on a
  MacBook-width viewport the 1040px content column left too much empty
  white space on either side. `--content-max` is now `1320px` (was
  `1040px`) and `--gutter` is `clamp(1.25rem, 5vw, 5rem)` (was
  `clamp(1.25rem, 4vw, 3rem)`) in style.css `:root` — closer to how a
  site like anthropic.com uses screen width. Mobile is unaffected (the
  clamp's minimum is unchanged). Individual text blocks (`.max-w-prose`,
  `.hero .lede`) already cap line length independently, so widening the
  container doesn't create overly long text lines.
- **Dark mode**: not implemented — light-only "paper" background as
  originally specced.
- **Translations**: Claude translated CV content (German → English) and
  project descriptions (English → German) so both languages are fully
  populated from day one, not left as placeholders. Paul should review
  wording on both sides.
- **Scope**: a `blog.html` "Notes" page was added beyond the original
  5-page spec (inspired by the reference site's blog/writing section),
  then **removed again on 2026-09-18 at Paul's request**, along with
  `activities.html` — both were still empty placeholders with nothing
  real to show, so he cut them rather than keep unfinished nav items.
  Current page set: Home, Career, Projects (+ per-project detail pages),
  Contact. Don't re-add either page without Paul asking again — if he
  wants a notes/blog or activities section later, treat it as a new
  request, not a restoration of the old placeholder.
- Photo crop: used `object-fit: cover; object-position: center 20%` in
  CSS on the raw square portrait — no separate cropped asset made.
- **Project cards** (2026-09-18 follow-up): cards were too text-heavy, so
  they were cut down to a one-line teaser + tags, made fully clickable
  (whole `<a class="card">`). The full write-up moved to a dedicated
  `project-<slug>.html` page per project. No "Mehr erfahren" link text —
  the whole card is the affordance.
- **testware.dev real thumbnail** (2026-09-18, then revised 2026-09-19):
  swapped the pictogram placeholder for a real screenshot on
  testware.dev only — `assets/img/testware-thumb.png` (1922×1080,
  Paul's own screenshot of the app's "Spin up a twin" landing view),
  used as an `<img>` inside `.card-thumb` (index.html + projects.html
  cards), `object-fit: cover; object-position: center 65%`. **Not**
  used in `.detail-thumb` anymore, though — see the 2026-09-19 note
  below, `.detail-thumb` reverted to the pictogram for every project.
  The other 5 projects still use their pictogram + grid-placeholder
  card thumbnail (see below); swap a project's *card* thumbnail the
  same way if Paul provides a real photo for it, but leave its
  `.detail-thumb` on the pictogram per that same note.
- **Wilhelmstraße 5 real thumbnail** (2026-09-18, then revised
  2026-09-19): same card-thumbnail treatment for the second project —
  Paul supplied `IMG_5736.HEIC` (a portrait photo of the actual
  construction site: scaffolding + timber roof structure). HEIC isn't
  web-viewable, so it was converted via macOS `sips -s format jpeg`
  (Pillow can't read HEIC without the `pillow-heif` plugin, which isn't
  installed), then resized to 1000px wide / quality 78 and saved as
  `assets/img/wilhelmstrasse-5-thumb.jpg` (~175KB). Used in
  `.card-thumb` with a **per-image inline `style="object-position:
  center 78%;"`** (this photo is portrait-oriented with a lot of empty
  sky at the top, needs a lower crop bias than testware's screenshot —
  check any future photo's crop individually rather than assuming the
  shared default works) — and also reused inside the gallery (see the
  gallery notes above). **Not** used in `.detail-thumb` — reverted to
  the pictogram, see the note directly below.
- **`.detail-thumb` reverted to pictogram everywhere** (2026-09-19):
  Paul didn't want the same photo shown a third time (card thumbnail +
  now the gallery, for Wilhelmstraße) or a second time (card thumbnail,
  for testware) right next to the project description too — that spot
  (`.detail-thumb` in the `.detail-layout` section, beside the
  description paragraph(s)) is now back to the `.detail-logo` pictogram
  for **every** project, including testware.dev and Wilhelmstraße 5.
  The real photos still live in `.card-thumb` (both projects) and in
  the gallery (Wilhelmstraße only) — just not duplicated again in this
  specific spot. If a future project gets a real photo, keep it out of
  `.detail-thumb` too unless Paul asks otherwise.
- **Live site + GitHub links** (2026-09-18, done): `project-testware.html`
  now has a `.btn-row` under the tags with two external links, confirmed
  by Paul: `https://testware.dev` (primary button, "Website besuchen ↗")
  and `https://github.com/thegr8paul/testware-frontend` (ghost button,
  "Code auf GitHub ↗"), both `target="_blank" rel="noopener"`. No other
  project has real external links yet — ask Paul before assuming a repo
  URL pattern (thegr8paul/testware-frontend isn't a simple slug of the
  project name, so don't guess others the same way).
- **Placeholder images + logo badge** (2026-09-18 follow-up): since no
  real project photos exist for the *other* projects, `.card-thumb` / `.detail-thumb` now show a
  blueprint/graph-paper grid pattern (pure CSS `repeating-linear-gradient`,
  no image file) as a placeholder image. The project's inline-SVG
  pictogram sits on top as a small square "logo" badge
  (`.card-logo` / `.detail-logo`) in the top-left corner, paper background,
  hairline border. When Paul has real photos: replace the grid
  background-image on `.card-thumb`/`.detail-thumb` with an `<img>`, and
  keep the logo badge overlapping top-left as-is.
- **testware.dev demo video** (2026-09-18, done): `project-testware.html`
  has a "Demo" section with a real screen-capture video at
  `assets/video/testware-demo.mp4` (14MB, 1920px wide, H.264, no audio —
  compressed down from the original 66MB/3456px/`output_1.25x_no_audio.mp4`
  Paul supplied via `ffmpeg -vf scale=1920:-2 -crf 26 -preset slow -an
  -movflags +faststart`). It's ~3.5 minutes long, `<video>` has
  `autoplay muted loop playsinline` (muted is required for autoplay to
  work in browsers). **No native `controls`** — the browser's built-in
  control bar darkens/dims the whole video on hover (Safari and Chrome
  both do this to raise contrast for the native UI), which Paul didn't
  want. Instead there's a custom `.video-toggle` button (play/pause only,
  no scrub bar) absolutely positioned bottom-right, opacity 0 by default,
  fades in on `.video-frame:hover` — wired up in `main.js`
  (`initVideoToggles()`, runs on every page unconditionally, matches any
  `.video-frame` + `.video-toggle` pair). `.video-frame` is sized large
  and centered (`max-width: 960px; margin-inline: auto`). If Paul
  supplies a shorter/updated cut later, just swap the file at the same
  path (or update the `src`) — same compression command applies to any
  future project video, and the same `.video-frame`/`.video-toggle`
  markup pattern (see `project-testware.html`) should be reused rather
  than adding native `controls` again.
- **Scrub bar + video fill fix** (2026-09-18 follow-up): replaced the
  hover-overlay toolbar (play/pause + ±10s skip buttons on top of the
  video) with a normal-player-style bar *below* the video image — Paul
  wanted proper click/drag-to-seek, not fixed ±10s jumps, and wanted it
  out of the video frame rather than overlaid. Markup: `.video-block`
  wraps `.video-frame` (unchanged) + a new `.video-bar` containing the
  play/pause `.video-toggle` button, a native `<input type="range"
  class="video-seek">` (styled via CSS custom property `--progress`,
  updated on `timeupdate`), and a `.video-time` "m:ss / m:ss" label.
  Always visible (not hover-fade, since it's no longer covering the
  video) — see `initVideoToggles()` in `main.js` for the wiring
  (`timeupdate`/`loadedmetadata`/`input`/`change` listeners). The
  `.video-controls` pill and `[data-action]` skip buttons from the
  previous iteration are gone; don't reintroduce them without asking —
  the scrub bar supersedes that approach.
  Also fixed `<video>` not fully covering `.video-frame` (grid background
  was peeking through at the bottom) — switched from flexbox
  centering + `width/height:100%` to `position:absolute; inset:0;` on
  the `<video>` itself, which reliably fills the container regardless of
  the source's exact aspect ratio (guards against flex/aspect-ratio
  percentage-sizing quirks). The old flex-centered layout is preserved
  only for the placeholder state via `.video-frame.is-placeholder` (add
  that class if a future project shows the "Video folgt" placeholder
  again — see the icon+label CSS still in style.css).
  **Local testing gotcha**: `python3 -m http.server` (the README's
  suggested local server) does NOT support HTTP Range requests, so
  seeking a video locally silently resets to ~0 — this is a dev-server
  limitation, not a bug in the seek code (verified working correctly
  against `npx serve`, and GitHub Pages' actual hosting supports Range
  requests fine). Don't "fix" the seek logic based on local testing with
  `http.server` — test video-seeking with `npx serve .` instead if
  verification is needed.
- **Video full container width, flush left** (2026-09-18 follow-up):
  `.video-block` no longer has `max-width: 960px; margin-inline: auto`
  (that centered it as a narrower island, not aligned with the text
  above/around it) — it's now just `width: 100%`, so it spans the same
  width as the rest of the `.container` content and lines up flush left
  with the heading/paragraphs like Paul wanted.

- **Image gallery on project detail pages** (2026-09-18, current design
  — went through 3 iterations the same day, this is the FINAL one, don't
  resurrect the earlier scroll/peek versions): a single-slide "luxury
  hotel gallery" style component, first used on
  `project-wilhelmstrasse-5.html`. No heading/label above it — when a
  project page has a `.gallery`, it gets no "Galerie" label/h2/intro
  text, just the gallery straight away.
  Markup: `.gallery > .gallery-stage > figure.gallery-slide >
  .slide-media` (one `.slide-media` per photo), where `.slide-media`
  wraps `.slide-image` (holds the `<img>`, or is empty with
  `.gallery-slide.is-placeholder` for the blueprint-grid "no photo yet"
  look) plus a `<figcaption class="slide-caption">`.
  **Layout (2026-09-19, current):** the image sits centered horizontally
  in the stage (`.gallery-slide { display: flex; align-items: center;
  justify-content: center; }`), and the caption sits *below* it,
  left-aligned to the image's own left edge — not the stage's edge —
  which is why `.slide-media` is a plain `flex-direction: column` box
  that shrink-wraps to the image's width (`.slide-image` has a fixed
  `height` + `aspect-ratio`, not `width: 100%`); `.slide-caption` then
  naturally spans that same shrink-wrapped width and `text-align: left`
  puts its text flush with the image's left edge. (An earlier version
  had the caption to the image's *right*, bottom-aligned — Paul changed
  his mind; don't revert to that.)
  **Sizing math gotcha**: `.slide-image`'s vw-based height is capped at
  48vw specifically so that `1.5 × height` (its width, via the 3:2
  `aspect-ratio`) never exceeds the ~78% of viewport width that
  `.gallery`'s `padding-inline: 11%` leaves available — go higher than
  ~52vw here and the image starts overflowing past the gallery's
  padding at medium viewport widths (verified 0px horizontal page
  overflow at 390/1024/1728px viewports with 48vw; re-check the same
  way before increasing it further).
  Exactly one slide is visible at a time — no scrolling, no neighboring
  slides peeking in (Paul explicitly reversed an earlier peek-carousel
  version). All slides are stacked via `position: absolute; inset: 0`
  inside `.gallery-stage` (`overflow: hidden`, height via
  `clamp(360px, 54vw, 720px)` — bumped up from an initial
  `clamp(300px, 40vw, 500px)` when Paul asked for the image "much
  bigger"; `.slide-image` itself is `clamp(280px, 48vw, 640px)` height
  with `aspect-ratio: 3/2`), positioned with `transform: translateX((i
  - current) * 100%)` computed in `main.js` `initGalleries()`. Clicking
  `.gallery-prev`/`.gallery-next` changes `current` and re-renders, and
  the CSS `transition: transform 0.6s cubic-bezier(...)` on
  `.gallery-slide` animates all slides sliding together — this is what
  gives the "current image slides out left, next slides in from the
  right" effect (and the mirrored version going backwards). `current`
  wraps around (`(current + direction + slides.length) % slides.length`)
  so prev/next both work from any position, including wrapping past the
  first/last slide.
  `.gallery` is still full-bleed (`width: 100vw; margin-inline: calc(50%
  - 50vw)`) independent of `.container`'s own padding/max-width — that
  part survived from the peek-carousel iteration and still applies since
  Paul wants it large/edge-to-edge, just without the neighbor-peeking.
  A portrait photo cropped into the wide slide box needs `object-position`
  tuned per image (inline `style` on that `<img>`) — don't assume one
  default works for every future photo.
  **Important — how to add a new photo (no build step, by design):**
  there is no automatic folder-scanning. A static site served from
  GitHub Pages cannot list a folder's contents in the browser, so
  "drop a file in and it just appears" isn't achievable without adding
  either a server or a build step — neither of which fits this site's
  "plain HTML/CSS/JS, no build step" rule. The actual workflow: (1) put
  the image file in `assets/img/gallery/<project-slug>/`, (2) replace
  one `figure.gallery-slide.is-placeholder` in that project's HTML with
  a real one: drop `is-placeholder` from the class, add
  `<img src="assets/img/gallery/<project-slug>/<file>" alt="...">`
  inside its (now non-empty) `.slide-image`, and give the `<figcaption>`
  a real `data-de`/`data-en` caption instead of "Bild folgt" (or add a
  whole new `<figure class="gallery-slide">...` before the remaining
  placeholders). That small HTML edit *is* the "manifest" — keep it
  that simple, don't build a
  JSON manifest or a scanner script for this without Paul explicitly
  asking for it (he was asked once whether he wanted a manual-list vs.
  a script-based approach and didn't pick either — don't assume he
  wants the script version later without asking again).

- **Tags page** (2026-09-19, done): added `tags.html`, modeled on
  andlukyane.com/project's Tags page (grouped category boxes of pill
  tags with counts) but populated with Paul's own tag taxonomy — the
  same 6 categories/colors already used on project cards
  (`--tag-ai`/`--tag-collab`/`--tag-bim`/`--tag-impact`/
  `--tag-software`/`--tag-design`). Added to the header nav
  (`partials/header.html`, between Projects and Contact). Each tag is
  an `<a class="tag tag-*">` linking to `projects.html?tag=<slug>`
  (slug = lowercase, spaces→hyphens, e.g. "Parametric Design" →
  `parametric-design`). Counts are currently all `(1)` since every tag
  is used by exactly one project right now — these are hand-written in
  the HTML, not computed; if a tag gets reused by a second project,
  update its count by hand (no build step to compute this
  automatically, consistent with the rest of the site).
  **Filtering**: every `.card` on `index.html`/`projects.html` got a
  `data-tags="slug1 slug2 ..."` attribute (space-separated slugs
  matching the ones tags.html links to). `main.js`
  `initTagFilter()` reads a `?tag=` query param on page load, hides
  (`el.hidden = true`) any `.card` whose `data-tags` doesn't contain it,
  then hides any `.section` whose `.card-grid` ended up with zero
  visible cards (avoids an orphaned category heading with no cards
  under it). It also shows a `#tag-filter-notice` element (already in
  `projects.html`, `hidden` by default) with "Filtered by: X · Show
  all" and a link back to the unfiltered `projects.html`.
  Added a global `[hidden] { display: none !important; }` rule to
  style.css — needed because `.card` sets `display: flex`, which at
  equal CSS specificity to the browser's built-in `[hidden]` rule can
  win and silently keep a "hidden" card visible; the `!important`
  guarantees `el.hidden = true` always works project-wide, not just for
  this feature.
  **Local-server gotcha (like the video Range-request one)**: `npx
  serve` redirects clean URLs (e.g. `/projects.html` → `/projects`) and
  its redirect strips the query string entirely — a `?tag=...` link
  will silently lose its filter when testing with `npx serve`. This is
  a `serve`-specific bug, not a bug in the filtering code (verified
  working correctly with `python3 -m http.server`, which doesn't
  redirect `.html` URLs at all) and GitHub Pages serves `.html` files
  directly without any clean-URL redirect, so it's unaffected in
  production. Don't debug the tag filter using `npx serve` — use
  `python3 -m http.server` instead (just remember *that* server can't
  do Range requests, so it's still wrong for testing video seeking —
  there is no single local server that gets both right).
- **Planify demo video + project rename** (2026-09-19, done): Paul
  supplied `planify-video.mp4` (60s, 1920×1080, H.264+AAC audio,
  18.7MB) via Downloads. Compressed with the same `ffmpeg` recipe as
  testware's video but keeping audio this time (`-c:a aac -b:a 128k`,
  no `-an`) since this file actually has a soundtrack — down to 3.0MB —
  saved as `assets/video/floorplan-generator-demo.mp4` (filename kept
  as-is, only the project/page identity changed — not worth renaming
  the asset too). Wired up with the exact same
  `.video-block`/`.video-frame`/`.video-bar` markup as testware.dev
  (autoplay muted loop playsinline, custom play/pause + scrub bar, no
  native controls) — Paul explicitly asked for this project's video to
  match testware's setup exactly.
  **The video's title revealed a real mistake**: the on-screen title
  read "Planify — plans made simple", not "Algorithmic Floorplan
  Generator" (the name this project had been using, inherited from
  career.html's CV content, which credited it to the ICD/Prof. Wortmann
  academic collaboration). Paul confirmed these are **the same
  project** and the ICD/Wortmann framing was simply wrong — the real
  story: Planify is a floorplan app he built with a collaborator named
  Magnus, their entry project into Python, so anyone can better
  visualize spatial proportions themselves. The backend was fully
  hand-built without AI; only the frontend was AI-generated.
  Self-hosted, built with Three.js and Python.
  **Everything renamed accordingly**: the project file
  `project-floorplan-generator.html` → `project-planify.html` (old file
  deleted, all `href`s updated on `index.html`/`projects.html`), H1 →
  "Planify", the ICD/Wortmann description paragraph replaced with the
  Magnus/Python/no-AI-backend story above, the card teaser text on
  `projects.html` updated, and the CV bullet in `career.html` (under
  the 2020–2023 Bachelor's-degree entry) corrected from the ICD/Wortmann
  wording to "Planify — Grundriss-App als Einstiegsprojekt in Python,
  gemeinsam mit Magnus entwickelt". The video/demo section heading is
  now "Planify in Aktion" / "Planify in action". Don't reintroduce the
  ICD/Wortmann framing anywhere — that was the actual error, not a
  simplification.
  **New local-testing gotcha found here**: Playwright's default headless
  Chromium launch did NOT autoplay this video (stayed paused at
  currentTime≈0) even though it's muted+autoplay — but testware's
  audio-less video autoplayed fine under the exact same test setup.
  Adding `args: ['--autoplay-policy=no-user-gesture-required']` to
  `chromium.launch()` fixed it in the test harness, confirming it's a
  headless-Chromium default-policy quirk specifically triggered by
  muted-but-has-an-audio-track videos, not a bug in the video or the
  markup — real browsers (Safari/Chrome/Firefox, desktop or mobile) do
  not apply this stricter policy and autoplay muted video regardless of
  whether it has an audio track, which is why testware's and this
  video both work fine for actual site visitors. If a future headless
  test of an autoplay video with audio appears "stuck paused", don't
  chase it as a code bug — pass that Chromium launch flag instead (or
  just trust manual `.play()` succeeding, as verified here, and move
  on).
- **Project cards: minimal portrait image + mini title, no text on the
  card at all** (2026-09-19, current design — supersedes every earlier
  card layout note above, including "Cards fully white" and "Cards:
  shadow at rest, border only on hover"; those two are still true, just
  now apply to `.card-thumb` instead of `.card`). Between the last
  documented iteration and this one, Paul had also been experimenting
  directly in the CSS/HTML with an overlay-caption style (dark scrim +
  white text at the bottom of the image, inside a `.card-body`) — that
  was a work-in-progress, not a final direction, and this note's design
  replaces it. Final structure per card:
  `<a class="card"><div class="card-thumb">…image or
  placeholder+pictogram…</div><h3 class="card-title">Name</h3></a>` —
  no description paragraph, no tags, no overlay, nothing on the image
  itself. `.card-thumb` is portrait (`aspect-ratio: 3/4`, was 16/10
  landscape) and carries all the visual treatment (white background,
  blueprint-grid placeholder, layered shadow, hover border+shadow+lift —
  hover now targets `.card:hover .card-thumb`, not `.card` itself,
  since `.card` is just a plain flex column wrapper with no visual
  styling of its own anymore). `.card-title` is small
  (`font-size: 0.85rem`), left-aligned, sits *below* the image as a
  plain-text caption — not boxed, not overlaid. `.card-grid`'s column
  minimum dropped to 220px (was 280px) since portrait cards read better
  narrower. Card descriptions/tags still exist and are still shown on
  each project's own detail page (`project-*.html`) and on `tags.html`
  — they were only removed from the card/grid views. Don't reintroduce
  a paragraph, tags, or an image overlay onto `.card` without Paul
  asking again — this was an explicit "no text at all except the mini
  title" instruction.
- **Wilhelmstraße 5 gallery filled with real photos** (2026-09-19, done):
  Paul dropped 9 files into `assets/img/gallery/wilhelmstrasse-5/`
  (6 site photos, 2 architectural-section renders — a laser-scan
  point-cloud section and the matching BIM-model section — and 1
  facade rendering). Followed the documented no-build-step workflow:
  each placeholder `.gallery-slide.is-placeholder` was swapped for a
  real `<figure class="gallery-slide">` with an `<img>` and a real
  caption. All 9 raw source files (82MB total — some over 10MB each,
  one had transparency) were processed with Pillow (EXIF-transpose,
  flatten any alpha to white, resize so the long edge is ≤1600px, save
  as JPEG q82) into new files with descriptive names (e.g.
  `wilhelmstrasse-scan-schnitt.jpg`), and **the bulky originals were
  then deleted** — total footage dropped from 82MB to ~2.5MB. Don't
  leave multi-MB raw phone photos sitting in `assets/` even if unused
  by any page; process-then-delete like this every time.
  **Gotcha**: one of the 9 files (`IMG_5736.jpeg`) was pixel-identical
  to the photo already used as `assets/img/wilhelmstrasse-5-thumb.jpg`
  (the card/detail thumbnail) — it wasn't a new photo, just a re-export
  of one already on the site. It was left out of the gallery (the
  existing thumbnail is reused as one of the 9 gallery slides instead,
  captioned "Gerüst & Dachstuhl") rather than showing the same shot
  twice. Check new batches of photos against what's already in use
  before assuming every file is new content.
  Final slide order (a deliberate before/after narrative, not upload
  order): laser-scan point cloud → BIM model → facade rendering →
  existing Fachwerk → roof structure (interior, then with crane) →
  view through a window opening → exterior scaffolding (the reused
  thumbnail) → scaffolding with the church spire. Landscape source
  photos crop directly into the gallery's 3:2 `.slide-image`; portrait
  ones (the render, the two crane/tower shots) needed a tuned inline
  `object-position` to keep the interesting part of the frame in view
  — same per-image approach documented earlier in this file, not a new
  pattern.

- **"Konstruktionsüberwachung Web-App" re-scoped to "Nextcloud für
  Architekturbüros"** (2026-09-19): Paul clarified this was never meant
  to be a laser-scanning/BIM item — BIM & laser scanning (Bestandsaufmaß)
  and this project (an architecture office's internal organization/
  cost-controlling) are two separate things and shouldn't share a
  category. The category heading on `projects.html` changed from "BIM &
  Laserscanning" to "Architekturbüro-Organisation" (for now, still just
  the one card in it — Paul explicitly said "BIM bleibt bestehen", i.e.
  don't touch the existing BIM/laser-scanning tags elsewhere, they still
  live on the Wilhelmstraße 5 project). The project itself is now
  described as: setting up a self-hosted Nextcloud server for Schwär
  Architektur (open source instead of a paid SaaS cloud), owned by the
  office and customized to its workflows, with common integrations set
  up simple enough for the office owner (non-technical) to manage
  herself; an AI is now wired into the database, running in the cloud
  but hosted in Germany on open-source models only, so no data leaves to
  third parties; this setup also underlies the office's cost
  controlling. Old tags `Web`/`SQL`/`Dashboard` were replaced with
  `Nextcloud`/`Open Source`/`KI`/`Controlling` everywhere (card,
  detail-page tags, `tags.html` — `KI` filed under the "KI & Daten"
  group, the other three under "Software & Tools"). File renamed
  `project-konstruktionsueberwachung.html` →
  `project-nextcloud-architekturbuero.html`. If Paul later wants a
  genuine separate BIM/laser-scanning ("Bestandsaufmaß") project card,
  that's a new project to add, not a restoration of this one.

- **Gallery ordering: numeric filename prefixes, still no manifest/script**
  (2026-09-20): Paul asked for gallery photos to "automatically" appear in
  the order he names them in Finder. Asked explicitly which approach he
  wanted (per the standing note above that this needed his decision) — he
  picked the manual option, not a JS-driven manifest. So there is still no
  scanning/sorting logic: files in `assets/img/gallery/<project-slug>/`
  are simply renamed with a two-digit prefix (`01-`, `02-`, …) matching the
  order Paul wants, and the `<figure class="gallery-slide">` blocks in the
  project's HTML are kept in that same order by hand — exactly the
  existing manual workflow above, just with the prefix as the shared
  source of truth between the folder and the HTML instead of relying on
  memory. Applied to `wilhelmstrasse-5`: all 7 existing gallery files got
  `01-`…`07-` prefixes (`assets/img/wilhelmstrasse-5-thumb.jpg`, reused as
  slide 7 in the HTML, lives outside this folder and was intentionally
  left unrenamed/unnumbered — the gap in the folder's own 01–09 sequence
  where it sits is expected, not a mistake). Two new raw photos Paul
  dropped in as `<uuid> 2.JPG` (interior stud-wall framing + insulation
  membrane, and a view through new interior walls with window openings —
  the next construction phase after the roof/scaffolding shots) were
  processed with the same Pillow recipe as the original 9-photo batch
  (EXIF-transpose, flatten alpha, resize long edge ≤1600px, JPEG q82,
  raw originals deleted after) and appended as `08-wilhelmstrasse-
  innenausbau-daemmung.jpg` / `09-wilhelmstrasse-innenwaende-fenster.jpg`,
  new slides at the end of the gallery (chronologically newest phase).
  **For the next batch of photos on any project**: name the files with a
  matching numeric prefix for the order you want, drop them in that
  project's gallery folder, and either ask an agent to wire up the
  `<figure>` blocks in that order or do it by hand — there is still no
  script that reads the folder, by design.

- **SolFibreHouse gallery built from scratch + PDF pages as slides**
  (2026-09-20): `project-solfibrehouse.html` had a `.gallery` block from
  early on referencing files like `solfibre-strassenfoto.jpg` that never
  actually existed in `assets/img/gallery/solfibrehouse/` — a fully
  invented placeholder gallery (broken image icons in production, easy to
  miss since nothing else on the page depends on those files). Paul
  dropped 10 real source files into that folder already numbered
  `01_…`–`10_…` per the naming convention above (two Photoshop/Grasshopper
  renders, five screenshots, three single-page PDFs — two floor plans
  and a form-finding/roof-structure/solar-analysis/apartment-types/
  Grasshopper-definition set) and asked for both the images AND the PDFs
  to go into the gallery "exactly like the images." **PDFs are treated
  as single images, not as embedded/linked documents**: each PDF page
  was rasterized once with `pdftoppm -jpeg -r 200` (poppler, already on
  the machine — no new dependency), then run through the same Pillow
  pipeline as the photos (resize long edge ≤1600px, save as JPEG,
  originals/PDFs deleted after). This matches the "no build step, plain
  HTML" rule — the PDF is pre-flattened to a JPG at authoring time, the
  page never loads/renders a PDF at runtime. Reused for any future
  project: `pdftoppm -jpeg -r 200 file.pdf output-basename` (add `-f N -l
  N` for a specific page if a PDF has more than one and only one should
  go in).
  **Quality tuning**: photographic renders/photos kept at JPEG q82-84
  like Wilhelmstraße; line-art/diagrams/screenshots (floor plans,
  Grasshopper canvas, isometric diagrams) were saved at q90-92 instead —
  q82 on thin black hairlines over white showed visible ringing/blur
  around the lines at this resize target, q90+ did not. Use q90+ for any
  future line-drawing/screenshot gallery content, q82-84 stays right for
  photos/renders.
  **Layout choice**: photographic content (existing-building photo,
  interior render) uses the default `.slide-image`/`.slide-image--
  portrait` cropped-cover treatment like Wilhelmstraße; every line-art/
  diagram/plan/screenshot slide instead uses `style="background-color:
  #FFFFFF;"` on `.slide-image` plus `style="object-fit: contain;"` on
  the `<img>` (the same pattern the original invented placeholder
  gallery already used for isometric drawings) so the full drawing stays
  legible instead of being cropped — picked portrait vs. landscape
  `.slide-image` box per drawing's own aspect ratio to minimize
  letterboxing, not applied uniformly.
  **Final slide order** (concept → result → validation → tool, not
  upload order — same "deliberate narrative" approach as Wilhelmstraße):
  existing building (street photo) → form-finding process (Nähen/
  Hängeform/Rotate) → design-strategy diagram sheet (Trennwand/
  Erschließung/Balkone/Wandscheiben/Funktionskerne) → roof structure
  plan view → interior rendering → Grundriss EG → Grundriss OG →
  apartment-types overview (all 6 units) → solar analysis (direkte
  Sonnenstunden / einfallende Strahlung — ties back to the "Sol" in
  SolFibreHouse) → Grasshopper definition. Files renamed accordingly to
  `01-solfibre-…jpg` through `10-solfibre-…jpg`; this was an editorial
  call made without asking Paul first (same as the Wilhelmstraße note
  above already established as acceptable) — flag it to him for review
  rather than treating it as fixed if he wants to reorder later.

- **All project images consolidated into one gallery folder per project**
  (2026-09-20): before this, `assets/img/gallery/` only had folders for
  3 of the 6 projects (bamboo-study-hub, solfibrehouse, wilhelmstrasse-5)
  — the other project images (testware's card thumbnail, Wilhelmstraße's
  card-thumbnail render *and* the separate photo reused inside its
  gallery, Nextcloud's card thumbnail and its one in-page photo) were
  sitting loose directly in `assets/img/`, inconsistent with everything
  else. Paul asked for exactly one `assets/img/gallery/<project-slug>/`
  folder per project (6 total, matching the 6 `project-*.html` files)
  with **every** image belonging to that project inside it — not just
  the ones in the `.gallery` carousel, but card thumbnails and any
  single in-page `<figure class="detail-image">` too. Moved (filenames
  kept as-is, no renumbering needed since these aren't part of an
  ordered carousel): `testware-thumb.png` → `gallery/testware/`;
  `wilhelmstrasse-5-thumb-render.png` (card thumbnail) and
  `wilhelmstrasse-5-thumb.jpg` (the photo reused as gallery slide 7,
  note these are two *different* files despite the near-identical name —
  don't confuse them) → `gallery/wilhelmstrasse-5/`;
  `nextcloud-dashboard-thumb.jpg` (card thumbnail) and
  `nextcloud-team-ordner.jpg` (the `.detail-image` figure on
  `project-nextcloud-architekturbuero.html`) → new
  `gallery/nextcloud-architekturbuero/`. Also created an empty
  `gallery/planify/` — Planify has no images at all yet (just the demo
  video), but the folder exists now so every project has exactly one,
  ready for whenever Paul adds photos there; don't delete it for being
  empty. All `<img src>` references on `index.html`, `projects.html`,
  `project-nextcloud-architekturbuero.html` and
  `project-wilhelmstrasse-5.html` updated to the new paths and verified
  (every `assets/img/...` reference site-wide resolves to a real file;
  screenshotted `projects.html`/`index.html` to confirm thumbnails still
  render). `assets/img/` root now holds only truly site-wide, non-project
  assets: `portrait.png` (used), `portrait.jpg` (already unused/stray
  per the note above, left alone — not a project image so out of scope
  here), and `noise.png` (background grain texture). **Going forward**:
  any new image or PDF-derived image for a project goes straight into
  that project's `gallery/<slug>/` folder, never loose in `assets/img/`
  — this applies to card thumbnails and one-off detail-page figures too,
  not just `.gallery` carousel slides.

- **Body/heading font switched from Public Sans to self-hosted Antique
  Legacy** (2026-09-20): Paul supplied `Antique-Legacy-Semiboldotf.ttf`
  and `Antique-Legacy-Boldotf.ttf` (from his Downloads folder) and asked
  for `--font-sans` to use this instead of Public Sans everywhere
  (headings, body copy, card titles, buttons, nav — everything not
  explicitly pinned to `--font-mono`, which is untouched and still IBM
  Plex Mono for tags/labels/captions/timestamps — see the Type note
  above for the full current split). Files copied as-is (no woff2
  conversion — each is already only ~90KB, and serving raw `.ttf` via
  `@font-face` needs no build tooling, consistent with the site's
  no-build-step rule) into `assets/fonts/AntiqueLegacy-{Semibold,
  Bold}.ttf`, registered with two `@font-face` rules at the top of
  `style.css` (`font-weight: 600` / `700` respectively), and
  `--font-sans` repointed to `"Antique Legacy"` first in the stack. The
  now-unused `Public+Sans:wght@400;500;600;700` half of the Google Fonts
  `<link>` was dropped from all 13 HTML `<head>`s (grep for
  `fonts.googleapis.com/css2` if adding a 14th page later — copy that
  line, not an old cached one) — only `IBM+Plex+Mono:wght@400;500` is
  still loaded from Google Fonts.
  **Important gap**: Antique Legacy only ships Semibold (600) and Bold
  (700) — Paul did not supply a regular/400 weight. Body paragraphs
  (`p`, set at the browser default `font-weight: 400`) still use
  `var(--font-sans)` and therefore render in the nearest *registered*
  weight, which is 600 (Semibold) — there is no lighter face to fall
  back to, so all body copy site-wide now reads noticeably heavier/
  bolder than a typical paragraph weight, not just headings. Paul was
  told this before the change and asked to proceed anyway. If a lighter
  weight file becomes available later, add a third `@font-face` at
  `font-weight: 400` the same way — don't restructure the other two.
  If Paul instead wants body text lighter without a new font file, the
  fix is a separate lighter font-family for `p`/body content only (a
  second variable, e.g. `--font-sans-body`), not reverting this one —
  ask which he prefers rather than assuming.

- **Background flattened to plain white, wash gradient + grain removed**
  (2026-09-20): Paul asked for the background to be fully white. Removed
  the `--bg-wash` (top-lighter/bottom-darker gradient) and `--bg-noise`
  (`assets/img/noise.png` grain texture) custom properties and their use
  on `body`/`.site-header` (both previously layered
  `background-image: var(--bg-wash), var(--bg-noise)` with
  `background-attachment: fixed` to stay pixel-aligned while scrolling —
  see the 2026-09-18 grain/wash notes above, now superseded). `--paper`
  changed from `#F7F6F2` to `#FFFFFF`; `body`/`.site-header` now just
  `background-color: var(--paper)`, no background-image at all.
  `noise.png` itself was left on disk (unreferenced now, harmless) in
  case Paul wants texture back later — don't delete it without asking.
  `--mist` (`#EEF1EC`, used for smaller panel backgrounds elsewhere) was
  **not** touched — only the page-wide body/header background was in
  scope here. If Paul later wants those panels white too, that's a
  separate ask, not implied by this one.

- **Schwarzwaldhaus gallery populated from real uploads, card thumbnail
  wired to slide 1** (2026-09-21): `project-schwarzwaldhaus.html` and its
  `assets/img/gallery/schwarzwaldhaus/` folder, plus a featured card on
  `projects.html`, already existed as of this entry — a 7th project (BIM/
  laser-scanning of a Black Forest building, `Laserscanning` `Punktwolke`
  `BIM` `Cloud-Computing` tags) added outside this session's visible
  history. Its `.gallery` had the same "invented placeholder" problem as
  SolFibreHouse originally did: 5 `<figure>` slides referencing files
  (`01-schwarzwaldhaus-scanner-vor-ort.jpg` etc.) that didn't exist yet,
  and the card thumbnail pointed at a nonexistent
  `schwarzwaldhaus-thumb.jpg`. Paul dropped 9 raw files into the gallery
  folder (2 on-site phone photos of the scanner in use, 7 point-cloud
  viewer screenshots of the finished scan) and asked for them in the
  gallery with the first image also used as the card thumbnail — same
  process as every prior gallery batch on this site (numbered-prefix
  rename, Pillow resize/compress, raw originals deleted, `.DS_Store`
  removed). One screenshot (`13.08.46`, a near-duplicate front-elevation
  angle of `13.06.46` — different crop, not pixel-identical, but adding
  no real new information) was left out of the gallery, same judgment
  call as the Wilhelmstraße "check new batches against what's already
  useful" note. Final 8 slides, in a process→result narrative (matches
  the "deliberate narrative, not upload order" pattern established for
  Wilhelmstraße/SolFibreHouse): scanner on-site (exterior, then in the
  roof structure) → point cloud exterior overview → front elevation →
  entrance → gable end → two facade detail/close-up angles. The two
  on-site photos use the default cropped-cover `.slide-image--portrait`
  treatment (photographic content); all 6 point-cloud screenshots use
  `background-color: #FFFFFF` + `object-fit: contain` (they're already
  rendered on a flat white viewport background — confirmed via alpha
  channel inspection, fully opaque, not real transparency — so no
  flatten-to-white step was needed in Pillow, just a straight RGB
  convert) so the whole building silhouette stays visible rather than
  being cropped. A couple of the raw screenshots carry a small "3D View
  1" label baked in from the point-cloud viewer's own UI (top-left/
  top-right corner) — left as-is, consistent with not touching screenshot
  content beyond resize/compress elsewhere on this site. Card thumbnail
  on `projects.html` now points directly at
  `01-schwarzwaldhaus-scanner-vor-ort.jpg` (same file as gallery slide 1,
  no separate thumb copy) — same pattern as SolFibreHouse's card. Files
  live at `assets/img/gallery/schwarzwaldhaus/01-…jpg` through `08-…jpg`.

- **Wilhelmstraße 5: card thumbnail swapped, 2 new gallery slides
  appended, one contains sensitive pricing — Paul confirmed keep as-is**
  (2026-09-21): Paul dropped two new screenshots into
  `assets/img/gallery/wilhelmstrasse-5/` — an interior laser-scan point
  cloud (a striking multi-floor "cutaway" view, landscape, no white-
  background isolation, fills the whole frame like a photo) and a
  Leistungsverzeichnis/cost-comparison screenshot (a 3D-model viewer
  overlaid on a spreadsheet comparing two carpentry subcontractors'
  bids, **with the contractors' company names and exact € bid amounts
  visible**). Before including the second one, Paul was asked explicitly
  whether real vendor pricing/names belonged on the public site — he
  said yes, include it as-is. **Don't second-guess this again if a
  similar screenshot shows up in a future batch for this or another
  project** — the precedent is: ask before publishing sensitive-looking
  business data, but once Paul has said yes for this kind of content
  here, take future "add these images" requests for Wilhelmstraße at
  face value unless something looks like a new category of sensitivity
  (e.g. personal data, not just pricing).
  Processed and renamed `10-wilhelmstrasse-punktwolke-innenansicht.jpg`
  and `11-wilhelmstrasse-kostenvergleich-lv.jpg`, appended as the last
  two gallery slides (both landscape, default cropped `.slide-image`,
  no contain/white-bg treatment needed since neither has an isolated-
  cutout background). The interior point-cloud image was **also** set
  as the card thumbnail on both `index.html` and `projects.html`,
  replacing `wilhelmstrasse-5-thumb-render.png` (Paul's explicit ask:
  swap the old thumbnail for this new image) — that old render file is
  now unreferenced anywhere and was deleted rather than left orphaned,
  consistent with the site's asset-hygiene practice. Same file is now
  referenced from three places (card on `index.html`, card on
  `projects.html`, gallery slide 10 on the detail page) — that's fine,
  no need for a separate thumb copy, same pattern already used for
  SolFibreHouse/Schwarzwaldhaus card thumbnails.

- **New project: Bestandsaufstockung Einfamilienhaus** (2026-09-21): added
  an 8th project, `project-bestandsaufstockung-einfamilienhaus.html`, as a
  featured card on `projects.html` (no card on `index.html` yet — that
  page keeps its own fixed curated 3, matching the existing pattern where
  Schwarzwaldhaus also isn't on `index.html`). Scope, per Paul: an upper-
  floor addition ("Aufstockung") to an existing single-family house, where
  he did the permit planning (Genehmigungsplanung) and electrical design
  (Elektroplanung), and — the point he explicitly wanted emphasized —
  everything up to the point the carpenter manufactures the finished
  timber-frame panel elements: not just a 2D floor plan but a full BIM
  model with its associated building components, systematically handed
  over to the executing construction/carpentry company (Zimmereibetrieb).
  Tags: `BIM` `Genehmigungsplanung` `Elektroplanung` `Holzbau` (BIM and
  Holzbau reused existing tag slugs, bumped their `tags.html` counts to
  3 and 2 respectively; Genehmigungsplanung and Elektroplanung are new,
  filed under the same "BIM & Baustelle" group/`tag-bim` color). No
  photos yet — Paul said he'll add a gallery later ("einfach ein paar
  Bilder hochladen") — so the page ships with 3
  `gallery-slide.is-placeholder` slides ("Bild folgt"/"Image coming
  soon", no file references, same placeholder pattern used elsewhere)
  and the card's `.card-thumb` is empty (falls back to its plain
  `#ECECEC` background — cards no longer use the blueprint-grid
  placeholder pattern, see the "minimal portrait image" note above).
  Created the matching empty folder
  `assets/img/gallery/bestandsaufstockung-einfamilienhaus/` per the
  one-folder-per-project convention. When Paul provides photos: follow
  the standard workflow (numbered-prefix filenames, Pillow resize/
  compress to the folder above, swap each placeholder `<figure>` for a
  real one, set the first image as the card thumbnail on `projects.html`
  the same way SolFibreHouse/Schwarzwaldhaus did).
  **Gallery filled same day** (2026-09-21): Paul dropped 5 BIM-rendering
  stills (`V2 00.jpeg`–`V2 04.jpeg`, ~2339×1465 landscape renders of the
  same house from different angles — street/carport approach, aerial
  overview, garden/terrace rear view, side gable, front gable) into the
  gallery folder and asked for `V2 02` specifically to be used as both
  the card thumbnail and a gallery slide, with every image in the folder
  shown in the gallery. Processed with the standard Pillow pipeline
  (resize long edge ≤1600px, JPEG q84 — these are clean CG renders, not
  photos, but q84 was used same as the photographic tier since there's
  no thin-hairline line-art in them; raw `V2 *.jpeg` originals deleted
  after), renamed with numeric prefixes in a deliberate order (not
  upload order): `01-…strassenansicht-carport.jpg` (was `V2 02`, also
  the card thumbnail) → `02-…luftperspektive.jpg` (was `V2 04`) →
  `03-…gartenansicht-terrasse.jpg` (was `V2 00`) →
  `04-…seitenansicht-giebel.jpg` (was `V2 01`) →
  `05-…frontansicht-giebel.jpg` (was `V2 03`) — street-approach thumbnail
  first, then an aerial orientation shot, then a walk around the
  building. All 5 use the default landscape `.slide-image` (no
  `--portrait` modifier, no `is-placeholder`) since the renders are
  already ~3:2 landscape. The 3 placeholder slides from the initial
  page creation were replaced entirely, not appended to.
  **Dedicated portrait thumbnail swapped in** (2026-09-21, same day):
  Paul dropped a separate, tighter-cropped portrait render of the same
  street/carport view (`01-bestandsaufstockung-strassenansicht-carport
  Thumb.jpg`) into the folder and asked for the card thumbnail to use
  this instead of the landscape gallery image. Processed the same way
  (EXIF-transpose, resize long edge ≤1600px → 767×1000, JPEG q84, raw
  file with the space in its name deleted) and saved as
  `01-bestandsaufstockung-strassenansicht-carport-thumb.jpg` (hyphenated,
  no space — consistent with every other filename on the site).
  `projects.html`'s card now points at this `-thumb.jpg` file; gallery
  slide 1 on the detail page still uses the original landscape
  `01-bestandsaufstockung-strassenansicht-carport.jpg` — same
  separate-thumb-vs-gallery-image pattern already used for Wilhelmstraße
  5 (a distinct thumb file vs. its gallery photos, before that
  thumbnail was later swapped to a gallery photo).

- **Wilhelmstraße 5 renamed to "Sanierung | Aufstockung Mehrfamilienhaus"**
  (2026-09-21): Paul asked for the project title itself to change (not a
  rename of files/folders — `project-wilhelmstrasse-5.html` keeps its
  filename, `assets/img/gallery/wilhelmstrasse-5/` keeps its folder name
  and internal numbered filenames, image `alt` text still says
  "Wilhelmstraße 5 — …" for the individual photos). Only the
  user-visible title changed: `<title>`, `<h1>`, and the `.card-title`
  on both `index.html` and `projects.html`, from "Wilhelmstraße 5
  Bauvorhaben" / "Wilhelmstraße 5" to "Sanierung | Aufstockung
  Mehrfamilienhaus". If Paul later wants the file/folder path renamed to
  match, that's a separate, bigger ask (would need every gallery image
  reference and the nav link updated) — don't do it preemptively.

- **New project discovered mid-session: "Bestandsaufstockung
  Einfamilienhaus"** (2026-09-21): `project-bestandsaufstockung-
  einfamilienhaus.html` and its `assets/img/gallery/
  bestandsaufstockung-einfamilienhaus/` folder already existed when
  found — added outside this session's visible history, same pattern as
  Schwarzwaldhaus earlier. Tags: `BIM` `Genehmigungsplanung`
  `Elektroplanung` `Holzbau`. Wasn't touched beyond being placed into
  the new category structure below — if its gallery/content needs the
  same cleanup pass Schwarzwaldhaus got (check for a placeholder gallery
  referencing nonexistent files, verify captions), that's still
  outstanding and should be treated as a fresh task if Paul asks.

- **`projects.html` restructured into exactly 3 categories: "Data
  Science & AI", "Architektur", "Studien- & Forschungsprojekte"**
  (2026-09-21): replaces the previous structure (a "Ausgewählte
  Projekte"/Featured section + "Architekturbüro-Organisation" +
  "Studien- & Forschungsprojekte"). The `featured`/`.card.featured`
  class was dropped from every card — it had already stopped doing
  anything visually (see the 2026-09-18 "Cards fully white" note above:
  featured cards look identical to regular ones) and its only remaining
  role, grouping, is exactly what this restructure replaces, so keeping
  the class around would just be dead markup. Final grouping, confirmed
  with Paul where the category wasn't obvious from the project itself:
  - **Data Science & AI**: testware.dev, Nextcloud für Architekturbüros
    (Paul's call — Nextcloud's core purpose is architecture-office
    infrastructure, but he wants it grouped by its AI-database feature,
    not its target audience)
  - **Architektur**: Sanierung | Aufstockung Mehrfamilienhaus,
    Schwarzwaldhaus, Bestandsaufstockung Einfamilienhaus, Bamboo Study
    Hub (Paul's call — Bamboo Study Hub was volunteer construction work,
    not a paid architecture-office project or university work, but he
    placed it here rather than carve out a 4th category for it)
  - **Studien- & Forschungsprojekte**: SolFibreHouse, Planify (unchanged
    — both are university-era work, this was already the obvious home)
  This grouping is Paul's explicit decision, not inferred — if a new
  project is added later, ask which of the three categories it belongs
  in rather than guessing from tags alone (Nextcloud and Bamboo Study
  Hub both show the category isn't always a mechanical fit).
  `index.html`'s separate 3-card "Ausgewählte Projekte" home-page
  preview section was **not** touched — it's a different, smaller
  selection (testware, Sanierung|Aufstockung, Bamboo Study Hub) serving
  a different purpose (home-page teaser, not the full categorized
  listing) and this request was specifically about `projects.html`'s
  category structure.

- **First deploy + repo renamed to `thegr8paul.github.io`** (2026-09-22):
  walked Paul through `git init`/commit/push step by step in his own
  terminal (deliberately not done by an agent, so the commits are
  authored as Paul, not with a Claude co-author trailer — his own call,
  see the exchange that led here). Along the way: caught a copy-paste
  mistake where he'd literally set `git config --global user.email` to
  the placeholder `"deine-github-email@example.com"` from an example
  command — corrected to his real GitHub primary email
  `paul-schlegel@online.de`. Also found and removed two stray/duplicate
  raw image files that had been sitting in gallery folders outside this
  session's own work (`assets/img/gallery/planify/planify-thumb_1.png`,
  `assets/img/gallery/testware/testware-thumb original.png` — neither
  referenced by any HTML, Paul deleted them himself in Finder before the
  first commit). After the first push, the repo (created as
  `paulschlegel.github.io`) 404'd on `https://paulschlegel.github.io/` —
  turned out GitHub's free automatic Pages hosting at
  `https://<name>.github.io/` only triggers when the repo name matches
  the account's actual **username**, and Paul's GitHub username is
  `thegr8paul`, not `paulschlegel` (confirmed via his GitHub profile —
  display name "Paul Schlegel", login `thegr8paul`). With the mismatched
  name it was being treated as an ordinary project repo, reachable only
  at `https://thegr8paul.github.io/paulschlegel.github.io/`. Paul chose
  to rename the repo (Settings → General → Repository name) to
  `thegr8paul.github.io` rather than live with the longer nested URL —
  confirmed working at `https://thegr8paul.github.io/` after the rename.
  Local remote updated to match (`git remote set-url origin
  https://github.com/thegr8paul/thegr8paul.github.io.git`). This file's
  title/goal section and `README.md` were updated accordingly — every
  `paulschlegel.github.io` reference as a repo/deploy name is now
  `thegr8paul.github.io`; don't reintroduce the old name as the actual
  deploy target if it comes up again (e.g. from stale memory of an
  earlier conversation) — `paulschlegel.github.io` was only ever the
  pre-rename working-directory/repo name, not a second live site.

- **Planify tagged `Team`** (2026-09-25): Paul pointed out Planify was
  missing its `Team` tag — it was built together with Magnus (same as
  the existing project description already said), but only
  `Computational Design` had ever been applied. Added `Team` (category
  `tag-collab`, same pastel group as testware's `Team`/`Product` tags)
  in all three places tags live: the detail page
  (`project-planify.html`), the card's `data-tags` on `projects.html`
  (`data-tags="computational-design team"`), and the `tags.html` count
  (`Team` bumped from `(1)` to `(2)`). Paul also confirmed, while
  reviewing this, that testware.dev is correctly `Team`,
  Schwarzwaldhaus and the Nextcloud project are correctly *not* `Team`
  (solo work), and Wilhelmstraße 5 / Bestandsaufstockung
  Einfamilienhaus (the two construction-site/BIM projects) stay solo
  too — no changes needed on any of those, they were already right.

  **⚠️ Superseded 2026-09-27**: Paul reconsidered and said everything
  tied to the Architekturbüro is team work too — added `Team` to both
  Wilhelmstraße 5 and Bestandsaufstockung Einfamilienhaus after all (in
  the detail page, the `projects.html` card `data-tags`, and bumped the
  `tags.html` count from `(2)` to `(4)`). Bestandsaufstockung's body
  copy was also reworded — it used to say the planning was done
  "eigenständig" (independently); now it opens with "Ein im Team des
  Architekturbüros Schwär Architektur bearbeitetes Projekt" and
  attributes the planning steps to Paul specifically, so it no longer
  contradicts the Team tag. Schwarzwaldhaus and the Nextcloud project
  were *not* revisited and still carry no `Team` tag — if Paul's
  broader "everything Architekturbüro-related is team work" reasoning
  should apply to those two as well, that's still open (ask before
  changing).

  **2026-09-28**: the `Team & Zusammenarbeit` tag-group on `tags.html`
  was renamed to `Sonstiges`/`Other`, and the `Product` tag (previously
  only on testware.dev, count `(1)`) was removed entirely — from
  `tags.html`, `project-testware.html`'s tag chips, and testware's
  `data-tags` on `projects.html`. Also: all tag chips on every project
  detail page were plain non-interactive `<span>`s — they're now
  `<a href="projects.html?tag=...">` links (styling already had an
  `a.tag` rule in `style.css`, just unused until now), so a project's
  tags actually link back into the filtered projects view instead of
  being decorative.

## Open decisions Paul may still want to make

- Review/adjust the machine-translated copy (DE↔EN) on career.html and
  projects.html
- Whether to add more projects to "Featured" over time
- Custom domain later (would need a `CNAME` file + DNS — out of scope now)
