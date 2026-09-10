type Props = {
  className?: string
  /** Mirrors the spray so it can hang off either corner. */
  flip?: boolean
  ref?: React.Ref<SVGSVGElement>
}

/** One leaf, tip at the origin, drawn once and re-placed by transform. */
const LEAF = 'M0 0C30-24 80-20 108 4 76 32 26 28 0 0Z'
const VEIN = 'M6 2 100 6'

/**
 * The botanical spray that overhangs a panel corner in the art direction.
 * Drawn rather than photographed so it keeps a crisp edge against the ivory
 * at any size, and costs a couple of hundred bytes instead of a cut-out PNG.
 */
export function LeafSpray({ className = '', flip = false, ref }: Props) {
  return (
    <svg
      ref={ref}
      viewBox="0 0 320 260"
      fill="none"
      aria-hidden="true"
      className={`${className} ${flip ? '-scale-x-100' : ''}`}
    >
      <g stroke="#2f4a22" strokeOpacity=".28" strokeWidth="1.5" strokeLinecap="round">
        <path d="M300 22C246 46 196 92 168 150" />
        <path d="M300 22C262 74 236 130 226 196" />
      </g>

      {/* Back leaves sit cooler and darker so the cluster reads with depth. */}
      <g transform="translate(196 44) rotate(148)">
        <path d={LEAF} fill="#2f4a22" />
        <path d={VEIN} stroke="#84a06a" strokeOpacity=".55" strokeWidth="2" strokeLinecap="round" />
      </g>
      <g transform="translate(238 128) rotate(122) scale(.92)">
        <path d={LEAF} fill="#3d5c2a" />
        <path d={VEIN} stroke="#8fae74" strokeOpacity=".5" strokeWidth="2" strokeLinecap="round" />
      </g>
      <g transform="translate(292 74) rotate(168) scale(.8)">
        <path d={LEAF} fill="#4a6d33" />
        <path d={VEIN} stroke="#a3bf87" strokeOpacity=".5" strokeWidth="2" strokeLinecap="round" />
      </g>
      <g transform="translate(256 208) rotate(96) scale(.7)">
        <path d={LEAF} fill="#365323" />
        <path d={VEIN} stroke="#8fae74" strokeOpacity=".45" strokeWidth="2" strokeLinecap="round" />
      </g>
    </svg>
  )
}
