import { Link } from 'react-router-dom'
import { NAV, CONTACT } from '../../lib/site'
import { Logo } from '../ui/Logo'
import { Icon } from '../ui/Icon'

export function Footer() {
  return (
    <footer className="bg-[#26361a] text-[#dbe3cf]">
      <div className="container-96 grid gap-9 py-10 lg:grid-cols-[minmax(0,2.4fr)_auto_auto_auto] lg:items-center lg:gap-8">
        <div>
          <Logo variant="light" />
          <p className="mt-4 max-w-[26rem] text-[0.875rem] leading-relaxed text-[#dbe3cf]/75">
            Connecting farmers, quality agricultural produce and markets through direct sourcing and
            reliable supply.
          </p>
        </div>

        <nav aria-label="Footer" className="lg:border-l lg:border-white/10 lg:pl-8">
          <ul className="flex flex-wrap gap-x-7 gap-y-2.5">
            {NAV.map((item) => (
              <li key={item.to}>
                <Link
                  to={item.to}
                  className="text-[0.875rem] font-semibold text-[#dbe3cf]/90 transition-colors hover:text-white"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <ul className="flex gap-3 lg:border-l lg:border-white/10 lg:pl-8">
          <li>
            <Social href={CONTACT.linkedinHref} icon="linkedin" label="Crop 96 on LinkedIn" />
          </li>
          <li>
            <Social href={CONTACT.whatsappHref} icon="whatsapp" label="Crop 96 on WhatsApp" />
          </li>
        </ul>

        <div className="space-y-2 text-[0.8125rem] text-[#dbe3cf]/75 lg:border-l lg:border-white/10 lg:pl-8">
          <p className="flex items-start gap-2">
            <Icon name="copyright" className="mt-px size-4 shrink-0" />
            <span>
              {new Date().getFullYear()} Crop 96 Agri Exim Pvt. Ltd.
              <br />
              All Rights Reserved.
            </span>
          </p>
          <p className="flex items-center gap-2">
            <Icon name="pin" className="size-4 shrink-0" />
            {CONTACT.address}
          </p>
        </div>
      </div>
    </footer>
  )
}

function Social({ href, icon, label }: { href: string; icon: 'linkedin' | 'whatsapp'; label: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      aria-label={label}
      className="flex size-10 items-center justify-center rounded-full bg-white/10 text-white transition-[background-color,transform] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-0.5 hover:bg-moss"
    >
      <Icon name={icon} className="size-5" />
    </a>
  )
}
