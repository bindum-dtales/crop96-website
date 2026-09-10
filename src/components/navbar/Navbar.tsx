import { useEffect, useRef, useState } from 'react'
import { NavLink } from 'react-router-dom'
import { NAV, CONTACT } from '../../lib/site'
import { Logo } from '../ui/Logo'
import { LineIcon } from '../ui/LineIcon'
import { gsap, useGSAP, prefersReducedMotion } from '../../lib/motion'

/** Desktop link: a hairline that grows from the left on hover and stays for the active route. */
const LINK =
  'relative block py-1.5 font-sans text-[0.9375rem] font-normal tracking-[0.005em] transition-colors duration-300 after:absolute after:-bottom-0.5 after:left-0 after:h-px after:w-full after:origin-left after:scale-x-0 after:bg-ink after:transition-transform after:duration-500 after:ease-[cubic-bezier(0.22,1,0.36,1)] hover:text-ink hover:after:scale-x-100'

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const root = useRef<HTMLElement>(null)
  const panel = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 32)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // The panel owns the page while it is open.
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  // Page-load entrance: the bar settles in ahead of the headline.
  useGSAP(
    () => {
      if (prefersReducedMotion()) return
      gsap
        .timeline({ defaults: { ease: 'power3.out' } })
        .from(root.current, { yPercent: -100, duration: 0.9 })
        .from('[data-nav-item]', { y: 14, opacity: 0, duration: 0.7, stagger: 0.06 }, 0.25)
    },
    { scope: root },
  )

  // Mobile panel choreography — links rise in sequence behind the overlay.
  useGSAP(
    () => {
      if (!open || prefersReducedMotion() || !panel.current) return
      gsap
        .timeline({ defaults: { ease: 'power3.out' } })
        .fromTo(panel.current, { opacity: 0 }, { opacity: 1, duration: 0.35 })
        .fromTo(
          panel.current.querySelectorAll('[data-panel-item]'),
          { y: 26, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.65, stagger: 0.07 },
          0.1,
        )
    },
    { dependencies: [open], scope: panel },
  )

  return (
    <header
      ref={root}
      className={`sticky top-0 z-50 w-full transition-[background-color,box-shadow,backdrop-filter] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
        scrolled
          ? 'bg-ivory/85 shadow-[0_1px_0_0_var(--color-rule-soft),0_18px_40px_-34px_rgb(43_40_37_/_0.7)] backdrop-blur-xl'
          : 'bg-transparent'
      }`}
    >
      <div
        className={`container-96 flex items-center justify-between gap-6 transition-[height] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
          scrolled ? 'h-[4.5rem]' : 'h-[5.25rem] lg:h-[5.75rem]'
        }`}
      >
        <span data-nav-item>
          <Logo className={scrolled ? 'h-9 sm:h-11' : 'h-11 sm:h-13'} />
        </span>

        <nav aria-label="Primary" className="hidden lg:block">
          <ul className="flex items-center gap-8 xl:gap-11">
            {NAV.map((item) => (
              <li key={item.to} data-nav-item>
                <NavLink
                  to={item.to}
                  end={item.to === '/'}
                  className={({ isActive }) =>
                    `${LINK} ${isActive ? 'text-ink after:scale-x-100' : 'text-ink-soft'}`
                  }
                >
                  {item.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-2" data-nav-item>
          <a
            href={CONTACT.emailHref}
            className="group/mail hidden items-center gap-2.5 rounded-full border border-rule bg-paper/60 py-2.5 pr-5 pl-4 font-sans text-[0.875rem] font-normal text-ink-soft backdrop-blur-sm transition-[border-color,color,box-shadow,transform] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-px hover:border-forest/35 hover:text-ink hover:shadow-[0_10px_24px_-18px_rgb(43_40_37_/_0.8)] md:inline-flex"
          >
            <LineIcon
              name="mail"
              strokeWidth={1.4}
              className="size-4.5 text-ink-faint transition-colors duration-500 group-hover/mail:text-forest"
            />
            {CONTACT.email}
          </a>

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="site-menu"
            aria-label={open ? 'Close menu' : 'Open menu'}
            className="-mr-2 rounded-full p-2.5 text-ink transition-colors duration-300 hover:bg-ink/5 lg:hidden"
          >
            <LineIcon name={open ? 'close' : 'menu'} className="size-6" strokeWidth={1.4} />
          </button>
        </div>
      </div>

      {/* Mobile: a full ivory sheet, composed for the phone rather than a squeezed bar. */}
      <div
        id="site-menu"
        ref={panel}
        hidden={!open}
        className="fixed inset-x-0 top-[4.5rem] bottom-0 z-40 overflow-y-auto bg-ivory/98 backdrop-blur-xl lg:hidden"
      >
        <nav
          aria-label="Primary (mobile)"
          className="container-96 flex min-h-full flex-col pt-8 pb-12"
          onClick={() => setOpen(false)}
        >
          <ul className="flex flex-col">
            {NAV.map((item, i) => (
              <li key={item.to} data-panel-item className="border-b border-rule-soft">
                <NavLink
                  to={item.to}
                  end={item.to === '/'}
                  className={({ isActive }) =>
                    `flex items-baseline gap-4 py-5 display text-[1.9rem] sm:text-[2.4rem] ${
                      isActive ? 'text-moss' : 'text-ink'
                    }`
                  }
                >
                  <span className="font-sans text-[0.7rem] font-medium tracking-[0.2em] text-terracotta/70">
                    0{i + 1}
                  </span>
                  {item.label}
                </NavLink>
              </li>
            ))}
          </ul>

          <a
            data-panel-item
            href={CONTACT.emailHref}
            className="mt-9 inline-flex items-center gap-3 self-start rounded-full border border-rule bg-paper px-6 py-4 text-[0.9375rem] text-ink"
          >
            <LineIcon name="mail" strokeWidth={1.4} className="size-5 text-forest" />
            {CONTACT.email}
          </a>
          <p data-panel-item className="script mt-10 text-[1.6rem] leading-tight">
            Real Farmers
            <br />
            Real Change
          </p>
        </nav>
      </div>
    </header>
  )
}
