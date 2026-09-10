import { useRef } from 'react'
import { CONTACT } from '../../lib/site'
import { Icon, type IconName } from '../ui/Icon'
import { Eyebrow } from '../ui/Eyebrow'
import { LineIcon } from '../ui/LineIcon'
import { EnquiryForm } from '../forms/EnquiryForm'
import { useGSAP, lineReveal, parallax, prefersReducedMotion } from '../../lib/motion'

const LINES: { icon: IconName; label: string; href: string }[] = [
  { icon: 'phone', label: CONTACT.phone, href: CONTACT.phoneHref },
  { icon: 'mail', label: CONTACT.email, href: CONTACT.emailHref },
  { icon: 'pin', label: CONTACT.address, href: '' },
  { icon: 'whatsapp', label: CONTACT.whatsapp, href: CONTACT.whatsappHref },
]

/**
 * The enquiry spread.
 *
 * The land is still behind it, but washed back until it is a ground rather
 * than a picture, so the form can sit straight on the page instead of inside
 * a white panel floating over a photograph. Ruled rows on the left, ruled
 * fields on the right: one hairline system across the whole spread.
 */
export function Enquiry() {
  const root = useRef<HTMLElement>(null)
  const media = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      const scope = root.current
      if (!scope) return
      lineReveal(scope, { trigger: scope })
      if (prefersReducedMotion()) return
      if (media.current) parallax(media.current, scope, 0.14)
    },
    { scope: root },
  )

  return (
    <section
      ref={root}
      id="contact"
      aria-labelledby="enquiry-title"
      className="relative isolate overflow-hidden"
    >
      <div ref={media} className="absolute inset-0 -z-10">
        <img
          src="/img/contact-fields.webp"
          alt=""
          width={1920}
          height={1200}
          loading="lazy"
          decoding="async"
          className="size-full scale-115 object-cover object-[56%_62%]"
        />
      </div>

      {/* Washed back to a ground. Kept a shade off flat ivory so the grain of
          the field still carries through under the type. */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 bg-[linear-gradient(to_bottom,var(--color-ivory),rgb(248_245_239/0.9)_18%,rgb(248_245_239/0.9)_82%,var(--color-ivory))]"
      />

      <div className="container-96 py-16 lg:py-24">
        <div className="grid gap-y-14 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1fr)] lg:gap-x-16 xl:gap-x-24">
          <div>
            <span data-reveal="up">
              <Eyebrow>Contact Us</Eyebrow>
            </span>

            <h2
              id="enquiry-title"
              className="display mt-5 text-[clamp(2.4rem,9.5vw,3.2rem)] sm:text-[clamp(2.8rem,6vw,3.8rem)] lg:mt-6 lg:text-[clamp(2.6rem,3.9vw,4rem)]"
            >
              <span data-mask className="line-mask">
                <span className="block">Let’s Talk</span>
              </span>
              <span data-mask className="line-mask">
                <span className="block text-moss">Crops.</span>
              </span>
            </h2>

            <p
              data-reveal="up"
              className="mt-6 max-w-[34ch] text-[1.0625rem] leading-[1.6] text-ink-soft"
            >
              Have a requirement or want to partner with us? We’d love to hear from you.
            </p>

            <ul className="mt-10 border-t border-rule lg:mt-16">
              {LINES.map((line, i) => (
                <li
                  key={line.label}
                  data-reveal="up"
                  data-reveal-delay={i * 0.06}
                  className="border-b border-rule"
                >
                  <Row href={line.href}>
                    <Icon
                      name={line.icon}
                      className="size-5 shrink-0 text-olive transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover/line:-translate-y-0.5"
                    />
                    <span className="text-[0.9375rem] text-ink">{line.label}</span>
                    {line.href && (
                      <LineIcon
                        name="arrow"
                        strokeWidth={1.4}
                        className="ml-auto size-4 shrink-0 text-ink-faint transition-[transform,color] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover/line:translate-x-1 group-hover/line:text-forest"
                      />
                    )}
                  </Row>
                </li>
              ))}
            </ul>
          </div>

          <div data-reveal="up" data-reveal-delay="0.1">
            <EnquiryForm />
          </div>
        </div>
      </div>
    </section>
  )
}

function Row({ href, children }: { href: string; children: React.ReactNode }) {
  const cls = 'group/line flex items-center gap-4 py-5'
  if (!href) return <span className={cls}>{children}</span>
  return (
    <a
      href={href}
      className={cls}
      target={href.startsWith('http') ? '_blank' : undefined}
      rel="noreferrer"
    >
      {children}
    </a>
  )
}
