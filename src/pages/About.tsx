import { PageHero } from '../components/sections/PageHero'
import { SectionHeading, Hi } from '../components/ui/SectionHeading'
import { Process } from '../components/sections/Process'
import { CalloutBand } from '../components/sections/CalloutBand'
import { Icon, type IconName } from '../components/ui/Icon'

const VALUES: { icon: IconName; title: string; copy: string }[] = [
  {
    icon: 'handshake',
    title: 'Fair Value for Farmers',
    copy: 'Prices agreed before harvest and settled on a fixed cycle, so growers can plan the next season.',
  },
  {
    icon: 'gear',
    title: 'Quality Products',
    copy: 'Every lot is graded, cleaned and checked against a written specification before dispatch.',
  },
  {
    icon: 'sprout',
    title: 'Direct Sourcing in Karnataka',
    copy: 'Field teams buy at the farm gate across the state’s producing belts — no chain of intermediaries.',
  },
  {
    icon: 'globe',
    title: 'Markets at Both Ends',
    copy: 'Wholesale, retail and export channels served from one sourcing base and one grading standard.',
  },
]

const FIGURES = [
  { value: '5', label: 'Core crops sourced' },
  { value: '3', label: 'Supply channels served' },
  { value: 'Karnataka', label: 'Primary sourcing region' },
]

export default function About() {
  return (
    <>
      <PageHero
        documentTitle="About Us"
        eyebrow="About Us"
        title="Connecting farmers with better markets"
        lead="Crop 96 Agri Exim Pvt. Ltd. is an agricultural produce sourcing, trading and supply company working to build a transparent, reliable supply chain from farm to market."
        image="/img/page-about.webp"
      />

      <section className="bg-white py-14 sm:py-16">
        <div className="container-96 grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
          <div data-reveal="image" className="relative">
            <img
              src="/img/farmer-portrait.webp"
              alt="A farmer working a field at dawn"
              width={900}
              height={1100}
              loading="lazy"
              decoding="async"
              className="aspect-[4/5] w-full rounded-panel object-cover shadow-card"
            />
            <img
              src="/img/farmer-plant.webp"
              alt=""
              width={900}
              height={1100}
              loading="lazy"
              decoding="async"
              className="absolute -bottom-6 -right-4 hidden aspect-square w-40 rounded-2xl border-4 border-white object-cover shadow-card-hover sm:block lg:w-48"
            />
          </div>

          <div>
            <SectionHeading
              align="left"
              eyebrow="Who We Are"
              title={
                <>
                  A supply chain built on <Hi>direct relationships</Hi>
                </>
              }
            />
            <div className="mt-4 space-y-4 text-[0.9375rem] leading-relaxed text-ink-500">
              <p data-reveal>
                We procure agricultural produce directly from farmers, particularly across Karnataka,
                and supply wholesalers, retailers and export buyers across India and beyond. Buying at
                the farm gate keeps the chain short: the grower knows the price before harvest, and the
                buyer knows exactly where a consignment came from.
              </p>
              <p data-reveal>
                Between those two ends sits the work that makes the difference — grading, cleaning,
                lot-numbering and staging. It is unglamorous, and it is the reason a repeat buyer gets
                the same product in week twelve that they got in week one.
              </p>
            </div>

            <dl className="mt-8 grid gap-6 sm:grid-cols-3">
              {FIGURES.map((f, i) => (
                <div key={f.label} data-reveal data-reveal-delay={i * 0.08}>
                  <dt className="sr-only">{f.label}</dt>
                  <dd>
                    <span className="block text-[clamp(1.5rem,3vw,2rem)] font-extrabold leading-none text-brand-600">
                      {f.value}
                    </span>
                    <span className="mt-1.5 block text-[0.8125rem] font-semibold text-ink-500">
                      {f.label}
                    </span>
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>

      <section className="bg-sand-50 py-14 sm:py-16">
        <div className="container-96">
          <SectionHeading
            eyebrow="What We Stand For"
            title="How we work with growers and buyers"
            lead="Four commitments that shape every consignment we handle."
          />
          <div className="mt-11 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {VALUES.map((v, i) => (
              <article
                key={v.title}
                data-reveal="up-lg"
                data-reveal-delay={i * 0.06}
                className="group rounded-card border border-ink-900/8 bg-white p-6 shadow-card transition-[box-shadow,transform] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-1.5 hover:shadow-card-hover"
              >
                <span
                  aria-hidden="true"
                  className="flex size-12 items-center justify-center rounded-full bg-sage-100 text-brand-600 transition-[background-color,color] duration-500 group-hover:bg-brand-500 group-hover:text-white"
                >
                  <Icon name={v.icon} className="size-6" />
                </span>
                <h3 className="mt-4 text-[1.0625rem] leading-snug">{v.title}</h3>
                <p className="mt-2 text-[0.875rem] leading-relaxed text-ink-500">{v.copy}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <Process />

      <CalloutBand
        title="Grow with us, or buy from us."
        lead="Whether you farm in Karnataka or buy produce for a market anywhere, we would like to hear from you."
        cta="Start a Conversation"
      />
    </>
  )
}
