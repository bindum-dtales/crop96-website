import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { OFFERINGS } from '../../lib/home'
import { Eyebrow } from '../ui/Eyebrow'
import { LineIcon } from '../ui/LineIcon'
import {
  gsap,
  useGSAP,
  lineReveal,
  prefersReducedMotion,
  EASE,
} from '../../lib/motion'

/**
 * Section 05 — what we offer.
 *
 * A masthead set across three columns — display type, a ruled-off standfirst
 * and the margin notes — over a row of four outlined panels that run the full
 * measure. The panels carry no fill and no shadow: a hairline and the
 * photograph do the work, which is what keeps four of them in a row from
 * reading as a card deck.
 */
export function WhatWeOffer() {
  const root = useRef<HTMLElement>(null)

  useGSAP(
    () => {
      const scope = root.current
      if (!scope) return

      lineReveal(scope, { trigger: scope, stagger: 0.08 })

      if (prefersReducedMotion()) return

      // The panels arrive as one row rather than four objects: the frames wipe
      // up together on a short stagger, and each picture eases out of its own
      // overscale behind the wipe so the row settles instead of popping.
      gsap.utils.toArray<HTMLElement>(scope.querySelectorAll('[data-panel]')).forEach((panel, i) => {
        const at = i * 0.12
        gsap
          .timeline({ scrollTrigger: { trigger: panel, start: 'top 86%', once: true } })
          .fromTo(
            panel,
            { y: 30, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.95, ease: EASE, delay: at },
          )
          .fromTo(
            panel.querySelector('[data-panel-frame]'),
            { clipPath: 'inset(0 0 100% 0)' },
            { clipPath: 'inset(0 0 0% 0)', duration: 1.1, ease: 'power3.inOut' },
            at + 0.1,
          )
          .fromTo(
            panel.querySelector('[data-panel-img]'),
            { scale: 1.16 },
            { scale: 1, duration: 1.4, ease: EASE },
            at + 0.1,
          )
      })
    },
    { scope: root },
  )

  return (
    <section ref={root} aria-labelledby="offer-title" className="relative isolate mt-24 lg:mt-32">
      <div className="container-96">
        <span data-reveal="up">
          <Eyebrow index="05">What We Offer</Eyebrow>
        </span>

        {/* Two even halves: the display type takes the left, the standfirst
            the right. An `auto` first column would leave the copy stranded
            mid-measure with the whole right side empty. */}
        <div className="mt-6 grid gap-y-8 lg:mt-7 lg:grid-cols-2 lg:gap-x-12 xl:gap-x-14">
          <h2
            id="offer-title"
            className="display text-[clamp(2.6rem,10.5vw,3.5rem)] sm:text-[clamp(3.2rem,7vw,4.4rem)] lg:text-[clamp(2.9rem,4.6vw,4.5rem)]"
          >
            <span data-mask className="line-mask">
              <span className="block">From source</span>
            </span>
            <span data-mask className="line-mask">
              <span className="block">
                to <span className="text-moss">shelf.</span>
              </span>
            </span>
          </h2>

          {/* The standfirst is ruled off the headline rather than boxed. */}
          <div className="lg:border-l lg:border-rule lg:pt-2.5 lg:pl-12 xl:pl-14">
            <p
              data-reveal="up"
              className="max-w-[34ch] text-[1.0625rem] leading-[1.55] text-ink-soft"
            >
              We source, handle and deliver quality agricultural produce for businesses across India
              and global markets.
            </p>
          </div>
        </div>
      </div>

      {/* ── The four routes ────────────────────────────────────── */}
      <div className="container-96 mt-9 lg:mt-12">
        <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4 lg:gap-3.5">
          {OFFERINGS.map((item) => (
            <li key={item.title} data-panel>
              <Link
                to={item.to}
                className="group flex h-full flex-col border border-rule-soft p-1.5 transition-colors duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:border-rule"
              >
                <span data-panel-frame className="block overflow-hidden">
                  <img
                    data-panel-img
                    src={item.image}
                    alt={item.alt}
                    width={720}
                    height={412}
                    loading="lazy"
                    decoding="async"
                    className="aspect-[7/4] w-full object-cover transition-transform duration-[1100ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.035]"
                  />
                </span>

                <span className="relative block grow px-4 pt-5 pb-6 sm:px-5">
                  <span className="flex items-center gap-4 pr-12">
                    <span className="font-sans text-[0.8125rem] tracking-[0.1em] text-ink-faint">
                      {item.index}
                    </span>
                    <span aria-hidden="true" className="h-px w-full max-w-[6.5rem] bg-rule" />
                  </span>

                  {/* Straddles the number and the title, as in the reference. */}
                  <span
                    aria-hidden="true"
                    className="absolute top-[1.6rem] right-4 grid size-10 place-items-center rounded-full border border-ink/20 text-ink transition-[background-color,border-color,color] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:border-forest group-hover:bg-forest group-hover:text-ivory sm:right-5"
                  >
                    <LineIcon
                      name="arrow"
                      strokeWidth={1.4}
                      className="size-4 transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-0.5"
                    />
                  </span>

                  <span className="mt-4 block font-display text-[1.3125rem] leading-[1.15] font-bold text-ink lg:text-[1.375rem]">
                    {item.title}
                    {item.note && (
                      <span className="font-display text-[0.875rem] font-bold"> {item.note}</span>
                    )}
                  </span>
                  <span className="mt-2.5 block max-w-[30ch] text-[0.9375rem] leading-[1.55] text-ink-soft">
                    {item.copy}
                  </span>
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
