import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { gsap, useGSAP, prefersReducedMotion, EASE } from '../../lib/motion'

type Props = {
  eyebrow: string
  title: React.ReactNode
  lead: string
  image: string
  /** Page title for the document, kept in one place with the banner copy. */
  documentTitle: string
}

/** The inner-page banner: same eyebrow / headline / lead rhythm as the home hero. */
export function PageHero({ eyebrow, title, lead, image, documentTitle }: Props) {
  const root = useRef<HTMLElement>(null)

  useEffect(() => {
    document.title = `${documentTitle} — Crop 96 Agri Exim Pvt. Ltd.`
  }, [documentTitle])

  useGSAP(
    () => {
      if (prefersReducedMotion()) return
      gsap
        .timeline({ defaults: { ease: EASE, duration: 0.75 } })
        .from('[data-page-bg]', { opacity: 0, scale: 1.06, duration: 1.3, ease: 'power2.out' })
        .from('[data-page-crumb]', { opacity: 0, y: 12, duration: 0.5 }, 0.2)
        .from('[data-page-title]', { opacity: 0, yPercent: 100 }, 0.3)
        .from('[data-page-lead]', { opacity: 0, y: 18 }, 0.55)
    },
    { scope: root },
  )

  return (
    <section ref={root} className="relative isolate overflow-hidden" aria-labelledby="page-title">
      <img
        data-page-bg
        src={image}
        alt=""
        width={1920}
        height={900}
        fetchPriority="high"
        decoding="async"
        className="absolute inset-0 -z-10 size-full object-cover"
      />
      <div aria-hidden="true" className="absolute inset-0 -z-10 bg-brand-900/72" />
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-linear-to-r from-brand-900/85 to-brand-900/25"
      />

      <div className="container-96 flex min-h-[clamp(17rem,26vw,21rem)] flex-col justify-center py-12">
        <nav data-page-crumb aria-label="Breadcrumb" className="mb-3">
          <ol className="flex items-center gap-2 text-[0.8125rem] font-bold text-harvest-400">
            <li>
              <Link to="/" className="transition-colors hover:text-white">
                Home
              </Link>
            </li>
            <li aria-hidden="true" className="text-white/40">
              /
            </li>
            <li className="text-white/70">{eyebrow}</li>
          </ol>
        </nav>

        <h1 id="page-title" className="max-w-3xl overflow-hidden text-[clamp(2rem,4.4vw,3rem)] leading-[1.08] text-white">
          <span data-page-title className="block">
            {title}
          </span>
        </h1>

        <p data-page-lead className="mt-4 max-w-2xl text-[0.9375rem] leading-relaxed text-white/85 sm:text-base">
          {lead}
        </p>
      </div>
    </section>
  )
}
