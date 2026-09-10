import { SERVICES } from '../../lib/site'
import { SectionHeading } from '../ui/SectionHeading'
import { ServiceCard } from '../cards/ServiceCard'

export function Services() {
  return (
    <section id="services" className="relative overflow-hidden bg-sand-50 py-14 sm:py-16">
      <WheatWatermark className="left-0" />
      <WheatWatermark className="right-0 -scale-x-100" />
      <div className="container-96 relative">
        <SectionHeading
          eyebrow="Our Services"
          title="What We Offer"
          lead="From farm to market, we provide end-to-end agricultural sourcing and supply solutions."
        />
        <div className="mt-9 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {SERVICES.map((service, i) => (
            <ServiceCard key={service.slug} service={service} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}

/** The faint wheat-frond texture flanking this section in the reference. */
function WheatWatermark({ className }: { className: string }) {
  return (
    <svg
      aria-hidden="true"
      className={`pointer-events-none absolute inset-y-0 hidden h-full w-40 text-harvest-500/[0.055] xl:block ${className}`}
      viewBox="0 0 160 600"
      fill="none"
      stroke="currentColor"
      strokeWidth="10"
      strokeLinecap="round"
    >
      <path d="M110 600C110 380 70 200 10 60" />
      <path d="M104 520C60 500 40 460 40 410M104 520c30-30 34-72 20-118" />
      <path d="M88 400C46 382 28 344 30 294M88 400c30-30 32-72 16-118" />
      <path d="M68 282C28 264 12 226 16 176M68 282c28-30 30-72 12-118" />
      <path d="M44 162C8 142-4 106 4 58M44 162c26-32 26-74 6-118" />
    </svg>
  )
}
