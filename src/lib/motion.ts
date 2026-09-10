import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'

gsap.registerPlugin(ScrollTrigger, useGSAP)

/**
 * Crop 96 motion language.
 *
 * One curve, one duration scale, transform + opacity only. Everything
 * cinematic on this page is built from four primitives — a line mask, a
 * clip wipe, a batched reveal and a scrubbed drift — so sections that were
 * drawn separately read as a single art-directed sequence.
 */
export const EASE = 'power3.out'
export const EASE_CSS = 'cubic-bezier(0.22, 1, 0.36, 1)'
export const REVEAL_DURATION = 0.9

export const prefersReducedMotion = () =>
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches

/** Distances for each reveal flavour, keyed by the `data-reveal` value. */
const FROM: Record<string, gsap.TweenVars> = {
  '': { y: 26 },
  up: { y: 26 },
  'up-lg': { y: 46 },
  left: { x: -34 },
  right: { x: 34 },
  fade: {},
  scale: { scale: 0.94, y: 18 },
  /** Badges and medallions settle out of a slight overshoot. */
  pop: { scale: 0.82 },
}

/**
 * Reveals every `[data-reveal]` inside `scope` as it scrolls in, batching
 * neighbours so a row staggers instead of firing all at once.
 * `data-reveal-delay` (seconds) offsets an individual element.
 */
export function scrollReveal(scope: Element) {
  const targets = gsap.utils.toArray<HTMLElement>(scope.querySelectorAll('[data-reveal]'))
  if (!targets.length) return

  if (prefersReducedMotion()) {
    gsap.set(targets, { opacity: 1, clearProps: 'transform' })
    return
  }

  targets.forEach((el) => {
    gsap.set(el, { opacity: 0, ...(FROM[el.dataset.reveal ?? ''] ?? FROM.up) })
  })

  ScrollTrigger.batch(targets, {
    start: 'top 88%',
    once: true,
    onEnter: (batch) =>
      gsap.to(batch, {
        opacity: 1,
        x: 0,
        y: 0,
        scale: 1,
        duration: REVEAL_DURATION,
        ease: EASE,
        stagger: 0.09,
        overwrite: true,
        delay: (_i: number, el: Element) => Number((el as HTMLElement).dataset.revealDelay ?? 0),
      }),
  })
}

/**
 * Line-by-line headline reveal. Each `[data-mask]` is a clipped row whose
 * single child slides up from beneath its own baseline — the editorial
 * "type rises off the page" move, and cheap: one transform per line.
 */
export function lineReveal(
  scope: Element,
  { delay = 0, stagger = 0.1, trigger }: { delay?: number; stagger?: number; trigger?: Element } = {},
) {
  const lines = gsap.utils.toArray<HTMLElement>(scope.querySelectorAll('[data-mask] > *'))
  if (!lines.length) return

  if (prefersReducedMotion()) {
    gsap.set(lines, { y: 0 })
    return
  }

  // A single `fromTo` rather than a `set` plus a `to`: a context revert
  // (React StrictMode remounts every effect once) restores the two in an
  // order that can leave the lines parked below their masks, whereas a
  // `fromTo` re-seeds itself every time the effect runs.
  gsap.fromTo(
    lines,
    { yPercent: 105 },
    {
      yPercent: 0,
      duration: 1.05,
      ease: EASE,
      stagger,
      delay,
      ...(trigger ? { scrollTrigger: { trigger, start: 'top 78%', once: true } } : {}),
    },
  )
}

/**
 * Media reveal: the frame un-clips from the bottom edge while the picture
 * inside eases out of a slight overscale, so the image looks like it settles
 * into its frame rather than fading in.
 */
export function mediaReveal(
  frame: HTMLElement,
  { delay = 0, scroll = true }: { delay?: number; scroll?: boolean } = {},
) {
  const inner = frame.querySelector<HTMLElement>('[data-wipe-inner]') ?? frame

  if (prefersReducedMotion()) {
    gsap.set(frame, { clipPath: 'none' })
    gsap.set(inner, { scale: 1 })
    return
  }

  const tl = gsap.timeline({
    delay,
    ...(scroll ? { scrollTrigger: { trigger: frame, start: 'top 82%', once: true } } : {}),
  })
  tl.fromTo(
    frame,
    { clipPath: 'inset(0 0 100% 0)' },
    { clipPath: 'inset(0 0 0% 0)', duration: 1.25, ease: 'power3.inOut' },
  ).fromTo(inner, { scale: 1.18 }, { scale: 1, duration: 1.6, ease: EASE }, 0)
}

/**
 * Very small vertical drift on a layer that already overflows its frame, so
 * the movement never exposes an edge. `strength` is a fraction of the
 * trigger's height, keeping it proportional across breakpoints.
 */
export function parallax(layer: Element, trigger: Element, strength = 0.12) {
  if (prefersReducedMotion()) return
  gsap.fromTo(
    layer,
    { yPercent: -strength * 50 },
    {
      yPercent: strength * 50,
      ease: 'none',
      scrollTrigger: { trigger, start: 'top bottom', end: 'bottom top', scrub: true },
    },
  )
}

/**
 * Scrubbed overscale, meant to run on a layer *inside* the one `parallax`
 * drifts. The picture eases out of a slight enlargement across the whole
 * pass, so the frame reads as depth rather than as a cut-out sliding by.
 * Kept under a tenth of a scale step — anything more reads as a zoom.
 */
export function slowZoom(layer: Element, trigger: Element, from = 1.075, to = 1) {
  if (prefersReducedMotion()) return
  gsap.fromTo(
    layer,
    { scale: from },
    {
      scale: to,
      ease: 'none',
      scrollTrigger: { trigger, start: 'top bottom', end: 'bottom top', scrub: true },
    },
  )
}

/** Horizontal counterpart, for the decorative leaves and marginalia. */
export function drift(layer: Element, trigger: Element, { x = 0, y = 0, rotate = 0 } = {}) {
  if (prefersReducedMotion()) return
  gsap.fromTo(
    layer,
    { xPercent: -x, yPercent: -y, rotate: -rotate },
    {
      xPercent: x,
      yPercent: y,
      rotate,
      ease: 'none',
      scrollTrigger: { trigger, start: 'top bottom', end: 'bottom top', scrub: 1 },
    },
  )
}

/**
 * Counts a numeral up to its final value on entry. Reads the target from the
 * element's text so the markup stays the source of truth (and stays correct
 * with JS off).
 */
export function countUp(el: HTMLElement) {
  const to = Number(el.dataset.count ?? el.textContent ?? 0)
  if (!Number.isFinite(to) || prefersReducedMotion()) return

  const obj = { v: 0 }
  gsap.to(obj, {
    v: to,
    duration: 1.6,
    ease: 'power2.out',
    scrollTrigger: { trigger: el, start: 'top 88%', once: true },
    onUpdate: () => {
      el.textContent = String(Math.round(obj.v))
    },
  })
}

/** Grows a hairline or connector from its origin as it scrolls into view. */
export function drawLine(el: Element, axis: 'x' | 'y' = 'x', delay = 0) {
  if (prefersReducedMotion()) return
  gsap.fromTo(
    el,
    { [axis === 'x' ? 'scaleX' : 'scaleY']: 0 },
    {
      [axis === 'x' ? 'scaleX' : 'scaleY']: 1,
      duration: 0.9,
      ease: 'power2.inOut',
      delay,
      scrollTrigger: { trigger: el, start: 'top 92%', once: true },
    },
  )
}

export { gsap, ScrollTrigger, useGSAP }
