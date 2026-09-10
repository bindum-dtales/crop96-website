import { Link } from 'react-router-dom'
import type { ComponentProps, ReactNode } from 'react'
import { LineIcon } from './LineIcon'

type Variant = 'solid' | 'outline' | 'quiet'

const BASE =
  'group/pill inline-flex items-center justify-center gap-3 rounded-full px-7 py-3.5 font-sans text-[0.9375rem] font-medium tracking-[0.01em] transition-[background-color,color,border-color,box-shadow,transform] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] will-change-transform hover:-translate-y-0.5 active:translate-y-0'

const VARIANTS: Record<Variant, string> = {
  solid:
    'bg-forest text-ivory shadow-[0_10px_26px_-16px_rgb(55_75_36_/_0.9)] hover:bg-[#2c3d1c] hover:shadow-[0_18px_36px_-18px_rgb(55_75_36_/_0.85)]',
  outline:
    'border border-rule bg-paper/70 text-ink backdrop-blur-sm hover:border-forest/40 hover:text-forest',
  quiet: 'text-ink hover:text-forest',
}

type Props = {
  variant?: Variant
  /** Trailing arrow that slides forward on hover, as on the reference CTAs. */
  arrow?: boolean
  to?: string
  href?: string
  children: ReactNode
} & Omit<ComponentProps<'button'>, 'ref'>

export function Pill({
  variant = 'solid',
  arrow = false,
  to,
  href,
  children,
  className = '',
  ...rest
}: Props) {
  const cls = `${BASE} ${VARIANTS[variant]} ${className}`
  const inner = (
    <>
      {children}
      {arrow && (
        <LineIcon
          name="arrow"
          strokeWidth={1.6}
          className="size-[1.05em] transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover/pill:translate-x-1.5"
        />
      )}
    </>
  )

  if (to)
    return (
      <Link to={to} className={cls}>
        {inner}
      </Link>
    )
  if (href)
    return (
      <a
        href={href}
        className={cls}
        target={href.startsWith('http') ? '_blank' : undefined}
        rel="noreferrer"
      >
        {inner}
      </a>
    )
  return (
    <button className={cls} {...rest}>
      {inner}
    </button>
  )
}
