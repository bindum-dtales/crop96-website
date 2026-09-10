import { Link } from 'react-router-dom'
import { Icon } from '../ui/Icon'
import type { Product } from '../../lib/site'

type Props = { product: Product; index: number }

/** One column of the green produce strip: crop image, badge, name, blurb, link. */
export function ProductCard({ product, index }: Props) {
  return (
    <article
      data-reveal="scale"
      data-reveal-delay={index * 0.07}
      className="group relative flex flex-col items-center px-4 py-7 text-center sm:px-5 border-b border-white/15 last:border-b-0 sm:border-b-0 lg:border-r lg:last:border-r-0"
    >
      <div className="relative">
        <img
          src={product.image}
          alt={product.name}
          width={700}
          height={700}
          loading="lazy"
          decoding="async"
          className="size-24 rounded-full object-cover shadow-[0_14px_30px_-14px_rgb(0_0_0_/_0.55)] transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:-translate-y-1.5 group-hover:scale-105 sm:size-28"
        />
        <span
          aria-hidden="true"
          className={`absolute -bottom-1 -right-1 flex size-9 items-center justify-center rounded-full text-white ring-[3px] ring-brand-700 transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-110 ${
            product.tone === 'brand' ? 'bg-brand-500' : 'bg-harvest-500'
          }`}
        >
          <Icon name={product.icon} className="size-4.5" />
        </span>
      </div>

      <h3 className="mt-5 text-[1.0625rem] text-white">{product.name}</h3>
      <p className="mt-2 grow text-[0.8125rem] leading-relaxed text-white/80">{product.blurb}</p>
      <Link
        to={`/products#${product.slug}`}
        className="mt-4 inline-flex items-center gap-1.5 text-[0.8125rem] font-bold text-white/95 transition-colors hover:text-harvest-400"
      >
        Learn More
        <Icon
          name="arrow"
          className="size-3.5 transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-1"
        />
        <span className="sr-only">about {product.name}</span>
      </Link>
    </article>
  )
}
