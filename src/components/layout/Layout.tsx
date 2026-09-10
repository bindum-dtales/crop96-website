import { useEffect, useRef } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import { Navbar } from '../navbar/Navbar'
import { Footer } from '../footer/Footer'
import { useSmoothScroll } from '../../lib/useSmoothScroll'
import { scrollReveal, ScrollTrigger, gsap, prefersReducedMotion } from '../../lib/motion'

export function Layout() {
  const main = useRef<HTMLElement>(null)
  const { pathname, hash } = useLocation()
  useSmoothScroll()

  // Flag the document so CSS only pre-hides reveal targets when we will animate.
  useEffect(() => {
    const on = !prefersReducedMotion()
    document.documentElement.dataset.motion = on ? 'on' : 'off'
  }, [])

  // One reveal pass per route. gsap.context keeps every trigger scoped so the
  // next route's cleanup kills them all — no leaks, no stale triggers.
  useEffect(() => {
    if (!main.current) return
    const el = main.current
    const ctx = gsap.context(() => scrollReveal(el), el)
    // Images finishing late change the page height; recalc once settled.
    const id = window.setTimeout(() => ScrollTrigger.refresh(), 320)
    return () => {
      window.clearTimeout(id)
      ctx.revert()
    }
  }, [pathname])

  // Route changes start at the top; in-page hashes scroll to their target.
  useEffect(() => {
    const smooth = !prefersReducedMotion()

    const go = () => {
      const target = hash ? document.querySelector<HTMLElement>(hash) : null
      if (!target) {
        window.scrollTo({ top: 0, behavior: 'instant' })
        return
      }
      // Lenis owns the scroll position when it is running; going around it
      // leaves its internal position stale and the next wheel event jumps.
      if (window.__lenis) {
        // Straight after a route change Lenis has not measured the new page
        // yet, so its scroll limit is still 0 and it clamps the target to the
        // top. Re-measure first. Lenis honours scroll-margin-top on its own.
        window.__lenis.resize()
        window.__lenis.scrollTo(target)
      } else {
        target.scrollIntoView({ behavior: smooth ? 'smooth' : 'auto', block: 'start' })
      }
    }

    go()
    // Lazily-loaded images resolve after mount and push the target down the
    // page, so land on it a second time once the layout has settled.
    const id = window.setTimeout(go, 450)
    return () => window.clearTimeout(id)
  }, [pathname, hash])

  return (
    <div className="flex min-h-dvh flex-col">
      <a
        href="#main"
        className="sr-only rounded-lg bg-brand-600 px-4 py-2 font-bold text-white focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-100"
      >
        Skip to content
      </a>
      <Navbar />
      <main id="main" ref={main} className="grow">
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}
