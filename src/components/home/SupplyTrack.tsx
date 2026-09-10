import { LineIcon, type LineIconName } from '../ui/LineIcon'

type Node = { label: string; icon: LineIconName }

type Props = {
  title: string
  sub: string
  nodes: Node[]
  /** The route's verdict, one entry per line; the middle line carries it. */
  verdict: string[]
  tone: 'clay' | 'moss'
  /**
   * Share of the measure the rail spans from `lg` up, as a fraction. The Crop
   * 96 route is set to 4/7 so its four stations keep the traditional route's
   * pitch exactly — the difference between the two then reads as distance
   * travelled rather than as looser spacing.
   */
  span?: number
  /** Index of the station drawn as the Crop 96 hub rather than a plain stop. */
  hubAt?: number
  /** The hub's third line — the disciplines it stands for. */
  hubCaption?: string
}

/**
 * Distance from the top of a station to the centre of its marker, once the
 * icon (`h-10`) and the marker's own row (`h-3`) are stacked. The rail is
 * pinned to it, so the line passes dead through every marker without any
 * element having to measure another.
 */
const RAIL_Y = '2.875rem'

/**
 * The traditional route's caption and verdict are set at 11px, and flat
 * `clay` only reaches 4.3:1 on ivory at that size — so they take a clay
 * carried a little way toward ink, which clears AA without leaving the
 * palette. The olive half already passes on its own.
 */
const DEEP_CLAY = 'text-[color-mix(in_srgb,var(--color-clay)_76%,var(--color-ink))]'

const TONES = {
  clay: {
    title: DEEP_CLAY,
    rail: 'bg-ink/18',
    dot: 'bg-clay/85',
    icon: 'text-ink/60',
    verdict: DEEP_CLAY,
  },
  moss: {
    title: 'text-moss',
    rail: 'bg-olive/50',
    dot: 'bg-olive',
    icon: 'text-olive',
    verdict: 'text-olive',
  },
} as const

/**
 * One route to market, drawn as a measured line rather than a card.
 *
 * Both routes hang off the same left origin and share one station pitch, so
 * the only thing that differs between them is how far the line has to run —
 * which is the argument the section is making. From `lg` the rail is
 * horizontal with the stations threaded onto it; below that it stands the
 * line up on its edge and reads down the page, where a seven-link chain can
 * still breathe and the shorter column is, if anything, more obvious.
 */
