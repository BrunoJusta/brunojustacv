# Bruno Justa, portfolio

Personal site for Bruno Justa, Digital Product Manager & AI Lead, Porto.
Hand-built: no UI kit, no template, one component per section.

## Run it

```bash
npm install
npm run dev
```

Then open http://localhost:3000

```bash
npm run build && npm run start   # production build
npm run typecheck                # tsc, no emit
```

## Deploy to Vercel

1. Push this folder to a Git repository.
2. On Vercel, import the repository. The framework is detected as Next.js and
   needs no build configuration.
3. Set the real domain in `lib/content.ts` (`site.url`). It feeds
   `metadataBase`, the canonical links, the sitemap and the JSON-LD, so it is
   the one value to change before going live.

No environment variables are required. Every route is statically prerendered.

## Stack

| Piece | Choice |
| --- | --- |
| Framework | Next.js 15, App Router, TypeScript |
| Styling | Tailwind CSS 3 with CSS custom properties as the token layer |
| Motion | Framer Motion |
| Smooth scroll | Lenis |
| Icons | Phosphor Icons |
| Hero object | Hand-written WebGL2 fragment shader, no 3D library |
| Fonts | Playfair Display, IBM Plex Sans, IBM Plex Mono, self-hosted via `next/font/local` |

## Structure

```
app/
  layout.tsx          fonts, metadata, JSON-LD Person, providers, nav, grain
  page.tsx            section order for the single page
  globals.css         tokens for light and dark, base type, grid, reduced motion
  opengraph-image.png Open Graph card (1200x630), also used for Twitter
  robots.ts           serves /robots.txt
  sitemap.ts          serves /sitemap.xml, home plus the five case pages
  not-found.tsx       404
  work/[slug]/        case page per project, statically generated
components/
  Hero, Statement, Impact, SelectedWork, ProjectCard, Experience,
  Capabilities, Education, BeyondWork, Contact, Footer      sections
  HeroObject          the WebGL sphere
  Nav, ThemeProvider, ThemeToggle, SmoothScroll, ScrollProgress, Grain
  Reveal, Magnetic, Counter, SectionHeading                 primitives
lib/
  content.ts          every string, number and date on the site
  projects.ts         the five cases, problem, approach, outcome
public/
  bruno-justa-cv.pdf  the file behind "Download CV"
  images/             placeholder image slots
```

## Editing content

All copy lives in `lib/content.ts` and `lib/projects.ts`. Nothing is hardcoded
in the components, so a wording or metric change is a one line edit in one
place. The impact strip drives its own grid spans from the data, so adding an
eighth number means adding an object with a `span`.

## Design system

Tokens are CSS custom properties defined twice in `app/globals.css`, once on
`:root` and once on `.dark`, and Tailwind reads them. Changing a colour means
changing two lines.

| Token | Light | Dark |
| --- | --- | --- |
| paper | `#FCFBF8` | `#131110` |
| surface | `#F6F3EE` | `#1A1816` |
| ink | `#241E1A` | `#EFEBE4` |
| muted | `#6F6B67` | `#9A948C` |
| rule | `#E1DDD8` | `#2C2926` |
| accent | `#007281` | `#5CBEC9` |

The light values are sampled from the CV. The accent lightens in dark mode so
body sized text on it still passes WCAG AA; the same teal on a dark ground
would not.

Type is three registers, the same system as the CV: Playfair Display for the
name and section titles, IBM Plex Sans for body, IBM Plex Mono for dates and
metadata. Sizes are `clamp()` based, defined in `tailwind.config.ts` under
`fontSize`, so there are no per breakpoint font utilities in the markup.

Corners are square everywhere. Elevation is a hairline, never a shadow.

## Motion

| Where | What | Notes |
| --- | --- | --- |
| Hero | name reveals letter by letter | 40ms stagger |
| Hero | WebGL sphere | pauses offscreen and on a hidden tab, dpr capped at 1.75 |
| Page top | progress rule | spring damped `useScroll` |
| Sections | reveal with stagger | `whileInView`, `once: true`, 300 to 500ms |
| Numbers | count once on entry | the real value is always in the DOM for assistive tech |
| Links, buttons | magnetic pull | motion values, mouse pointers only, no re-render |
| Project cards | lift plus metric reveal | also fires on keyboard focus |
| Nav | appears past 75% of the first screen | |

Only `transform` and `opacity` animate. `prefers-reduced-motion: reduce`
degrades everything to fades, stops Lenis, and renders one still frame of the
sphere.

## Accessibility

Semantic landmarks and one `h1`; skip link; visible teal focus ring on every
interactive element; the sphere is `aria-hidden` and unfocusable; counters
expose their final value to screen readers; light and dark both pass WCAG AA
for body text and buttons.

## Placeholders to replace

Everything in `public/images/` is a labelled placeholder. Each file states its
own pixel size, and the aspect ratio matters because the layout is built
around it.

| File | Size | Slot |
| --- | --- | --- |
| `ai-agent.jpg` | 1600x1000 | Internal AI agent card |
| `genai-hub.jpg` | 1200x1500 | Generative AI hub card |
| `harvest-compliance.jpg` | 1200x1500 | Harvest compliance card |
| `wine-tourism.jpg` | 1600x1000 | Wine tourism card |
| `price-monitor.jpg` | 2100x900 | Retail price monitor card |
| `*-wide.jpg` | 2000x1125 | the hero image on each case page |
| `beyond-01.jpg` | 1200x1500 | Beyond work, portrait |
| `beyond-02.jpg` | 1200x900 | Beyond work, landscape |

Replace the file, keep the name and the aspect ratio, and update the `imageAlt`
string in `lib/projects.ts` to describe what the new image actually shows.

`app/opengraph-image.png` is real, not a placeholder, but it is generated art
rather than a photograph; swap it if the brand ever changes.
