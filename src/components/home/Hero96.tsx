import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { LineIcon } from '../ui/LineIcon'
import { gsap, useGSAP, ScrollTrigger, lineReveal, prefersReducedMotion } from '../../lib/motion'

import h1 from '../../assets/h1.png'
import h2 from '../../assets/h2.png'
import h3 from '../../assets/h3.png'
import h4 from '../../assets/h4.png'
import h5 from '../../assets/h5.png'

/**
 * h1 → h5, then back to h1. One frame is on screen at a time.
 *
 * The artwork ships as-is: the originals are served untouched, at their
 * native 4000 × 2250, with no derivative encode in between. `object-cover`
 * scales them proportionally and crops the overflow — it never stretches —
 * and every frame is already 16:9, so on a landscape viewport there is
 * nothing to crop at all.
 */
const NATIVE = { width: 4000, height: 2250 }
const FRAMES = [h1, h2, h3, h4, h5]

/** Seconds a frame owns the screen, and the cross-fade that hands it over. */
const HOLD = 5.6
const FADE = 1.8

/** Ken Burns: the live frame creeps between two overscales while it is up. */
const KB_FROM = { scale: 1.055, xPercent: 1.3, yPercent: 0.9 }
const KB_TO = { scale: 1.16, xPercent: -1.3, yPercent: -0.9 }

/** Alternating drift so consecutive frames never travel the same way. */
const kb = (i: number, k: typeof KB_FROM) => {
  const dir = i % 2 ? -1 : 1
  return { scale: k.scale, xPercent: k.xPercent * dir, yPercent: k.yPercent * dir }
}

const IVORY = '248 245 239'

/**
 * The ivory veil. Its stops sit on an ellipse whose centre is off-canvas to
 * the left, so the edge between the page ground and the photograph bows
 * outward at mid-height instead of falling as a straight column — the same
 * organic edge the rest of the site draws with `curve-l`.
 *
 * It never reaches full opacity: the photograph reads through the copy
 * column at ~15%, and the right 40% of the frame is left untouched. The
 * plateau holds at 0.82 across the measure because that is what keeps the
 * 15px lead above 4.5:1 on the two frames whose left side is dark soil.
 */
const WASH_WIDE = `radial-gradient(72% 108% at -8% 50%,
  rgb(${IVORY} / 0.88) 0%,
  rgb(${IVORY} / 0.82) 58%,
  rgb(${IVORY} / 0.62) 70%,
  rgb(${IVORY} / 0.28) 82%,
  rgb(${IVORY} / 0.06) 92%,
  rgb(${IVORY} / 0) 100%)`

/** Portrait recomposition: the photograph keeps the top, the copy the foot. */
const WASH_NARROW = `linear-gradient(to top,
  rgb(${IVORY} / 0.95) 0%,
  rgb(${IVORY} / 0.93) 40%,
  rgb(${IVORY} / 0.86) 58%,
  rgb(${IVORY} / 0.55) 70%,
  rgb(${IVORY} / 0.18) 82%,
  rgb(${IVORY} / 0) 94%)`

/** Keeps the navbar legible whichever frame is up — some are dark at the top. */
const WASH_TOP = `linear-gradient(to bottom,
  rgb(${IVORY} / 0.7) 0%,
  rgb(${IVORY} / 0.34) 34%,
  rgb(${IVORY} / 0) 82%)`

/** A breath of shade under the marginalia and the seal, for the bright frames. */
const WASH_CORNER = `radial-gradient(58% 46% at 100% 96%, rgb(30 26 22 / 0.34), transparent 72%)`

/**
 * The opening spread: one full-screen photograph that turns over every few
 * seconds behind an editorial masthead. Everything below `lg` recomposes —
 * the picture takes the top of the screen and the copy the foot — rather than
 * squeezing the desktop composition into a phone.
 */
