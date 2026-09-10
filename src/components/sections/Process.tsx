import { useRef } from 'react'
import { PROCESS } from '../../lib/site'
import { SectionHeading } from '../ui/SectionHeading'
import { Icon } from '../ui/Icon'
import { gsap, useGSAP, prefersReducedMotion, EASE } from '../../lib/motion'

/**
 * Horizontal on desktop, vertical on mobile. The connecting line draws itself
 * as the section scrolls through, and each step activates in turn.
 */
export function Process() {
  const root = useRef<HTMLElement>(null)

  useGSAP(
    () => {
      const steps = gsap.utils.toArray<HTMLElement>('[data-step]')

      if (prefersReducedMotion()) {
        gsap.set([steps, '[data-track-fill]'], { opacity: 1, scale: 1, y: 0 })
        gsap.set('[data-track-fill]', { scaleX: 1, scaleY: 1 })
        return
      }

      gsap.set(steps, { opacity: 0, y: 26 })

      // The rail fills as you scroll, so the steps read as one continuous path.
      gsap.fromTo(
        '[data-track-fill]',
        { scaleX: 0, scaleY: 0 },
        {
          scaleX: 1,
          scaleY: 1,
          ease: 'none',
          scrollTrigger: {
            trigger: root.current,
            start: 'top 68%',
            end: 'bottom 78%',
            scrub: 0.6,
          },
        },
      )

      gsap.to(steps, {
        opacity: 1,
        y: 0,
        duration: 0.6,
        ease: EASE,
        stagger: 0.14,
        scrollTrigger: { trigger: root.current, start: 'top 72%', once: true },
      })
    },
    { scope: root },
  )

  return (
    <section ref={root} className="bg-sand-50 py-14 sm:py-16">
      <div className="container-96">
        <SectionHeading eyebrow="How We Work" title="From Farm to Market" />

        <ol className="relative mt-10 grid gap-8 md:grid-cols-5 md:gap-4">
          {/* Rail — horizontal from md up, vertical below. */}
          <span
            aria-hidden="true"
            className="absolute left-[2rem] top-6 -z-0 h-[calc(100%-3rem)] w-px bg-brand-500/15 md:left-[10%] md:top-[2rem] md:h-px md:w-[80%]"
          >
            <span
              data-track-fill
              className="block size-full origin-top bg-brand-500/45 md:origin-left"
            />
          </span>

          {PROCESS.map((item, i) => (
            <li
              key={item.step}
              data-step
              className="group relative z-10 flex items-start gap-4 md:flex-col md:items-center md:gap-0 md:text-center"
            >
              <div className="relative shrink-0">
                <span className="flex size-16 items-center justify-center rounded-full bg-sage-100 text-brand-600 ring-8 ring-sand-50 transition-[background-color,color,transform] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-105 group-hover:bg-brand-500 group-hover:text-white">
                  <Icon name={item.icon} className="size-7" />
                </span>
                <span className="absolute -left-1 -top-1 flex size-7 items-center justify-center rounded-full bg-harvest-500 text-[0.6875rem] font-extrabold text-ink-900">
                  {item.step}
                </span>
              </div>

              <h3 className="text-[0.9375rem] leading-snug md:mt-4 md:max-w-[11rem]">{item.title}</h3>

              {/* Arrow between steps, as in the reference. */}
              {i < PROCESS.length - 1 && (
                <Icon
                  name="arrow"
                  aria-hidden="true"
                  className="absolute left-[1.8rem] top-[4.25rem] size-5 rotate-90 text-brand-500 md:left-auto md:right-[-0.5rem] md:top-[1.6rem] md:rotate-0"
                />
              )}
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
