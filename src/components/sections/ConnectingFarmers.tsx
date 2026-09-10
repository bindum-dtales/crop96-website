import { useRef } from 'react'
import { BENEFITS } from '../../lib/site'
import { SectionHeading, Hi } from '../ui/SectionHeading'
import { Button } from '../ui/Button'
import { Icon } from '../ui/Icon'
import { useGSAP, parallax } from '../../lib/motion'

/** The wide landscape band, with a very small parallax drift on the photo. */
export function ConnectingFarmers() {
  const root = useRef<HTMLElement>(null)
  const layer = useRef<HTMLImageElement>(null)

  useGSAP(
    () => {
      if (layer.current && root.current) parallax(layer.current, root.current, 0.12)
    },
    { scope: root },
  )

  return (
    <section
      ref={root}
      id="about"
      className="relative isolate overflow-hidden py-14 sm:py-16"
      aria-labelledby="about-title"
    >
      <img
        ref={layer}
        src="/img/about-fields.webp"
        alt=""
        width={1920}
        height={1000}
        loading="lazy"
        decoding="async"
        /* Over-tall so the parallax drift never exposes an edge. */
        className="absolute inset-x-0 top-[-12%] -z-10 h-[124%] w-full object-cover"
      />
      <div aria-hidden="true" className="absolute inset-0 -z-10 bg-white/58" />
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-linear-to-b from-white via-white/10 to-white"
      />

      <div className="container-96">
        <SectionHeading
          eyebrow="About Crop 96"
          title={
            <>
              Connecting Farmers With <Hi>Better Markets</Hi>
            </>
          }
          className="[&_p:last-child]:text-ink-700"
          lead="Crop 96 Agri Exim Pvt. Ltd. is an agricultural produce sourcing, trading and supply company focused on connecting farmers with wholesalers, retailers and markets across India and beyond. We procure agricultural produce directly from farmers, particularly across Karnataka, and work to create a transparent and reliable supply chain from farm to market."
        />
        {/* SectionHeading renders an h2; name it for the aria-labelledby above. */}
        <span id="about-title" className="sr-only">
          Connecting farmers with better markets
        </span>

        <ul className="mx-auto mt-7 flex max-w-3xl flex-wrap items-center justify-center gap-x-10 gap-y-4">
          {BENEFITS.map((b, i) => (
            <li
              key={b.title}
              data-reveal
              data-reveal-delay={i * 0.09}
              className="flex items-center gap-2.5"
            >
              <span
                className={`flex size-7 shrink-0 items-center justify-center rounded-full text-white ${
                  b.tone === 'brand' ? 'bg-brand-500' : 'bg-harvest-500'
                }`}
                aria-hidden="true"
              >
                <Icon name="check" className="size-4" />
              </span>
              <span className="whitespace-pre-line text-[0.9375rem] font-bold leading-tight text-ink-900">
                {b.title}
              </span>
            </li>
          ))}
        </ul>

        <div data-reveal data-reveal-delay={0.28} className="mt-7 flex justify-center">
          <Button to="/about" arrow>
            Know More
          </Button>
        </div>
      </div>
    </section>
  )
}
