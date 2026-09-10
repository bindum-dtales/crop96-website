import { PRODUCTS } from '../../lib/site'
import { SectionHeading, Hi } from '../ui/SectionHeading'
import { ProductCard } from '../cards/ProductCard'

export function Products() {
  return (
    <section id="products" className="bg-white py-14 sm:py-16">
      <div className="container-96">
        <SectionHeading
          eyebrow="Our Products"
          title={
            <>
              Quality <Hi>Agricultural</Hi> Produce
            </>
          }
          lead="We supply a range of high-quality agricultural products sourced directly from farmers across Karnataka."
        />

        <div
          data-reveal="up-lg"
          className="mt-8 overflow-hidden rounded-panel bg-linear-to-br from-brand-600 via-brand-700 to-brand-800 shadow-panel"
        >
          <div className="grid sm:grid-cols-2 lg:grid-cols-5">
            {PRODUCTS.map((product, i) => (
              <ProductCard key={product.slug} product={product} index={i} />
            ))}
          </div>
        </div>

        {/* The short amber rule that closes the strip in the reference. */}
        <div
          data-reveal="fade"
          aria-hidden="true"
          className="mx-auto mt-6 h-[3px] w-40 rounded-full bg-harvest-400"
        />
      </div>
    </section>
  )
}
