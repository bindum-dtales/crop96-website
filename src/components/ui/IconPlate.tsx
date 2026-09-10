import { LineIcon, type LineIconName } from './LineIcon'
import type { Tone } from '../../lib/home'

type Props = {
  icon: LineIconName
  tone: Tone
  /** `sm` is the value-prop row; `lg` is the impact rail. */
  size?: 'sm' | 'lg'
  className?: string
}

const TONES: Record<Tone, string> = {
  sage: 'bg-sage/70 text-olive',
  blush: 'bg-blush/70 text-clay',
}

/** A pictogram on its soft circular plate — the recurring motif of the set. */
export function IconPlate({ icon, tone, size = 'lg', className = '' }: Props) {
  const box = size === 'lg' ? 'size-13 sm:size-14' : 'size-11'
  const glyph = size === 'lg' ? 'size-6 sm:size-6.5' : 'size-5.5'
  return (
    <span
      className={`grid shrink-0 place-items-center rounded-full transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${box} ${TONES[tone]} ${className}`}
    >
      <LineIcon name={icon} className={glyph} strokeWidth={1.45} />
    </span>
  )
}
