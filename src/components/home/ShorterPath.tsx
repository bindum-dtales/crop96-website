import { useRef } from 'react'
import { TRADITIONAL_CHAIN, CROP96_CHAIN, VALUE_PROPS } from '../../lib/home'
import { Eyebrow } from '../ui/Eyebrow'
import { LeafSpray } from '../ui/LeafSpray'
import { LineIcon } from '../ui/LineIcon'
import { SupplyTrack } from './SupplyTrack'
import {
  gsap,
  useGSAP,
  drawLine,
  drift,
  lineReveal,
  mediaReveal,
  parallax,
  slowZoom,
  prefersReducedMotion,
  EASE,
} from '../../lib/motion'

/**
 * Section 03 — from origin to market.
 *
 * The section is one argument told in three beats, and the layout is built to
 * carry it rather than to hold four components. The masthead sets the claim
 * against a photograph whose bottom corner is cut away, so the display type
 * sits *in* the picture's shape instead of beside a frame. Under it the two
 * routes are drawn on a single measure at a single station pitch, which
 * leaves the Crop 96 line visibly short of the traditional one — the whole
 * point, made in geometry rather than in a coloured box. The four things that
 * buys close the argument on the same rule the routes hang from.
 */
export function ShorterPath() {
  const root = useRef<HTMLElement>(null)
  const frame = useRef<HTMLDivElement>(null)
  const media = useRef<HTMLDivElement>(null)
  const picture = useRef<HTMLImageElement>(null)
  const spray = useRef<SVGSVGElement>(null)

  useGSAP(
    () => {
      const scope = root.current
      if (!scope) return

      lineReveal(scope, { trigger: scope, stagger: 0.08 })
      if (frame.current) mediaReveal(frame.current)
      scope.querySelectorAll<HTMLElement>('[data-hair]').forEach((el) => drawLine(el, 'x'))

      if (prefersReducedMotion()) return

      // Two layers over the plate, one property each: the contents drift
      // against the page while the picture inside eases out of its overscale.
      if (media.current) parallax(media.current, scope, 0.06)
      if (picture.current) slowZoom(picture.current, scope)
      if (spray.current) drift(spray.current, scope, { y: 10, rotate: -3 })

      // Each route assembles as a single movement: the header states it, the
      // line travels the distance, and the stations light up just behind the
      // advancing end of it — so the eye is walked from source to market
      // rather than shown a finished diagram.
      gsap.utils.toArray<HTMLElement>(scope.querySelectorAll('[data-track]')).forEach((track) => {
        const stations = track.querySelectorAll('[data-station]')
        const walk = 1.05 / Math.max(1, stations.length - 1)

        const tl = gsap
          .timeline({ scrollTrigger: { trigger: track, start: 'top 80%', once: true } })
          .fromTo(
            track.querySelectorAll('[data-track-head]'),
            { y: 18, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.85, stagger: 0.08, ease: EASE },
          )
          .fromTo(
            track.querySelectorAll('[data-rail-x]'),
            { scaleX: 0 },
            { scaleX: 1, duration: 1.35, ease: 'power2.inOut' },
            0.25,
          )
          .fromTo(
            track.querySelectorAll('[data-rail-y]'),
            { scaleY: 0 },
            { scaleY: 1, duration: 1.35, ease: 'power2.inOut' },
            0.25,
          )
          .fromTo(
            stations,
            { opacity: 0, y: 14 },
            { opacity: 1, y: 0, duration: 0.75, stagger: walk, ease: EASE },
            0.38,
          )
          .fromTo(
            track.querySelectorAll('[data-dot]'),
            { scale: 0 },
            { scale: 1, duration: 0.6, stagger: walk, ease: EASE },
            0.38,
          )
          .fromTo(
            track.querySelectorAll('[data-verdict]'),
            { opacity: 0, x: 14 },
            { opacity: 1, x: 0, duration: 0.9, ease: EASE },
            1.5,
          )

        // Only the direct route runs on past its last stop, so these two are
        // absent from the traditional one — and an empty NodeList is a GSAP
        // warning, not a no-op.
        const run = track.querySelector('[data-rail-ghost]')
        const tip = track.querySelector('[data-rail-tip]')
        if (run) tl.fromTo(run, { scaleX: 0 }, { scaleX: 1, duration: 0.85, ease: 'power2.out' }, 1.4)
        if (tip)
          tl.fromTo(tip, { scale: 0, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.5, ease: EASE }, 2.05)
      })
    },
    { scope: root },
  )

  return (
    <section ref={root} aria-labelledby="path-title" className="relative isolate mt-24 lg:mt-32">
      {/* Section ground: three very low-alpha blooms — sage behind the display
          type, a warm cream pass across the middle of the spread, a trace of
          terracotta under the closing quartet — so the ivory has depth without
          reading as a fill. Percentages, so it holds its composition at every
          width. The mask takes it to nothing at the section's own top and
          bottom edges, which is what stops it drawing a line against the ivory
          of the sections either side; `isolate` on the section already keeps
          the layer from slipping behind the page. */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(78%_56%_at_52%_44%,rgb(255_249_236/0.55),transparent_72%),radial-gradient(56%_46%_at_4%_24%,rgb(214_222_196/0.22),transparent_68%),radial-gradient(52%_44%_at_96%_72%,rgb(238_212_201/0.24),transparent_66%)] [-webkit-mask-image:linear-gradient(to_bottom,transparent,black_9%,black_91%,transparent)] [mask-image:linear-gradient(to_bottom,transparent,black_9%,black_91%,transparent)]"
      />

      <LeafSpray
        ref={spray}
        className="pointer-events-none absolute -right-24 bottom-[8%] -z-10 w-56 opacity-[0.14] lg:w-[20rem]"
      />

      {/* ── Masthead ───────────────────────────────────────────── */}
      <div className="mx-auto grid w-full max-w-[92rem] px-5 sm:px-7 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1fr)] lg:gap-x-10 lg:pr-0 lg:pl-10">
        {/* Both columns start on the same line: the eyebrow's cap height is
            set against the plate's top edge, and the block runs down past the
            plate's foot so the paragraph lands in the corner it gives up. The
            small offset is optical — the eyebrow's line box sits a little
            above its caps, and matching the boxes would read as too high. */}
        <div className="relative order-2 pt-9 lg:order-1 lg:pt-0">
          <span data-reveal="up">
            <Eyebrow index="03">From Origin to Market</Eyebrow>
          </span>

          <h2
            id="path-title"
            className="display mt-6 text-[clamp(2.6rem,10.5vw,3.5rem)] sm:text-[clamp(3.2rem,7vw,4.4rem)] lg:mt-7 lg:text-[clamp(3rem,5vw,5.25rem)]"
          >
            <span data-mask className="line-mask">
              <span className="block">A shorter path</span>
            </span>
            <span data-mask className="line-mask">
              <span className="block">
                for a <span className="text-moss">greater</span>
              </span>
            </span>
            <span data-mask className="line-mask">
              <span className="block text-moss">impact.</span>
            </span>
          </h2>

          <div className="mt-8 flex items-start gap-6 lg:mt-10">
            <span
              data-hair
              aria-hidden="true"
              className="mt-[0.85rem] h-px w-12 shrink-0 origin-left bg-clay/55 lg:w-16"
            />
            <p
              data-reveal="up"
              className="max-w-[38ch] text-[1.0625rem] leading-[1.65] font-light text-ink-soft"
            >
              We reduce unnecessary layers, so quality travels better, prices stay fairer and
              farmers get the value they deserve.
            </p>
          </div>
        </div>

        {/* Photograph */}
        <div className="relative order-1 -mx-5 sm:-mx-7 lg:order-2 lg:mx-0">
          <div className="relative lg:bleed-r">
            {/* Three nested boxes because three different owners write to
                them: the cut is static CSS, `mediaReveal` writes its wipe
                inline on the frame within, and the drift needs a layer that
                already stands proud of both. */}
            <div className="plate-cut-narrow relative isolate h-[64vw] max-h-[23rem] sm:h-[44vw] lg:plate-cut lg:h-[32vw] lg:max-h-[31rem] lg:min-h-[22rem]">
              <div ref={frame} className="absolute inset-0">
                <div ref={media} data-wipe-inner className="absolute -inset-[6%]">
                  <img
                    ref={picture}
                    src="/img/shorter-path-plate.webp"
                    alt="A farmer's hands settling a young seedling into freshly turned soil at sunrise"
                    width={1322}
                    height={776}
                    loading="lazy"
                    decoding="async"
                    className="size-full object-cover object-[52%_44%]"
                  />
                </div>
              </div>

              {/* Warms the plate toward the golden light of the other spreads
                  and settles the ground the seal sits on. */}
              <span
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 bg-[linear-gradient(205deg,rgb(255_236_198/0.18),transparent_46%),radial-gradient(46%_52%_at_80%_70%,rgb(28_26_20/0.28),transparent_78%)]"
              />

              <span
                data-reveal="pop"
                data-reveal-delay="0.25"
                className="absolute right-[7%] bottom-[8%] grid size-[6.75rem] place-items-center rounded-full bg-forest/85 text-center ring-1 ring-ivory/25 ring-inset sm:size-[7.75rem] lg:right-[8%] lg:bottom-[11%] lg:size-[9.5rem]"
              >
                <span>
                  <LineIcon
                    name="leaf"
                    strokeWidth={1.3}
                    className="mx-auto size-4 text-ivory/85 lg:size-6"
                  />
                  <span className="mt-1.5 block font-sans text-[0.5rem] leading-[1.8] font-medium tracking-[0.2em] text-ivory uppercase lg:mt-2.5 lg:text-[0.625rem] lg:tracking-[0.22em]">
                    Better
                    <br />
                    Farmers
                    <br />
                    Brighter
                    <br />
                    Markets
                  </span>
                </span>
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* ── The two routes, on one measure ─────────────────────── */}
      <div className="container-96 mt-16 space-y-14 lg:mt-20 lg:space-y-16">
        <SupplyTrack
          title="The Traditional Way"
          sub="Many hands. Higher costs. Lost value."
          nodes={TRADITIONAL_CHAIN}
          verdict={['Value', 'gets diluted', 'along the way']}
          tone="clay"
        />
        <SupplyTrack
          title="The Crop 96 Way"
          sub="Closer to the source. Greater value for all."
          nodes={CROP96_CHAIN}
          verdict={['A more', 'direct path', 'a brighter tomorrow']}
          tone="moss"
          /* Four stations at the seven-station pitch: 4/7 of the measure. */
          span={4 / 7}
          hubAt={1}
          hubCaption="Sourcing | Quality | Supply"
        />
      </div>

      {/* ── What the shorter path buys ─────────────────────────── */}
      <div className="container-96 mt-16 lg:mt-24">
        <span data-hair aria-hidden="true" className="block h-px w-full origin-left bg-rule" />
        <ul className="mt-9 grid grid-cols-2 gap-x-8 gap-y-11 sm:gap-x-14 lg:mt-12 lg:grid-cols-4 lg:gap-x-16">
          {VALUE_PROPS.map((prop, i) => (
            <li key={prop.title} data-reveal="up" data-reveal-delay={i * 0.08} className="group">
              <LineIcon
                name={prop.icon}
                strokeWidth={1.4}
                className={`size-7 transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:-translate-y-0.5 ${
                  prop.tone === 'sage' ? 'text-olive' : 'text-clay'
                }`}
              />
              <h3 className="mt-5 font-display text-[1.375rem] leading-none tracking-[-0.01em] text-ink lg:text-[1.5rem]">
                {prop.title}
              </h3>
              <p className="mt-3 max-w-[26ch] text-[0.875rem] leading-[1.6] font-light text-ink-soft">
                {prop.copy}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
