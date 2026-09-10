import { useRef } from 'react'
import { IMPACT_POINTS, IMPACT_WORDS } from '../../lib/home'
import { Eyebrow } from '../ui/Eyebrow'
import { Pill } from '../ui/Pill'
import { IconPlate } from '../ui/IconPlate'
import { gsap, useGSAP, lineReveal, prefersReducedMotion, parallax } from '../../lib/motion'

/**
 * Section 01 — the opening spread.
 *
 * Three vertical bands: the display headline, the impact rail, and a curved
 * photo panel that bleeds off the right edge carrying the pull quote and the
 * clay quadrant. Below `lg` the bands stack and the panel takes the curve on
 * its top edge instead of its side, so the composition is recomposed rather
 * than squeezed.
 */
export function ImpactHero() {
  const root = useRef<HTMLElement>(null)
  const media = useRef<HTMLImageElement>(null)

  useGSAP(
    () => {
      const scope = root.current
      if (!scope) return

      // Page-load choreography. Nothing here waits on scroll: this is the
      // first thing seen, so it plays straight through, just behind the navbar.
      lineReveal(scope, { delay: 0.35, stagger: 0.085 })

      if (prefersReducedMotion()) return

      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })

      tl.fromTo(
        '[data-hero-eyebrow]',
        { y: 16, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8 },
        0.25,
      )
        .fromTo(
          '[data-hero-frame]',
          { clipPath: 'inset(0 0 0 100%)' },
          { clipPath: 'inset(0 0 0 0%)', duration: 1.5, ease: 'power3.inOut' },
          0.15,
        )
        .fromTo('[data-hero-img]', { scale: 1.34 }, { scale: 1.15, duration: 2.1 }, 0.15)
        .fromTo(
          '[data-hero-copy]',
          { y: 22, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.9, stagger: 0.12 },
          0.95,
        )
        .fromTo(
          '[data-hero-row]',
          { y: 26, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.85, stagger: 0.1 },
          0.75,
        )
        .fromTo(
          '[data-hero-quote]',
          { y: 20, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.9, stagger: 0.09 },
          1.15,
        )
        .fromTo(
          '[data-hero-badge]',
          { scale: 0.7, opacity: 0 },
          { scale: 1, opacity: 1, duration: 1, ease: 'back.out(1.5)' },
          1.35,
        )
        .fromTo(
          '[data-hero-rule]',
          { scaleX: 0 },
          { scaleX: 1, duration: 0.8, stagger: 0.06, ease: 'power2.inOut' },
          0.85,
        )

      // The drift rides the picture, not its frame: the frame is pinned to
      // the section at xl and in the flow below it, so moving either would
      // open a gap. The overscale on the image is the headroom.
      if (media.current) parallax(media.current, scope, 0.08)
    },
    { scope: root },
  )

  return (
    <section ref={root} className="relative isolate" aria-labelledby="impact-title">
      <div className="mx-auto grid w-full max-w-[92rem] px-5 sm:px-7 xl:grid-cols-[minmax(0,1fr)_minmax(0,0.66fr)_minmax(0,2.15fr)] xl:gap-x-10 xl:pl-10 xl:pr-0">
        {/* ── Band 1: the headline ─────────────────────────────── */}
        <div className="order-1 pt-6 xl:pt-14">
          <span data-hero-eyebrow className="inline-block">
            <Eyebrow index="01">Our Impact</Eyebrow>
          </span>

          <h1
            id="impact-title"
            className="display mt-6 text-[clamp(2.9rem,10.5vw,3.6rem)] sm:text-[clamp(3.4rem,7.2vw,4.6rem)] xl:mt-7 xl:text-[clamp(3.1rem,4.6vw,4.7rem)]"
          >
            <span data-mask className="line-mask">
              <span className="block">Stronger</span>
            </span>
            <span data-mask className="line-mask">
              <span className="block">farmers.</span>
            </span>
            <span data-mask className="line-mask">
              <span className="block text-moss">A healthier</span>
            </span>
            <span data-mask className="line-mask">
              <span className="block text-moss">tomorrow.</span>
            </span>
          </h1>

          <p
            data-hero-copy
            className="mt-7 max-w-[30ch] text-[1.0625rem] leading-[1.75] text-ink-soft xl:mt-8"
          >
            When farmers get the right value, everyone benefits — from the fields to the families to
            the future.
          </p>

          <div data-hero-copy className="mt-8 xl:mt-10">
            <Pill to="/about" arrow>
              Our Story
            </Pill>
          </div>
        </div>

        {/* ── Band 2: the impact rail ──────────────────────────── */}
        <ul className="order-3 mt-12 grid gap-0 sm:grid-cols-2 xl:order-2 xl:mt-0 xl:block xl:pt-14">
          {IMPACT_POINTS.map((point, i) => (
            <li
              key={point.title}
              data-hero-row
              className="group relative flex items-start gap-4 py-6 sm:gap-5 xl:py-5 xl:first:pt-0"
            >
              <IconPlate
                icon={point.icon}
                tone={point.tone}
                className="mt-0.5 transition-transform group-hover:scale-108"
              />
              <div className="min-w-0">
                <h3 className="font-display text-[1.15rem] leading-[1.2] font-bold whitespace-pre-line xl:text-[1.2rem]">
                  {point.title}
                </h3>
                <p className="mt-2 max-w-[24ch] text-[0.875rem] leading-[1.55] text-ink-soft">
                  {point.copy}
                </p>
              </div>
              {/* Hairline between rows — a rule the eye reads as structure,
                  not a border, so it stops short of the icon plate. */}
              {i < IMPACT_POINTS.length - 1 && (
                <span
                  data-hero-rule
                  aria-hidden="true"
                  className="absolute inset-x-0 bottom-0 h-px origin-left bg-rule-soft xl:left-19"
                />
              )}
            </li>
          ))}
        </ul>

        {/* ── Band 3: the curved photo panel ───────────────────── */}
        <div className="relative order-2 -mx-5 mt-10 sm:-mx-7 xl:order-3 xl:mx-0 xl:mt-0">
          <div
            data-hero-frame
            className="relative isolate h-[68vw] max-h-[34rem] overflow-hidden curve-t sm:h-[54vw] xl:absolute xl:inset-y-0 xl:left-0 xl:h-auto xl:max-h-none xl:curve-l xl:bleed-r"
          >
            <img
              ref={media}
              data-hero-img
              src="/img/harvest-rice.webp"
              alt="A farmer lifting a freshly pulled bundle of paddy seedlings in a Karnataka field at first light"
              width={900}
              height={1100}
              fetchPriority="high"
              decoding="async"
              className="absolute inset-0 size-full scale-115 object-cover object-[58%_38%] xl:object-[54%_42%]"
            />
            {/* Light lifts the top-left so the ivory and the photograph meet
                without a hard seam. */}
            <span
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 bg-[radial-gradient(120%_90%_at_6%_0%,rgb(248_245_239/0.7),transparent_55%)]"
            />
            {/* Light for the pull quote: the reference sets it on blown-out
                sky, so this frame gets an equivalent built out of the ivory. */}
            <span
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 hidden bg-[radial-gradient(62%_78%_at_104%_2%,rgb(250_248_243/0.97)_26%,rgb(250_248_243/0.8)_52%,transparent_78%)] xl:block"
            />

            {/* Pull quote, set into the bright sky of the frame. */}
            <figure className="absolute top-[6%] right-[5%] hidden max-w-[15rem] text-right xl:block xl:max-w-[17rem]">
              <blockquote
                data-hero-quote
                className="font-display text-[clamp(1.35rem,1.85vw,1.85rem)] leading-[1.22] font-medium text-olive italic"
              >
                “When farmers thrive, the world eats better.”
              </blockquote>
              <span
                data-hero-quote
                aria-hidden="true"
                className="mt-5 ml-auto block h-px w-14 bg-olive/55"
              />
              <figcaption
                data-hero-quote
                className="mt-4 space-y-1 font-sans text-[0.6875rem] font-medium tracking-[0.22em] text-olive uppercase"
              >
                {IMPACT_WORDS.map((word) => (
                  <span key={word} className="block">
                    {word}
                  </span>
                ))}
              </figcaption>
              <span
                data-hero-quote
                aria-hidden="true"
                className="mt-5 ml-auto block h-px w-9 bg-olive/45"
              />
            </figure>

            {/* Clay quadrant, tucked into the bottom-right corner. */}
            <div
              data-hero-badge
              className="absolute right-0 bottom-0 grid h-[8.5rem] w-[9.5rem] origin-bottom-right place-items-center bg-peach quadrant-tl sm:h-[10rem] sm:w-[11.5rem] xl:h-[11.5rem] xl:w-[13rem]"
            >
              <p className="script -translate-x-2 translate-y-1 -rotate-6 text-center text-[1.5rem] leading-[1.15] text-white sm:text-[1.7rem] xl:text-[1.9rem]">
                Real
                <br />
                Farmers
                <br />
                Real Change
              </p>
            </div>
          </div>

          {/* Below lg the quote lives under the picture, where it can breathe. */}
          <figure className="mt-8 px-5 sm:px-7 xl:hidden">
            <blockquote className="font-display text-[1.45rem] leading-[1.25] font-medium text-olive italic sm:text-[1.7rem]">
              “When farmers thrive, the world eats better.”
            </blockquote>
            <figcaption className="mt-4 flex flex-wrap gap-x-5 gap-y-1 font-sans text-[0.6875rem] font-medium tracking-[0.2em] text-olive/85 uppercase">
              {IMPACT_WORDS.map((word) => (
                <span key={word}>{word}</span>
              ))}
            </figcaption>
          </figure>
        </div>
      </div>
    </section>
  )
}
