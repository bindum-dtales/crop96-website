import { SERVICES } from '../lib/site'
import { PageHero } from '../components/sections/PageHero'
import { SectionHeading, Hi } from '../components/ui/SectionHeading'
import { Process } from '../components/sections/Process'
import { Button } from '../components/ui/Button'
import { Icon } from '../components/ui/Icon'
import { CalloutBand } from '../components/sections/CalloutBand'

export default function Services() {
  return (
    <>
      <PageHero
        documentTitle="Services"
        eyebrow="Services"
        title="End-to-end agricultural sourcing and supply"
        lead="We handle the whole route from the farm gate to the buyer's dock — procurement, grading, storage and dispatch — so quality and quantity stay predictable across the season."
        image="/img/page-services.webp"
      />

      <section className="bg-white py-14 sm:py-16">
        <div className="container-96">
          <SectionHeading
            eyebrow="What We Offer"
            title={
              <>
                Four ways we <Hi>move produce</Hi>
              </>
            }
            lead="Each service runs on the same sourcing base, so a buyer in one channel gets the same grading discipline as a buyer in another."
          />

          <div className="mt-12 space-y-14">
            {SERVICES.map((service, i) => (
              <article
                key={service.slug}
                id={service.slug}
                className="grid scroll-mt-28 items-center gap-8 lg:grid-cols-2 lg:gap-14"
              >
                <div
                  data-reveal="image"
                  className={`relative overflow-hidden rounded-panel shadow-card ${
                    i % 2 ? 'lg:order-2' : ''
                  }`}
                >
                  <img
                    src={service.image}
                    alt={service.title}
                    width={800}
                    height={600}
                    loading="lazy"
                    decoding="async"
                    className="aspect-[4/3] w-full object-cover"
                  />
                  <span
                    aria-hidden="true"
                    className={`absolute bottom-4 left-4 flex size-12 items-center justify-center rounded-full text-white shadow-lg ${
                      service.tone === 'brand' ? 'bg-brand-500' : 'bg-harvest-500'
                    }`}
                  >
                    <Icon name={service.icon} className="size-6" />
                  </span>
                </div>

                <div data-reveal={i % 2 ? 'right' : 'left'}>
                  <p className="eyebrow">
                    <span aria-hidden="true" className="h-px w-7 bg-harvest-500/70" />
                    0{i + 1}
                  </p>
                  <h3 className="mt-3 text-[clamp(1.375rem,2.4vw,1.75rem)] leading-tight">
                    {service.title}
                  </h3>
                  <p className="mt-3 text-[0.9375rem] leading-relaxed text-ink-700">{service.blurb}</p>
                  <ul className="mt-5 space-y-3">
                    {service.detail.map((d) => (
                      <li key={d} className="flex gap-3 text-[0.9375rem] leading-relaxed text-ink-500">
                        <span
                          aria-hidden="true"
                          className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-brand-50 text-brand-600"
                        >
                          <Icon name="check" className="size-3" />
                        </span>
                        {d}
                      </li>
                    ))}
                  </ul>
                  <Button to="/contact" arrow className="mt-6">
                    Enquire About This
                  </Button>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <Process />
      <CalloutBand
        title="Tell us what you need and the season you need it in."
        lead="Share a requirement and we will come back with grade, availability and indicative pricing."
      />
    </>
  )
}
