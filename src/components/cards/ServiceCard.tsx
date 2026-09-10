import { Link } from 'react-router-dom'
import { Icon } from '../ui/Icon'
import type { Service } from '../../lib/site'

type Props = { service: Service; index: number }

/**
 * Photo, circular icon straddling the image edge, then centred copy —
 * the card shape used across the reference.
 */
export function ServiceCard({ service, index }: Props) {
  return (
    <article
      data-reveal="up-lg"
      data-reveal-delay={index * 0.06}
      className="group relative flex flex-col overflow-hidden rounded-card border border-ink-900/8 bg-white shadow-card transition-[box-shadow,transform] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-1.5 hover:shadow-card-hover"
    >
      <div className="relative">
        <div className="aspect-[16/10] overflow-hidden">
          <img
            src={service.image}
            alt={service.title}
            width={800}
            height={600}
            loading="lazy"
            decoding="async"
            className="size-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.06]"
          />
        </div>
        <span
          aria-hidden="true"
          className={`absolute -bottom-7 left-1/2 z-10 flex size-14 -translate-x-1/2 items-center justify-center rounded-full text-white ring-4 ring-white transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-110 ${
            service.tone === 'brand' ? 'bg-brand-500' : 'bg-harvest-500'
          }`}
        >
          <Icon name={service.icon} className="size-6" />
        </span>
      </div>

      <div className="flex grow flex-col items-center px-5 pb-6 pt-11 text-center">
        <h3 className="text-[1.125rem] leading-snug">{service.title}</h3>
        <p className="mt-2.5 grow text-[0.875rem] leading-relaxed text-ink-500">{service.blurb}</p>
        <Link
          to={`/services#${service.slug}`}
          className="mt-4 inline-flex items-center gap-1.5 text-[0.875rem] font-bold text-brand-700 transition-colors hover:text-brand-800"
        >
          Learn More
          <Icon
            name="arrow"
            className="size-3.5 transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-1"
          />
          <span className="sr-only">about {service.title}</span>
        </Link>
      </div>
    </article>
  )
}
