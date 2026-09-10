import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import {
  ASPECT,
  OUTLINE,
  STATE_PATHS,
  VIEW_BOX_ATTR,
  projectPercent,
  project,
  type StateKey,
} from '../../lib/southIndia'
import { gsap, useGSAP, prefersReducedMotion } from '../../lib/motion'
import { LineIcon } from './LineIcon'

/* ── Palette ──────────────────────────────────────────────────────────
   Sampled off the Crop 96 ramp rather than invented. The soft states and
   the land base are deliberately the *same* value: adjacent state polygons
   are generalised independently, so their shared edges disagree by a
   fraction of a unit, and a base wash in the identical tone means those
   seams have nothing to show through. */
const LAND = '#e4e9d6'
const PRIMARY = '#61714f' // --color-olive
const BORDER = '#5e6e4b'
const COAST = '#48583a'
const MARKER = '#a26455' // --color-clay

/** What a marker says when you reach for it. Omit it and the point stays inert. */
export type MarkerCard = {
  crop: string
  region: string
  copy: string
  image: string
  alt: string
  to: string
  /** `object-position` for thumbnails whose subject is off-centre. */
  focus?: string
  /** Crops past a busy background, the way the full-size frames do. */
  zoom?: number
}

/** A sourcing point, given where it actually is. */
export type MapMarker = { name: string; lng: number; lat: number; card?: MarkerCard }

/* Karnataka first — the rest is context, and the copy names Anantapur.
   Each sits well clear of a state line: a marker straddling a border reads
   as a mistake however small it is.

   The `card` on each is the whole content model for the hover panel: add a
   coordinate and a card here and a new origin appears, positioned, animated
   and reachable by keyboard with no further work. */
const DEFAULT_MARKERS: MapMarker[] = [
  {
    name: 'Kalaburagi',
    lng: 76.83,
    lat: 17.33,
    card: {
      crop: 'Maize',
      region: 'Kalaburagi, Karnataka',
      copy: 'Dry-belt maize, graded and moisture-checked before it moves.',
      image: '/img/prod-maize.webp',
      alt: 'Husked maize cobs heaped together',
      to: '/products',
    },
  },
  {
    name: 'Shivamogga',
    lng: 75.57,
    lat: 13.93,
    card: {
      crop: 'Rice',
      region: 'Shivamogga, Karnataka',
      copy: 'Monsoon paddy off the Malnad, milled close to the field.',
      image: '/img/prod-rice.webp',
      alt: 'Loose paddy rice running through open hands',
      to: '/products',
    },
  },
  {
    name: 'Chitradurga',
    lng: 76.4,
    lat: 14.23,
    card: {
      crop: 'Groundnut',
      region: 'Chitradurga, Karnataka',
      copy: 'Red-soil groundnut, lifted and sun-dried on the farm.',
      image: '/img/prod-groundnut.webp',
      alt: 'Groundnuts heaped in a shallow market tray',
      to: '/products',
      focus: '36% 40%',
      zoom: 2.2,
    },
  },
  {
    name: 'Tumakuru',
    lng: 77.1,
    lat: 13.34,
    card: {
      crop: 'Mango',
      region: 'Tumakuru, Karnataka',
      copy: 'Orchard mango picked at the turn, never force-ripened.',
      image: '/img/prod-mango.webp',
      alt: 'Ripe mangoes on the branch, still in leaf',
      to: '/products',
    },
  },
  {
    name: 'Mysuru',
    lng: 76.64,
    lat: 12.3,
    card: {
      crop: 'Sugarcane',
      region: 'Mysuru, Karnataka',
      copy: 'Cane from the Cauvery command, cut and crushed the same week.',
      image: '/img/prod-sugarcane.webp',
      alt: 'Cut sugarcane stalks bundled at the field edge',
      to: '/products',
    },
  },
  {
    name: 'Anantapur',
    lng: 77.6,
    lat: 14.68,
    card: {
      crop: 'Groundnut',
      region: 'Anantapur, Andhra Pradesh',
      copy: 'India’s groundnut heartland — rain-fed, oil-rich kernels.',
      image: '/img/prod-groundnut.webp',
      alt: 'Groundnuts heaped in a shallow market tray',
      to: '/products',
      focus: '36% 40%',
      zoom: 2.2,
    },
  },
]

/* Names sit inside their state where the state is wide enough to hold one.
   Kerala and Goa are not, so theirs are set in the Arabian Sea and tied back
   with a hairline — the ordinary cartographic answer, and quieter than
   shrinking the type until it fits. */
