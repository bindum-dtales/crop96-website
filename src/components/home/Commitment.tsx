import { useRef } from 'react'
import { COMMITMENTS } from '../../lib/home'
import { LeafSpray } from '../ui/LeafSpray'
import { LineIcon } from '../ui/LineIcon'
import {
  gsap,
  useGSAP,
  drift,
  lineReveal,
  parallax,
  prefersReducedMotion,
  EASE,
} from '../../lib/motion'

/**
 * Section 05b — the commitment that closes the page.
 *
 * A full-bleed band on a pale sage ground that gives way to the land on its
 * right. The wash is horizontal on wide screens, so the type sits on colour
 * and the photograph opens behind it; on narrow ones it turns vertical and the
 * land settles under the content instead, which keeps the copy on a flat
 * ground rather than fighting a picture for it.
 */
export function Commitment() {
  const root = useRef<HTMLElement>(null)
  const media = useRef<HTMLDivElement>(null)
  const leaves = useRef<SVGSVGElement>(null)

  useGSAP(
    () => {
      const scope = root.current
      if (!scope) return

      lineReveal(scope, { trigger: scope, stagger: 0.09 })

      if (prefersReducedMotion()) return

      if (media.current) parallax(media.current, scope, 0.16)
      if (leaves.current) drift(leaves.current, scope, { y: 8, rotate: 2 })

      // The four pledges come up together off their own rules.
      const items = scope.querySelectorAll('[data-pledge]')
      if (items.length) {
        gsap
          .timeline({ scrollTrigger: { trigger: items[0], start: 'top 88%', once: true } })
          .fromTo(
            scope.querySelectorAll('[data-pledge-rule]'),
            { scaleY: 0 },
            { scaleY: 1, duration: 0.9, stagger: 0.09, ease: 'power2.inOut' },
          )
          .fromTo(
            items,
            { y: 22, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.85, stagger: 0.09, ease: EASE },
            0.12,
          )
      }
    },
    { scope: root },
  )

  return (
    <section
      ref={root}
      aria-labelledby="commitment-title"
      className="relative isolate mt-5 overflow-hidden lg:mt-6"
    >
      <div ref={media} className="absolute inset-0 -z-10">
        <img
          src="/img/page-about.webp"
          alt="Palms and cropland running back to hills under morning haze"
          width={1920}
          height={1080}
          loading="lazy"
          decoding="async"
          className="size-full scale-125 object-cover object-[64%_54%] brightness-[1.07] saturate-[0.78]"
        />
      </div>

      {/* The band's ground, carried across the picture and let go of on the
          right. Sage over ivory is the tone the reference sits on. */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 bg-[linear-gradient(to_top,rgb(230_231_216)_62%,rgb(230_231_216/0.92)_76%,rgb(230_231_216/0.55)_90%,rgb(230_231_216/0.34)_100%)] lg:bg-[linear-gradient(to_right,rgb(230_231_216)_46%,rgb(230_231_216/0.9)_58%,rgb(230_231_216/0.52)_73%,rgb(230_231_216/0.34)_100%)]"
      />

      <LeafSpray
        ref={leaves}
        flip
        className="pointer-events-none absolute -top-14 -left-28 w-60 opacity-55 sm:-left-24 sm:w-76 lg:-top-20 lg:-left-24 lg:w-[24rem]"
      />

      <div className="container-96 relative py-12 lg:py-14">
        <div className="lg:grid lg:grid-cols-[minmax(0,1fr)_minmax(0,12rem)] lg:items-center lg:gap-x-12">
          <div>
            <p
              data-reveal="up"
              className="font-sans text-[0.6875rem] font-medium tracking-[0.22em] text-ink-soft uppercase sm:text-xs"
            >
              Our Commitment
            </p>

            <div className="mt-4 grid gap-y-6 lg:mt-5 lg:grid-cols-[minmax(0,auto)_minmax(0,1fr)] lg:gap-x-11">
              <h2
                id="commitment-title"
                className="display text-[clamp(1.9rem,7vw,2.4rem)] lg:text-[clamp(2rem,2.9vw,2.6rem)]"
              >
                <span data-mask className="line-mask">
                  <span className="block">Consistent quality.</span>
                </span>
                <span data-mask className="line-mask">
                  <span className="block">Long-term partnerships.</span>
                </span>
              </h2>

              <div className="lg:border-l lg:border-ink/12 lg:pt-1.5 lg:pl-11">
                <p
                  data-reveal="up"
                  className="max-w-[42ch] text-[0.9375rem] leading-[1.6] text-ink-soft"
                >
                  We work closely with farmers, buyers and businesses to build a more reliable,
                  transparent and sustainable supply chain.
                </p>
              </div>
            </div>

            <ul className="mt-11 grid grid-cols-2 gap-y-9 lg:mt-14 lg:grid-cols-4 lg:gap-y-0">
              {COMMITMENTS.map((pledge, i) => (
                <li
                  key={pledge.title}
                  className={`group relative ${i % 2 === 1 ? 'pl-6' : 'pr-6'} lg:pr-6 ${
                    i > 0 ? 'lg:pl-7' : ''
                  }`}
                >
                  {/* Rules divide the columns, so on the two-up grid only the
                      right-hand pair carries one. */}
                  {i > 0 && (
                    <span
                      data-pledge-rule
                      aria-hidden="true"
                      className={`absolute inset-y-0 left-0 w-px origin-top bg-ink/12 lg:block ${
                        i % 2 === 1 ? 'block' : 'hidden'
                      }`}
                    />
                  )}
                  <span data-pledge className="block">
                    <LineIcon
                      name={pledge.icon}
                      strokeWidth={1.4}
                      className="size-7 text-olive transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:-translate-y-0.5"
                    />
                    <span className="mt-4 block font-sans text-[0.9375rem] font-semibold text-ink">
                      {pledge.title}
                    </span>
                    <span className="mt-1.5 block text-[0.8125rem] leading-[1.5] text-ink-soft">
                      {pledge.copy}
                    </span>
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* The closing note, out on the land. */}
          <p
            data-reveal="up"
            data-reveal-delay="0.12"
            className="mt-12 font-sans text-[0.625rem] leading-[1.9] font-medium tracking-[0.2em] text-ink uppercase lg:mt-0 lg:justify-self-end lg:text-[0.6875rem]"
          >
            Better
            <br />
            Connections
            <br />
            A Stronger
            <br />
            Food Future.
            <span aria-hidden="true" className="mt-3 block h-px w-9 bg-ink/25" />
          </p>
        </div>
      </div>
    </section>
  )
}
