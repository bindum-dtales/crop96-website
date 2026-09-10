import { PageHero } from '../components/sections/PageHero'
import { Enquiry } from '../components/sections/Enquiry'
import { SectionHeading } from '../components/ui/SectionHeading'
import { Icon, type IconName } from '../components/ui/Icon'
import { CONTACT } from '../lib/site'

const ROUTES: { icon: IconName; title: string; copy: string; action: string; href: string }[] = [
  {
    icon: 'phone',
    title: 'Call us',
    copy: 'Fastest for pricing, availability and dispatch questions.',
    action: CONTACT.phone,
    href: CONTACT.phoneHref,
  },
  {
    icon: 'whatsapp',
    title: 'WhatsApp',
    copy: 'Send a requirement, a photo of a sample, or a purchase order.',
    action: 'Chat on WhatsApp',
    href: CONTACT.whatsappHref,
  },
  {
    icon: 'mail',
    title: 'Email',
    copy: 'Best for formal enquiries, tenders and export documentation.',
    action: CONTACT.email,
    href: CONTACT.emailHref,
  },
]

export default function Contact() {
  return (
    <>
      <PageHero
        documentTitle="Contact"
        eyebrow="Contact"
        title="Let’s talk crops."
        lead="Have a requirement, a crop to sell, or a partnership in mind? Reach us however suits you — we answer every enquiry."
        image="/img/page-contact.webp"
      />

      <section className="bg-white py-14 sm:py-16">
        <div className="container-96">
          <SectionHeading
            eyebrow="Reach Us"
            title="Three ways to get in touch"
            lead="Pick whichever is quickest for you. For a detailed requirement, the enquiry form below captures everything we need in one go."
          />
          <div className="mt-11 grid gap-5 sm:grid-cols-3">
            {ROUTES.map((r, i) => (
              <a
                key={r.title}
                href={r.href}
                target={r.href.startsWith('http') ? '_blank' : undefined}
                rel="noreferrer"
                data-reveal="up-lg"
                data-reveal-delay={i * 0.07}
                className="group rounded-card border border-ink-900/8 bg-sand-50 p-6 shadow-card transition-[box-shadow,transform] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-1.5 hover:shadow-card-hover"
              >
                <span
                  aria-hidden="true"
                  className="flex size-12 items-center justify-center rounded-full bg-brand-500 text-white transition-transform duration-500 group-hover:scale-110"
                >
                  <Icon name={r.icon} className="size-6" />
                </span>
                <h3 className="mt-4 text-[1.0625rem]">{r.title}</h3>
                <p className="mt-2 text-[0.875rem] leading-relaxed text-ink-500">{r.copy}</p>
                <span className="mt-4 inline-flex items-center gap-1.5 text-[0.875rem] font-bold text-brand-700">
                  {r.action}
                  <Icon
                    name="arrow"
                    className="size-3.5 transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-1"
                  />
                </span>
              </a>
            ))}
          </div>
        </div>
      </section>

      <Enquiry />
    </>
  )
}
