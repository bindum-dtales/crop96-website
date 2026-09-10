import { useRef } from 'react'
import { Button } from '../ui/Button'
import { Icon } from '../ui/Icon'
import { gsap, useGSAP, prefersReducedMotion, EASE } from '../../lib/motion'

/**
 * Page-load choreography, in the order the reference reads:
 * background → eyebrow → headline lines → lead → CTAs → trust point.
 */
export function Hero() {
  const root = useRef<HTMLElement>(null)

  useGSAP(
    () => {
      if (prefersReducedMotion()) {
        gsap.set('[data-hero]', { opacity: 1, clearProps: 'transform' })
        return
      }

      const tl = gsap.timeline({ defaults: { ease: EASE, duration: 0.85 } })

      tl.from('[data-hero="bg"]', { opacity: 0, scale: 1.07, duration: 1.6, ease: 'power2.out' })
        .from('[data-hero="eyebrow"]', { opacity: 0, y: 14, duration: 0.6 }, 0.35)
        .from('[data-hero="line"]', { opacity: 0, yPercent: 108, stagger: 0.11 }, 0.45)
        .from('[data-hero="lead"]', { opacity: 0, y: 22 }, 0.85)
        .from('[data-hero="cta"]', { opacity: 0, y: 18, stagger: 0.12, duration: 0.6 }, 1.0)
        .from('[data-hero="trust"]', { opacity: 0, y: 14, duration: 0.6 }, 1.25)
    },
    { scope: root },
  )

  return (
    <section ref={root} className="relative isolate overflow-hidden" aria-labelledby="hero-title">
      <img
        data-hero="bg"
        src="/img/hero.webp"
        alt=""
        width={1920}
        height={1080}
        fetchPriority="high"
        decoding="async"
        className="absolute inset-0 -z-10 size-full object-cover object-center"
      />
      {/* Warm-to-clear wash so the headline holds contrast over the field. */}
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-linear-to-r from-white/94 via-white/62 to-transparent"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-linear-to-t from-white/35 via-transparent to-transparent"
      />

      <div className="container-96 flex min-h-[clamp(25rem,40vw,31rem)] flex-col justify-center py-12 sm:py-14">
        <div className="max-w-[36rem]">
          <p data-hero="eyebrow" className="eyebrow">
            Nourishing Markets Together
            <span aria-hidden="true" className="h-px w-8 bg-harvest-500/70" />
          </p>

          <h1
            id="hero-title"
            className="mt-4 text-[clamp(2.125rem,5.2vw,3.25rem)] leading-[1.06]"
          >
            {/* Each line sits in its own overflow mask so it can wipe upward. */}
            <span className="block overflow-hidden pb-[0.06em]">
              <span data-hero="line" className="block">
                Quality Produce.
              </span>
            </span>
            <span className="block overflow-hidden pb-[0.06em]">
              <span data-hero="line" className="block text-brand-500">
                Direct From Farmers.
              </span>
            </span>
          </h1>

          <p
            data-hero="lead"
            className="mt-5 max-w-[30rem] text-[0.9375rem] leading-relaxed text-ink-700 sm:text-base"
          >
            We source quality agricultural produce directly from farmers across Karnataka and supply
            wholesalers, retailers and export markets with reliable quality and fair value.
          </p>

          <div className="mt-7 flex flex-wrap items-center gap-3">
            <span data-hero="cta">
              <Button to="/products" arrow>
                Explore Products
              </Button>
            </span>
            <span data-hero="cta">
              <Button to="/contact" variant="outline">
                Contact Us
              </Button>
            </span>
          </div>

          <p
            data-hero="trust"
            className="mt-7 flex items-center gap-2.5 text-[0.9375rem] font-bold text-ink-900"
          >
            <span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-brand-500 text-white">
              <Icon name="check" className="size-3.5" />
            </span>
            Directly sourced from farmers across Karnataka
          </p>
        </div>
      </div>
    </section>
  )
}
