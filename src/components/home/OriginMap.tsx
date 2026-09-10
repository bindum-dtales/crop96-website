import { useRef } from 'react'
import { ORIGIN_PROPS } from '../../lib/home'
import { Eyebrow } from '../ui/Eyebrow'
import { Pill } from '../ui/Pill'
import { LineIcon } from '../ui/LineIcon'
import { SouthIndiaMap } from '../ui/SouthIndiaMap'
import { useGSAP, lineReveal } from '../../lib/motion'

/**
 * Section 03 — where the produce comes from.
 *
 * The map is a single positioned frame: land, names, produce and captions all
 * placed in percentages of it, so the constellation holds together from a
 * phone to a wide desktop. Below `lg` the pinned layout would collapse into
 * illegibility, so the origins become a plain card list under the map instead.
 */
export function OriginMap() {
  const root = useRef<HTMLElement>(null)

  useGSAP(
    () => {
      const scope = root.current
      if (!scope) return
      // The map owns its own entrance; this section only reveals the copy.
      lineReveal(scope, { trigger: scope, stagger: 0.095 })
    },
    { scope: root },
  )

  return (
    <section ref={root} aria-labelledby="origin-title" className="relative isolate mt-24 xl:mt-36">
      <div className="container-96 grid items-center gap-14 xl:grid-cols-[minmax(0,0.86fr)_minmax(0,1.32fr)] xl:gap-x-10 xl:gap-x-16">
        {/* ── The claim ────────────────────────────────────────── */}
        <div className="xl:pb-10">
          <span data-reveal="up">
            <Eyebrow index="02">The Crop 96 Way</Eyebrow>
          </span>

          <h2
            id="origin-title"
            className="display mt-5 text-[clamp(2.6rem,9.5vw,3.5rem)] sm:text-[clamp(3.1rem,6.6vw,4.2rem)] xl:mt-7 xl:text-[clamp(2.9rem,4.4vw,4.4rem)]"
          >
            <span data-mask className="line-mask">
              <span className="block">Good produce</span>
            </span>
            <span data-mask className="line-mask">
              <span className="block">begins with</span>
            </span>
            <span data-mask className="line-mask">
              <span className="block">knowing</span>
            </span>
            <span data-mask className="line-mask">
              <span className="block text-moss">where to look.</span>
            </span>
          </h2>

          <p
            data-reveal="up"
            className="mt-7 max-w-[40ch] text-[1.0625rem] leading-[1.75] text-ink-soft"
          >
            We source from India’s finest agricultural regions — because the best produce always has
            an origin.
          </p>

          <div data-reveal="up" className="mt-8">
            <Pill to="/products" arrow>
              Explore Our Produce
            </Pill>
          </div>

          <ul className="mt-12 grid grid-cols-2 gap-y-9 sm:grid-cols-4 xl:mt-14">
            {ORIGIN_PROPS.map((prop, i) => (
              <li
                key={prop.title}
                data-reveal="up"
                data-reveal-delay={i * 0.06}
                className={`px-3 sm:px-4 ${i > 0 ? 'sm:border-l sm:border-rule-soft' : ''} ${
                  i === 2 ? 'border-l-0' : ''
                } ${i === 0 ? 'sm:pl-0' : ''}`}
              >
                <LineIcon
                  name={prop.icon}
                  strokeWidth={1.4}
                  className={`size-7 ${prop.tone === 'sage' ? 'text-olive' : 'text-clay'}`}
                />
                <h3 className="mt-3 font-sans text-[0.6875rem] font-semibold tracking-[0.14em] text-ink uppercase">
                  {prop.title}
                </h3>
                <p className="mt-1.5 max-w-[16ch] text-[0.75rem] leading-[1.45] text-ink-soft">
                  {prop.copy}
                </p>
              </li>
            ))}
          </ul>
        </div>

        {/* ── The land ───────────────────────────────────────────
            Crop images, captions, hairlines and the compass are held back
            until the map itself is right; the section is deliberately just
            the geography for now. */}
        <div className="relative xl:pl-6">
          <SouthIndiaMap className="mx-auto max-w-[26rem] sm:max-w-[32rem] xl:max-w-none" />
        </div>
      </div>
    </section>
  )
}