type Label = {
  key: StateKey
  text: string
  lng: number
  lat: number
  /** Sea labels are right-aligned so they end just short of the coast. */
  leader?: { lng: number; lat: number }
}

const LABELS: Label[] = [
  // Interior names sit at or near each state's pole of inaccessibility — the
  // point furthest from any of its own edges — so a long name has room on
  // both sides instead of being nudged off a border by hand.
  { key: 'karnataka', text: 'Karnataka', lng: 75.78, lat: 15.18 },
  { key: 'telangana', text: 'Telangana', lng: 79.0, lat: 17.85 },
  { key: 'andhraPradesh', text: 'Andhra\nPradesh', lng: 78.9, lat: 14.85 },
  { key: 'tamilNadu', text: 'Tamil Nadu', lng: 78.3, lat: 10.95 },
  { key: 'kerala', text: 'Kerala', lng: 75.5, lat: 10.35, leader: { lng: 76.35, lat: 10.35 } },
  { key: 'goa', text: 'Goa', lng: 73.3, lat: 15.4, leader: { lng: 74.06, lat: 15.4 } },
]

/** Everything but the highlighted state, in draw order. */
const SOFT: StateKey[] = ['goa', 'telangana', 'andhraPradesh', 'kerala', 'tamilNadu']

/* ── Card placement ───────────────────────────────────────────────────
   The card is laid out in the frame's own pixels rather than parked on a
   side by hand, so it stays inside the map wherever a future marker lands.
   Everything is read off `offsetWidth`/`offsetHeight`: the section's entrance
   scales this whole element, and layout boxes ignore that where rects would
   not. */

/** Clearance between the dot and the card, and between the card and the frame. */
const GAP = 14
const EDGE = 8

type Placement = {
  /** Card top-left, in frame pixels. */
  x: number
  y: number
  /** The dot itself, and the point on the card the connector reaches for. */
  px: number
  py: number
  ex: number
  ey: number
  /** Frame size, so the connector's svg shares this coordinate space. */
  w: number
  h: number
  /** Which way the card opens — the reveal scales out of the edge nearest the dot. */
  side: 'left' | 'right'
}

function place(frame: HTMLElement, card: HTMLElement, left: number, top: number): Placement {
  const w = frame.offsetWidth
  const h = frame.offsetHeight
  const cw = card.offsetWidth
  const ch = card.offsetHeight
  const px = (left / 100) * w
  const py = (top / 100) * h

  // Right of the dot by preference; flip left when the frame runs out, and
  // fall back to straddling the dot when neither side has the room.
  let side: Placement['side'] = 'right'
  let x = px + GAP
  if (x + cw > w - EDGE) {
    side = 'left'
    x = px - GAP - cw
  }
  if (x < EDGE) x = Math.min(Math.max(EDGE, px - cw / 2), Math.max(EDGE, w - EDGE - cw))

  const y = Math.min(Math.max(EDGE, py - ch / 2), Math.max(EDGE, h - EDGE - ch))

  // The connector aims at the nearest point just inside the card, so it stays
  // a short hairline whether the card is beside the dot or above it.
  const ex = Math.min(Math.max(px, x + 10), x + cw - 10)
  const ey = Math.min(Math.max(py, y + 10), y + ch - 10)

  return { x, y, px, py, ex, ey, w, h, side }
}

type Props = {
  className?: string
  markers?: MapMarker[]
  /** Set false to place the map inside a caller-owned figure. */
  labelled?: boolean
}

/**
 * South India, drawn from real boundaries.
 *
 * The geometry is generated (see `lib/southIndia.ts`); nothing here is an
 * approximation. State names are HTML rather than `<text>` so they keep the
 * site's own type — Poppins, uppercase, letterspaced, responsive — and they
 * line up because the wrapper is pinned to the viewBox's aspect ratio, which
 * makes `projectPercent` and the svg's own coordinate space the same space.
 *
 * Strokes are in user units on purpose: the whole drawing scales as one
 * object, so a hairline stays a hairline *relative to the land* instead of
 * fattening up as the map gets smaller.
 *
 * The sourcing points carry an origin card each. The drawing is untouched by
 * it: the dots stay exactly where and what they were, and the hit targets,
 * card and connector all live in a transparent HTML layer above the svg.
 */
