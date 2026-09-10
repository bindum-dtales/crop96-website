# Crop 96 Agri Exim Pvt. Ltd. — website

React 19 + TypeScript + Vite 8 + Tailwind v4, with GSAP/ScrollTrigger and Lenis
for motion. The homepage is a direct implementation of `Crop96_Website_Design.pdf`;
the four inner pages extend the same design system.

## Run

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # type-check + production build to dist/
npm run preview    # serve dist/
npm run lint
```

## Cloudflare Tunnel

`server.allowedHosts` already accepts `*.trycloudflare.com` and `*.cfargotunnel.com`,
so a quick tunnel works without touching config:

```bash
npm run dev                                  # terminal 1
cloudflared tunnel --url http://localhost:5173   # terminal 2
```

Hot reload over the tunnel needs the HMR socket pointed at https:443, which
would break plain localhost — so it is opt-in:

```bash
TUNNEL=1 npm run dev
```

Use `TUNNEL=1` when you are working through the tunnel, and plain `npm run dev`
otherwise. The site itself renders correctly either way; the flag only affects
hot reload. `npm run preview` accepts the same hosts.

For static hosting, `public/_redirects` sends unknown paths to `index.html` so
client-side routes resolve on a hard refresh.

## Design system

Tokens live in `src/index.css` under `@theme` — they are the single source for
colour, radius, shadow and font, and Tailwind generates utilities from them.

| Token | Value | Used for |
| --- | --- | --- |
| `brand-500` | `#1ca937` | Logo, icon badges, decorative fills (the PDF's green) |
| `brand-600` | `#0d8129` | Buttons and links — the same green darkened to clear 4.5:1 with white |
| `brand-700` | `#017a38` | Product strip, button hover, links on light grounds |
| `brand-900` | `#003528` | Footer, page-banner scrim |
| `harvest-400/500` | `#fec919` / `#f5a623` | Rules, underlines, alternating icon badges |
| `harvest-700` | `#a06508` | Amber *text* (eyebrows, active nav) at an accessible contrast |
| `ink-900/700/500` | `#12211a` … | Headings, body, secondary copy |
| `sand-50`, `sage-100` | `#fbfaf7`, `#edf2ea` | Section grounds, process circles |

Layout: `container-96` (max 78rem) and a `py-14 sm:py-16` section rhythm, both
matched to the reference's proportions.

## Motion

`src/lib/motion.ts` holds the whole animation vocabulary:

- `scrollReveal(scope)` — batches every `[data-reveal]` under a scope into a
  staggered entrance. Flavour comes from the attribute value (`up`, `up-lg`,
  `left`, `right`, `fade`, `scale`, `image`); `data-reveal-delay` offsets one element.
- `parallax(layer, trigger, strength)` — scrubbed background drift.
- `EASE` / `REVEAL_DURATION` — shared timing.

`src/lib/useSmoothScroll.ts` runs Lenis off GSAP's ticker so smooth scroll and
ScrollTrigger share one rAF loop. Section-specific timelines (hero load, process
line draw) live with their components and use `useGSAP` for automatic cleanup.

Every entrance is transform + opacity only. `prefers-reduced-motion` disables
Lenis, skips the timelines and renders everything at its resting state.

## Structure

```
src/
  components/
    layout/    Layout — smooth scroll, per-route reveal pass, hash scrolling
    navbar/    Navbar — scroll state, mobile panel
    footer/    Footer
    sections/  Hero, Services, Products, ConnectingFarmers, Process, Enquiry,
               PageHero, CalloutBand
    cards/     ServiceCard, ProductCard
    forms/     EnquiryForm
    ui/        Button, Icon, Logo, SectionHeading
  lib/         motion.ts, useSmoothScroll.ts, site.ts (all page copy and data)
  pages/       Home, Services, Products, About, Contact, NotFound
public/img/    WebP imagery, sized for its slot
```

## Enquiry form

`EnquiryForm` validates natively and confirms inline; there is no backend in
this project. Point its `onSubmit` at a real endpoint when one exists — the
field names are already the ones you would post.
