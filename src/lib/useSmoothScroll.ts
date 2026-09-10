import { useEffect } from 'react'
import Lenis from 'lenis'
import { gsap, ScrollTrigger, prefersReducedMotion } from './motion'

/**
 * Lenis driven by GSAP's ticker so ScrollTrigger and smooth scroll share one
 * rAF loop — the usual source of scroll jitter is running two.
 * Returns nothing; the instance is exposed on `window.__lenis` for anchor jumps.
 */
export function useSmoothScroll() {
  useEffect(() => {
    // Native scrolling is the accessible choice when motion is unwelcome, and
    // touch devices already have momentum scrolling that feels better than ours.
    if (prefersReducedMotion() || window.matchMedia('(pointer: coarse)').matches) return

    const lenis = new Lenis({
      duration: 1.05,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      touchMultiplier: 1.4,
    })

    lenis.on('scroll', ScrollTrigger.update)
    const raf = (time: number) => lenis.raf(time * 1000)
    gsap.ticker.add(raf)
    gsap.ticker.lagSmoothing(0)
    window.__lenis = lenis

    return () => {
      gsap.ticker.remove(raf)
      gsap.ticker.lagSmoothing(500, 33)
      lenis.destroy()
      delete window.__lenis
    }
  }, [])
}

declare global {
  interface Window {
    __lenis?: Lenis
  }
}