export function SupplyTrack({
  title,
  sub,
  nodes,
  verdict,
  tone,
  span = 1,
  hubAt = -1,
  hubCaption,
}: Props) {
  const t = TONES[tone]
  // Stations sit at the centre of equal slots, so the line has to stop half a
  // slot short at each end to land on the first and last marker.
  const edge = 50 / nodes.length
  const solidEnd = span * 100 * (1 - edge / 100)

  return (
    <div data-track className="border-t border-rule pt-7 lg:pt-9">
      <div className="flex flex-col gap-y-2 sm:flex-row sm:items-baseline sm:gap-x-7">
        <h3
          data-track-head
          className={`font-sans text-[0.8125rem] font-semibold tracking-[0.2em] uppercase ${t.title}`}
        >
          {title}
        </h3>
        <p data-track-head className="font-display text-[1.1875rem] italic text-ink-soft lg:text-[1.3125rem]">
          {sub}
        </p>
      </div>

      <div className="mt-7 grid gap-y-9 lg:mt-11 xl:grid-cols-[minmax(0,1fr)_11rem] xl:items-center xl:gap-x-10">
        {/* The measure. The rail may be shorter than it; the ghost run and the
            verdict both key off its right-hand edge. */}
        <div className="relative">
          {span < 1 && (
            <>
              <span
                data-rail-ghost
                aria-hidden="true"
                className="absolute right-0 hidden h-px origin-left bg-olive/22 lg:block"
                style={{ left: `calc(${solidEnd}% + 0.9rem)`, top: RAIL_Y }}
              />
              <svg
                data-rail-tip
                aria-hidden="true"
                viewBox="0 0 10 10"
                className={`absolute -right-px hidden size-2 -translate-y-1/2 fill-current lg:block ${t.icon}`}
                style={{ top: RAIL_Y }}
              >
                <path d="M0 0l10 5-10 5z" />
              </svg>
            </>
          )}

          <div
            className="relative lg:w-[var(--rail-span)]"
            style={{ '--rail-span': `${span * 100}%` } as React.CSSProperties}
          >
            {/* Two rails, one per axis: whichever is on for the breakpoint is
                the one you see, and each owns a single transform. */}
            <span
              data-rail-y
              aria-hidden="true"
              className={`absolute top-[1.875rem] bottom-[1.875rem] left-[4.5px] w-px origin-top lg:hidden ${t.rail}`}
            />
            <span
              data-rail-x
              aria-hidden="true"
              className={`absolute hidden h-px origin-left lg:block ${t.rail}`}
              style={{ left: `${edge}%`, right: `${edge}%`, top: RAIL_Y }}
            />

            <ol className="lg:flex lg:items-start">
              {nodes.map((node, i) =>
                i === hubAt ? (
                  <li
                    key={node.label}
                    data-station
                    className="group relative flex items-center gap-5 py-4 lg:flex-1 lg:flex-col lg:items-center lg:gap-0 lg:px-2 lg:py-0 lg:text-center"
                  >
                    <span className="grid size-[10px] shrink-0 place-items-center lg:order-2 lg:h-3 lg:w-full">
                      <span
                        data-dot
                        className="block size-[12px] rounded-full border border-olive bg-ivory transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-125"
                      />
                    </span>
                    <span className="flex shrink-0 items-center lg:order-1 lg:h-10 lg:w-full lg:items-end lg:justify-center">
                      <LineIcon
                        name={node.icon}
                        strokeWidth={1.4}
                        className="size-9 text-moss transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:-translate-y-0.5"
                      />
                    </span>
                    <span className="min-w-0 lg:order-3 lg:mt-3">
                      <span className="block font-display text-[1.375rem] leading-none font-bold text-ink">
                        {node.label.split(' ')[0]}{' '}
                        <span className="text-moss">{node.label.split(' ').slice(1).join(' ')}</span>
                      </span>
                      {hubCaption && (
                        <span className="mt-2 block font-sans text-[0.625rem] tracking-[0.02em] whitespace-nowrap text-ink-soft lg:text-[0.5625rem] lg:tracking-[0.04em] xl:text-[0.625rem]">
                          {hubCaption}
                        </span>
                      )}
                    </span>
                  </li>
                ) : (
                  <li
                    key={node.label}
                    data-station
                    className="group relative flex items-center gap-5 py-3.5 lg:flex-1 lg:flex-col lg:items-center lg:gap-0 lg:px-2 lg:py-0 lg:text-center"
                  >
                    <span className="grid size-[10px] shrink-0 place-items-center lg:order-2 lg:h-3 lg:w-full">
                      <span
                        data-dot
                        className={`block size-[8px] rounded-full transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-150 ${t.dot}`}
                      />
                    </span>
                    <span className="flex shrink-0 items-center lg:order-1 lg:h-10 lg:w-full lg:items-end lg:justify-center">
                      <LineIcon
                        name={node.icon}
                        strokeWidth={1.4}
                        className={`size-8 transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:-translate-y-0.5 ${t.icon}`}
                      />
                    </span>
                    <span className="min-w-0 text-[0.8125rem] leading-[1.35] whitespace-pre-line text-ink lg:order-3 lg:mt-3 lg:text-[0.75rem] 2xl:text-[0.875rem]">
                      {node.label}
                    </span>
                  </li>
                ),
              )}
            </ol>
          </div>
        </div>

        <p
          data-verdict
          className={`font-sans text-[0.6875rem] leading-[2.1] font-medium tracking-[0.2em] uppercase lg:text-right ${t.verdict}`}
        >
          {verdict.map((line, i) => (
            <span key={line} className={`block ${i === 1 ? 'font-semibold' : ''}`}>
              {line}
            </span>
          ))}
        </p>
      </div>
    </div>
  )
}