export function Hero96() {
  const root = useRef<HTMLElement>(null)

  useGSAP(
    () => {
      const el = root.current
      if (!el) return

      const stack = gsap.utils.toArray<HTMLImageElement>('[data-frame]')
      const n = stack.length

      // Frame 0 is up from the first paint; the rest wait their turn.
      const p = FADE / (HOLD + FADE)
      const lerp = (a: number, b: number) => a + (b - a) * p
      const mid = {
        scale: lerp(KB_FROM.scale, KB_TO.scale),
        xPercent: lerp(KB_FROM.xPercent, KB_TO.xPercent),
        yPercent: lerp(KB_FROM.yPercent, KB_TO.yPercent),
      }
      gsap.set(stack, { autoAlpha: 0 })
      gsap.set(stack[0], { autoAlpha: 1, ...mid })

      lineReveal(el, { delay: 0.5, stagger: 0.085 })
      if (prefersReducedMotion()) return

      /* ── Entrance ───────────────────────────────────────────── */
      gsap
        .timeline({ defaults: { ease: 'power3.out' } })
        .fromTo(
          '[data-hero="stage"]',
          { autoAlpha: 0, scale: 1.06 },
          { autoAlpha: 1, scale: 1, duration: 1.9, ease: 'power2.out' },
          0,
        )
        .fromTo('[data-hero="wash"]', { autoAlpha: 0 }, { autoAlpha: 1, duration: 1.5 }, 0.15)
        .fromTo(
          '[data-hero="eyebrow"]',
          { y: 16, autoAlpha: 0 },
          { y: 0, autoAlpha: 1, duration: 0.8 },
          0.3,
        )
        .fromTo(
          '[data-hero="lead"]',
          { y: 22, autoAlpha: 0 },
          { y: 0, autoAlpha: 1, duration: 0.9 },
          1.15,
        )
        .fromTo(
          '[data-hero="cta"]',
          { y: 18, autoAlpha: 0 },
          { y: 0, autoAlpha: 1, duration: 0.8, stagger: 0.11 },
          1.3,
        )
        .fromTo(
          '[data-hero="mark"]',
          { y: 14, autoAlpha: 0 },
          { y: 0, autoAlpha: 1, duration: 1, stagger: 0.13 },
          1.45,
        )
        .fromTo(
          '[data-hero="seal"]',
          { scale: 0.72, autoAlpha: 0 },
          { scale: 1, autoAlpha: 1, duration: 1.1, ease: 'back.out(1.5)' },
          1.6,
        )
        .fromTo(
          '[data-hero="scroll"]',
          { y: 12, autoAlpha: 0 },
          { y: 0, autoAlpha: 1, duration: 0.8 },
          1.85,
        )

      // The scroll cue keeps a slow pulse so it reads as an invitation.
      gsap.to('[data-hero="scroll-dot"]', {
        y: 5,
        repeat: -1,
        yoyo: true,
        duration: 1.15,
        ease: 'sine.inOut',
      })

      /* ── The rotation ───────────────────────────────────────── */
      const cycle = n * HOLD
      const rotate = gsap.timeline({ repeat: -1, paused: true, defaults: { ease: 'none' } })

      for (let i = 0; i < n; i++) {
        // A frame takes over `FADE` before its slot opens, so every frame gets
        // the same time at full strength. Frame 0's hand-over is the one that
        // lands on the loop seam, which is why it sits at the end.
        const at = i === 0 ? cycle - FADE : i * HOLD - FADE

        rotate
          .to(stack[(i + n - 1) % n], { autoAlpha: 0, duration: FADE, ease: 'power1.inOut' }, at)
          .to(stack[i], { autoAlpha: 1, duration: FADE, ease: 'power1.inOut' }, at)

        if (i > 0) {
          rotate.fromTo(stack[i], kb(i, KB_FROM), { ...kb(i, KB_TO), duration: HOLD + FADE }, at)
        } else {
          // Frame 0 is already on screen at t=0, so its move is split across
          // the seam: the tail plays from the top of the cycle, the head plays
          // at the end as it fades back in. `mid` is where the two meet, which
          // is what keeps the zoom continuous through the loop.
          rotate
            .fromTo(stack[0], mid, { ...kb(0, KB_TO), duration: HOLD }, 0)
            .fromTo(stack[0], kb(0, KB_FROM), { ...mid, duration: FADE }, at)
        }
      }

      // Nothing turns over until every frame has decoded — a half-decoded
      // cross-fade is the flicker — and nothing turns over off-screen either.
      let alive = true
      let armed = false
      let inView = true
      const sync = () => {
        if (alive && armed && inView) rotate.play()
        else rotate.pause()
      }

      ScrollTrigger.create({
        trigger: el,
        start: 'top bottom',
        end: 'bottom top',
        onToggle: (self) => {
          inView = self.isActive
          sync()
        },
      })

      // Every frame is preloaded before the first hand-over, so no cross-fade
      // ever paints a half-arrived picture. `decode()` is the signal we want —
      // it means the bitmap is ready to paint, not merely downloaded — but on
      // artwork this size it is slow, and on some builds it never settles at
      // all. So it is raced against the plain load event, with a backstop
      // behind both: the rotation always starts, it just prefers to start warm.
      const loaded = (img: HTMLImageElement) =>
        new Promise<void>((res) => {
          if (img.complete) return res()
          img.addEventListener('load', () => res(), { once: true })
          img.addEventListener('error', () => res(), { once: true })
        })

      const preloaded = Promise.all(
        stack.map((img) => Promise.race([img.decode().catch(() => undefined), loaded(img)])),
      )

      let backstop = 0
      Promise.race([
        preloaded,
        new Promise<void>((res) => {
          backstop = window.setTimeout(res, 6000)
        }),
      ]).then(() => {
        window.clearTimeout(backstop)
        armed = true
        sync()
      })

      return () => {
        alive = false
        window.clearTimeout(backstop)
      }
    },
    { scope: root },
  )

  return (
    <section
      ref={root}
      aria-labelledby="hero-title"
      /* Pulled up under the sticky navbar so the photograph reaches the very
         top of the screen, exactly as the art direction has it. */
      className="relative isolate -mt-[5.25rem] flex min-h-svh flex-col overflow-hidden lg:-mt-[5.75rem]"
    >
      {/* ── The photograph: six frames, one visible at a time ─── */}
      <div data-hero="stage" className="absolute inset-0">
        {FRAMES.map((src, i) => (
          <img
            key={src}
            data-frame
            src={src}
            alt=""
            aria-hidden="true"
            width={NATIVE.width}
            height={NATIVE.height}
            decoding="async"
            fetchPriority={i === 0 ? 'high' : 'low'}
            className="absolute inset-0 size-full object-cover object-[55%_42%] will-change-transform lg:object-[58%_46%]"
          />
        ))}
      </div>

      {/* ── The ivory ground the copy sits on ──────────────────── */}
      <div data-hero="wash" aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 lg:hidden" style={{ backgroundImage: WASH_NARROW }} />
        <div className="absolute inset-0 hidden lg:block" style={{ backgroundImage: WASH_WIDE }} />
        <div className="absolute inset-x-0 top-0 h-[22vh]" style={{ backgroundImage: WASH_TOP }} />
        <div className="absolute inset-0 hidden lg:block" style={{ backgroundImage: WASH_CORNER }} />
      </div>

      {/* ── The masthead ───────────────────────────────────────── */}
      <div className="container-96 relative flex grow flex-col justify-end pt-[6.5rem] pb-14 sm:pb-16 lg:justify-center lg:pt-[6.75rem] lg:pb-[9vh]">
        <div className="max-w-[33rem] lg:max-w-[40rem]">
          <p
            data-hero="eyebrow"
            className="font-sans text-[0.6875rem] font-medium tracking-[0.19em] text-ink/85 uppercase sm:text-[0.8125rem] sm:tracking-[0.155em]"
          >
            From the source. For a brighter tomorrow.
          </p>

          <h1
            id="hero-title"
            className="display mt-4 text-[clamp(2.35rem,8.4vw,4.25rem)] leading-[0.96] lg:mt-4 lg:text-[clamp(3rem,min(5.9vw,11vh),6rem)]"
          >
            <span data-mask className="line-mask">
              <span className="block text-moss">Today,</span>
            </span>
            <span data-mask className="line-mask">
              <span className="block">we ate at the</span>
            </span>
            <span data-mask className="line-mask">
              <span className="block">right time.</span>
            </span>
          </h1>

          {/* Sans, not the display serif — the mock breaks voice here on
              purpose, and it is what stops the stack reading as four
              headlines. The rose is a shade off the mock's #bd8a7c so 24px+
              type clears 3:1 on ivory. */}
          <p
            data-mask
            className="line-mask mt-4 font-sans text-[clamp(1.15rem,5vw,1.5rem)] leading-[1.16] font-medium tracking-[-0.005em] text-[#b3796a] lg:mt-4 lg:text-[clamp(1.4rem,2.05vw,2.15rem)]"
          >
            <span className="block">Thanks to the farmers.</span>
          </p>

          <p
            data-hero="lead"
            className="mt-5 max-w-[28rem] text-[0.9375rem] leading-[1.62] text-ink-soft lg:mt-6 lg:max-w-[29.5rem]"
          >
            At Crop 96, we source the finest produce directly from India’s richest agricultural
            regions — ensuring better value for farmers and better food for a healthier tomorrow.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-3 sm:gap-4 lg:mt-7">
            <Link
              data-hero="cta"
              to="/products"
              className="group/cta inline-flex h-[3.125rem] items-center gap-3 rounded-full bg-forest pr-7 pl-8 font-sans text-[0.9375rem] font-medium text-ivory shadow-[0_14px_30px_-18px_rgb(43_40_37/0.9)] transition-[background-color,transform,box-shadow] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-px hover:bg-[#2d3d1d] hover:shadow-[0_20px_38px_-18px_rgb(43_40_37/0.95)]"
            >
              Explore Our Produce
              <LineIcon
                name="arrow"
                strokeWidth={1.5}
                className="size-4.5 transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover/cta:translate-x-1"
              />
            </Link>

            <Link
              data-hero="cta"
              to="/about"
              className="group/cta inline-flex h-[3.125rem] items-center gap-3 rounded-full border border-ink/18 bg-paper/55 pr-2.5 pl-7 font-sans text-[0.9375rem] font-medium text-ink backdrop-blur-sm transition-[border-color,background-color,transform] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-px hover:border-forest/45 hover:bg-paper/85"
            >
              Our Story
              <span className="grid size-8 place-items-center rounded-full border border-ink/22 transition-colors duration-500 group-hover/cta:border-forest/50 group-hover/cta:bg-forest group-hover/cta:text-ivory">
                <svg viewBox="0 0 12 12" aria-hidden="true" className="size-2.5 fill-current">
                  <path d="M3.3 1.7 9.7 6l-6.4 4.3Z" />
                </svg>
              </span>
            </Link>
          </div>
        </div>
      </div>

      {/* ── Marginalia, set into the bright of the photograph ─── */}
      <p
        aria-hidden="true"
        className="script pointer-events-none absolute top-[15%] right-[3.2vw] hidden text-right text-[clamp(1.35rem,1.85vw,1.9rem)] leading-[1.22] text-ivory [text-shadow:0_1px_16px_rgb(30_26_22/0.55)] lg:block"
      >
        <span data-hero="mark" className="block">
          
        </span>
        <span data-hero="mark" className="block pr-3">
          
        </span>
        <span data-hero="mark" className="block pr-1">
          
        </span>
        <span data-hero="mark" className="block">
          
        </span>
        <span data-hero="mark" className="mt-3 ml-auto block h-px w-14 bg-ivory/55" />
      </p>

      {/* ── The seal ───────────────────────────────────────────── */}
      <div
        data-hero="seal"
        aria-hidden="true"
        className="pointer-events-none absolute top-[57%] right-[3.2vw] hidden size-[6.75rem] place-items-center rounded-full border border-ivory/45 text-center font-sans text-ivory [text-shadow:0_1px_12px_rgb(30_26_22/0.6)] lg:grid xl:size-[7.25rem]"
      >
        <span className="leading-[1.45]">
          <span className="block text-[0.5rem] tracking-[0.16em] uppercase opacity-85">From</span>
          <span className="block text-[0.6875rem] font-medium tracking-[0.1em] uppercase">
            India’s
          </span>
          <span className="block text-[0.6875rem] font-medium tracking-[0.06em] uppercase">
            Farmlands
          </span>
          <span className="block text-[0.5rem] tracking-[0.13em] uppercase opacity-85">
            To a healthier
          </span>
          <span className="block text-[0.5rem] tracking-[0.16em] uppercase opacity-85">World</span>
          <LineIcon name="leaf" strokeWidth={1.3} className="mx-auto mt-1 size-3.5 opacity-90" />
        </span>
      </div>

      {/* ── Scroll cue ─────────────────────────────────────────── */}
      <div
        data-hero="scroll"
        aria-hidden="true"
        className="pointer-events-none absolute right-[3.2vw] bottom-0 hidden flex-col items-center gap-2.5 text-ivory [text-shadow:0_1px_12px_rgb(30_26_22/0.6)] lg:flex"
      >
        <span className="font-sans text-[0.6875rem] tracking-[0.14em]">Scroll</span>
        <span data-hero="scroll-dot" className="block">
          <LineIcon name="mouse" strokeWidth={1.3} className="size-5" />
        </span>
        <span className="h-14 w-px bg-ivory/45" />
      </div>
    </section>
  )
}
