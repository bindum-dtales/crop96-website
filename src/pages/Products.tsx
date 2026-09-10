import { PRODUCTS } from '../lib/site'
import { PageHero } from '../components/sections/PageHero'
import { SectionHeading, Hi } from '../components/ui/SectionHeading'
import { CalloutBand } from '../components/sections/CalloutBand'
import { Button } from '../components/ui/Button'
import { Icon } from '../components/ui/Icon'

export default function Products() {
  return (
    <>
      <PageHero
        documentTitle="Products"
        eyebrow="Products"
        title="Quality agricultural produce, in season"
        lead="Groundnut, rice, maize, mango and sugarcane — sourced from the growing belts of Karnataka and graded before they leave for wholesale, retail or export."
        image="/img/page-products.webp"
      />

      <section className="bg-white py-14 sm:py-16">
        <div className="container-96">
          <SectionHeading
            eyebrow="Our Products"
            title={
              <>
                What we <Hi>source and supply</Hi>
              </>
            }
            lead="Every crop below is bought at the farm gate, graded against a written specification and packed for the channel it is destined for."
          />

          <div className="mt-12 space-y-6">
            {PRODUCTS.map((product, i) => (
              <article
                key={product.slug}
                id={product.slug}
                data-reveal="up-lg"
                data-reveal-delay={Math.min(i, 3) * 0.05}
                className="group grid scroll-mt-28 items-center gap-6 overflow-hidden rounded-panel border border-ink-900/8 bg-sand-50 p-5 shadow-card transition-shadow duration-500 hover:shadow-card-hover sm:grid-cols-[10rem_minmax(0,1fr)] sm:gap-8 sm:p-6 lg:grid-cols-[13rem_minmax(0,1fr)_auto]"
              >
                <div className="relative w-fit">
                  <img
                    src={product.image}
                    alt={product.name}
                    width={700}
                    height={700}
                    loading="lazy"
                    decoding="async"
                    className="size-32 rounded-2xl object-cover transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.04] sm:size-40 lg:size-52"
                  />
                  <span
                    aria-hidden="true"
                    className={`absolute -bottom-2 -right-2 flex size-11 items-center justify-center rounded-full text-white ring-4 ring-sand-50 ${
                      product.tone === 'brand' ? 'bg-brand-500' : 'bg-harvest-500'
                    }`}
                  >
                    <Icon name={product.icon} className="size-5" />
                  </span>
                </div>

                <div>
                  <h3 className="text-[clamp(1.25rem,2.2vw,1.5rem)] leading-tight">{product.name}</h3>
                  <p className="mt-2.5 max-w-xl text-[0.9375rem] leading-relaxed text-ink-500">
                    {product.blurb}
                  </p>
                  <dl className="mt-5 grid gap-x-8 gap-y-3 text-[0.8125rem] sm:grid-cols-3">
                    <Spec term="Season" value={product.season} />
                    <Spec term="Grades" value={product.grades} />
                    <Spec term="Packaging" value={product.packaging} />
                  </dl>
                </div>

                <Button to="/contact" arrow className="lg:self-center">
                  Enquire
                  <span className="sr-only">about {product.name}</span>
                </Button>
              </article>
            ))}
          </div>
        </div>
      </section>

      <CalloutBand
        title="Looking for a crop that is not listed?"
        lead="We source seasonally across Karnataka. Tell us the crop, grade and volume and we will confirm what we can supply."
        cta="Ask About a Crop"
      />
    </>
  )
}

function Spec({ term, value }: { term: string; value: string }) {
  return (
    <div>
      <dt className="font-extrabold uppercase tracking-[0.1em] text-harvest-700">{term}</dt>
      <dd className="mt-1 font-semibold text-ink-700">{value}</dd>
    </div>
  )
}