export function SouthIndiaMap({ className = '', markers = DEFAULT_MARKERS, labelled = true }: Props) {
  const root = useRef<HTMLDivElement>(null)
  const cardRef = useRef<HTMLDivElement>(null)
  const closing = useRef<number>(0)

  // `active` is the open marker; `placed` is that card's measured geometry,
  // and its arrival is what un-hides the card — one frame later, so the
  // reveal runs from the final position rather than from wherever it mounted.
  const activeName = useRef<string | null>(null)
  const [active, setActive] = useState<string | null>(null)
  const [placed, setPlaced] = useState<Placement | null>(null)
  const [shown, setShown] = useState(false)
  const touched = useRef(false)

  // The dot and the card are separate elements with a hairline of dead space
  // between them, so crossing from one to the other always fires a leave. The
  // close is therefore deferred, and re-entering the *same* origin before it
  // lands just puts the card back up — no re-measure, no flicker.
  const open = useCallback((name: string) => {
    window.clearTimeout(closing.current)
    if (activeName.current === name) setShown(true)
    else {
      activeName.current = name
      setActive(name)
    }
  }, [])

  const close = useCallback(() => {
    window.clearTimeout(closing.current)
    setShown(false)
    // Long enough for the fade to finish; the card is inert throughout.
    closing.current = window.setTimeout(() => {
      activeName.current = null
      setActive(null)
      setPlaced(null)
    }, 260)
  }, [])

  useEffect(() => () => window.clearTimeout(closing.current), [])

  const openMarker = active ? markers.find((m) => m.name === active) : undefined

  // Keyed on `active` alone, deliberately: an inline `markers` array from a
  // caller is a fresh reference every render, and re-measuring every render
  // sets state every render, which never settles.
  useLayoutEffect(() => {
    const frame = root.current
    const card = cardRef.current
    const marker = markers.find((m) => m.name === active)
    if (!frame || !card || !marker) return
    const { left, top } = projectPercent(marker.lng, marker.lat)
    setPlaced(place(frame, card, parseFloat(left), parseFloat(top)))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [active])

  useEffect(() => {
    if (!placed) return
    const id = requestAnimationFrame(() => setShown(true))
    return () => cancelAnimationFrame(id)
  }, [placed])

  // A tap outside dismisses the card, which is the only way back on touch.
  useEffect(() => {
    if (!active) return
    const onDown = (e: PointerEvent) => {
      if (!root.current?.contains(e.target as Node)) close()
    }
    document.addEventListener('pointerdown', onDown)
    return () => document.removeEventListener('pointerdown', onDown)
  }, [active, close])

  useGSAP(
    () => {
      const scope = root.current
      if (!scope) return

      if (prefersReducedMotion()) {
        gsap.set(scope.querySelectorAll('[data-map]'), { opacity: 1 })
        return
      }

      const tl = gsap.timeline({
        scrollTrigger: { trigger: scope, start: 'top 76%', once: true },
        defaults: { ease: 'power3.out' },
      })

      // The whole drawing settles in first, then it assembles itself: land,
      // borders, the highlight, and only then the annotation. Long durations
      // and a single easing family — nothing here overshoots.
      tl.fromTo(
        scope,
        { opacity: 0, scale: 0.965, y: 20 },
        { opacity: 1, scale: 1, y: 0, duration: 1.7 },
        0,
      )
        .fromTo('[data-map="land"]', { opacity: 0 }, { opacity: 1, duration: 1.4 }, 0.15)
        .fromTo(
          '[data-map="border"]',
          { strokeDashoffset: 1 },
          { strokeDashoffset: 0, duration: 1.9, stagger: 0.08, ease: 'power2.inOut' },
          0.3,
        )
        .fromTo(
          '[data-map="coast"]',
          { strokeDashoffset: 1 },
          { strokeDashoffset: 0, duration: 2.2, ease: 'power2.inOut' },
          0.25,
        )
        .fromTo(
          '[data-map="primary"]',
          { opacity: 0 },
          { opacity: 1, duration: 1.5, ease: 'power2.out' },
          0.95,
        )
        .fromTo(
          '[data-map="leader"]',
          { strokeDashoffset: 1 },
          { strokeDashoffset: 0, duration: 0.8, ease: 'power2.inOut' },
          1.45,
        )
        .fromTo(
          '[data-map="marker"]',
          { opacity: 0, scale: 0.4 },
          { opacity: 1, scale: 1, duration: 0.95, stagger: 0.13, ease: 'power2.out' },
          1.3,
        )
        .fromTo(
          '[data-map="label"]',
          { opacity: 0, y: 12 },
          { opacity: 1, y: 0, duration: 1, stagger: 0.1 },
          1.5,
        )
    },
    { scope: root },
  )

  const card = openMarker?.card

  return (
    <div ref={root} className={`relative w-full ${className}`} style={{ aspectRatio: ASPECT }}>
      <svg
        viewBox={VIEW_BOX_ATTR}
        preserveAspectRatio="xMidYMid meet"
        role="img"
        aria-label="Map of South India — Karnataka, Goa, Kerala, Tamil Nadu, Andhra Pradesh and Telangana — with Karnataka marked as the primary sourcing region"
        className="absolute inset-0 size-full overflow-visible"
      >
        {/* Land, then the states over it. Same tone, so the generalisation
            seams between neighbours never open onto the page. */}
        <g data-map="land">
          <path d={OUTLINE} fill={LAND} />
          {SOFT.map((key) => (
            <path key={key} d={STATE_PATHS[key]} fill={LAND} />
          ))}
        </g>

        <path data-map="primary" d={STATE_PATHS.karnataka} fill={PRIMARY} />

        {/* Interior borders: lighter than the coast, so the silhouette
            still reads first. `pathLength` normalises every path to 1, which
            is what lets one tween draw all six at the same rate. */}
        <g fill="none" stroke={BORDER} strokeOpacity="0.28" strokeWidth="1.5" strokeLinejoin="round">
          {(Object.keys(STATE_PATHS) as StateKey[]).map((key) => (
            <path
              key={key}
              data-map="border"
              d={STATE_PATHS[key]}
              pathLength="1"
              strokeDasharray="1"
            />
          ))}
        </g>

        <path
          data-map="coast"
          d={OUTLINE}
          fill="none"
          stroke={COAST}
          strokeOpacity="0.55"
          strokeWidth="2.2"
          strokeLinejoin="round"
          pathLength="1"
          strokeDasharray="1"
        />

        {labelled &&
          LABELS.filter((l) => l.leader).map((l) => {
            const a = project(l.lng, l.lat)
            const b = project(l.leader!.lng, l.leader!.lat)
            return (
              <line
                key={l.key}
                data-map="leader"
                x1={a.x + 6}
                y1={a.y}
                x2={b.x}
                y2={b.y}
                stroke={BORDER}
                strokeOpacity="0.4"
                strokeWidth="1.4"
                pathLength="1"
                strokeDasharray="1"
              />
            )
          })}

        {/* Sourcing points: one warm dot with an ivory halo, so the same
            marker holds on the dark highlight and on the pale states without
            a second treatment — and small enough to stay an annotation. */}
        {markers.map((m) => {
          const { x, y } = project(m.lng, m.lat)
          return (
            <circle
              key={m.name}
              data-map="marker"
              cx={x}
              cy={y}
              r="4.8"
              fill={MARKER}
              stroke="#f8f5ef"
              strokeOpacity="0.8"
              strokeWidth="2.6"
            />
          )
        })}
      </svg>

      {labelled &&
        LABELS.map((l) => {
          const primary = l.key === 'karnataka'
          return (
            // Two spans: the outer one owns the centring transform, the inner
            // one is GSAP's. One element cannot hold both — GSAP writes
            // `transform` outright and would drop the offset.
            <span
              key={l.key}
              aria-hidden="true"
              style={projectPercent(l.lng, l.lat)}
              className={`absolute ${
                l.leader ? '-translate-x-full -translate-y-1/2' : '-translate-x-1/2 -translate-y-1/2'
              }`}
            >
              <span
                data-map="label"
                className={`block font-sans whitespace-pre-line uppercase ${
                  l.leader ? 'pr-3.5 text-right' : 'text-center'
                } ${
                  primary
                    ? 'text-[0.5rem] font-medium tracking-[0.12em] text-ivory sm:text-[0.625rem] sm:tracking-[0.18em] xl:text-[0.8125rem] xl:tracking-[0.24em]'
                    : 'text-[0.4375rem] leading-[1.8] tracking-[0.12em] text-ink-faint sm:text-[0.5rem] sm:tracking-[0.16em] xl:text-[0.625rem] xl:tracking-[0.2em]'
                }`}
              >
                {l.text}
              </span>
            </span>
          )
        })}

      {/* ── The origin cards ───────────────────────────────────────────
          A transparent layer over the drawing: invisible hit targets sat on
          the dots, one card, and the hairline that ties the two together.
          Nothing below is touched. */}

      {/* The connector, in the frame's own pixels — same space as `place()`. */}
      {placed && (
        <svg
          aria-hidden="true"
          width={placed.w}
          height={placed.h}
          viewBox={`0 0 ${placed.w} ${placed.h}`}
          className={`pointer-events-none absolute inset-0 size-full transition-opacity duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none ${
            shown ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <line
            x1={placed.px}
            y1={placed.py}
            x2={placed.ex}
            y2={placed.ey}
            stroke={MARKER}
            strokeOpacity="0.45"
            strokeWidth="1"
          />
        </svg>
      )}

      {markers.map((m) => {
        if (!m.card) return null
        const isOpen = active === m.name
        return (
          <button
            key={m.name}
            type="button"
            style={projectPercent(m.lng, m.lat)}
            className="absolute size-8 -translate-x-1/2 -translate-y-1/2 rounded-full focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-forest"
            aria-expanded={isOpen}
            aria-label={`${m.card.crop} — ${m.card.region}`}
            onPointerEnter={(e) => {
              if (e.pointerType === 'mouse') open(m.name)
            }}
            onPointerLeave={(e) => {
              if (e.pointerType === 'mouse') close()
            }}
            onPointerDown={(e) => {
              touched.current = e.pointerType !== 'mouse'
            }}
            onFocus={() => open(m.name)}
            onBlur={close}
            onClick={() => {
              // Touch has no hover to fall back on, so the point toggles.
              if (touched.current && isOpen) close()
              else open(m.name)
            }}
          />
        )
      })}

      {card && (
        <div
          ref={cardRef}
          // Placement lives on this wrapper; the reveal lives on the panel
          // inside it. One element cannot hold both transforms.
          style={placed ? { transform: `translate3d(${placed.x}px, ${placed.y}px, 0)` } : undefined}
          className={`absolute top-0 left-0 ${placed ? '' : 'invisible'}`}
          onPointerEnter={(e) => {
            if (e.pointerType === 'mouse') open(active!)
          }}
          onPointerLeave={(e) => {
            if (e.pointerType === 'mouse') close()
          }}
          // Tabbing off the last point lands on the card's link; the deferred
          // close is what lets focus arrive before the panel is torn down.
          onFocus={() => open(active!)}
          onBlur={close}
        >
          <Link
            to={card.to}
            className={`group/card block w-[10.5rem] rounded-lg border border-rule-soft bg-paper p-3 shadow-[0_1px_2px_rgb(43_40_37_/_0.04),0_10px_24px_-16px_rgb(43_40_37_/_0.22)] transition-[opacity,transform,translate,scale] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] will-change-[opacity,transform] motion-reduce:transition-none sm:w-[12rem] xl:w-[13.5rem] ${
              placed?.side === 'left' ? 'origin-right' : 'origin-left'
            } ${shown ? 'translate-y-0 scale-100 opacity-100' : 'translate-y-1.5 scale-[0.97] opacity-0'}`}
          >
            <span className="flex items-center gap-2.5">
              <span className="size-9 shrink-0 overflow-hidden rounded-[0.3125rem] bg-sage sm:size-10">
                <img
                  src={card.image}
                  alt={card.alt}
                  loading="lazy"
                  decoding="async"
                  className="size-full object-cover"
                  style={{
                    objectPosition: card.focus,
                    transform: card.zoom ? `scale(${card.zoom})` : undefined,
                  }}
                />
              </span>
              <span className="min-w-0">
                <span className="font-display block text-[0.9375rem] leading-tight font-bold tracking-[-0.01em] text-ink sm:text-[1.0625rem]">
                  {card.crop}
                </span>
                <span className="mt-1 block font-sans text-[0.5rem] leading-[1.3] tracking-[0.13em] text-ink-faint uppercase sm:text-[0.5625rem]">
                  {card.region}
                </span>
              </span>
            </span>

            <span className="mt-2.5 block text-[0.6875rem] leading-[1.5] text-ink-soft sm:text-[0.75rem]">
              {card.copy}
            </span>

            <span className="mt-2.5 flex items-center gap-1.5 font-sans text-[0.5625rem] font-medium tracking-[0.16em] text-forest uppercase sm:text-[0.625rem]">
              Explore
              <LineIcon
                name="arrow"
                strokeWidth={1.7}
                className="size-[1.15em] transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover/card:translate-x-1 motion-reduce:transition-none"
              />
            </span>
          </Link>
        </div>
      )}
    </div>
  )
}
