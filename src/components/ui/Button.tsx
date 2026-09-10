import { Link } from 'react-router-dom'
import type { ComponentProps, ReactNode } from 'react'
import { Icon } from './Icon'

type Variant = 'primary' | 'outline' | 'ghost-light'

const BASE =
  'group/btn relative inline-flex items-center justify-center gap-2 rounded-lg px-6 py-3 text-[0.9375rem] font-bold transition-[background-color,color,box-shadow,transform] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] active:translate-y-px'

const VARIANTS: Record<Variant, string> = {
  primary:
    'bg-brand-600 text-white shadow-[0_8px_20px_-10px_rgb(13_129_41_/_0.9)] hover:bg-brand-700 hover:shadow-[0_14px_28px_-12px_rgb(13_129_41_/_0.95)]',
  outline:
    'border border-ink-900/15 bg-white text-ink-900 hover:border-brand-600 hover:text-brand-700',
  'ghost-light':
    'border border-white/40 bg-white/10 text-white backdrop-blur-sm hover:bg-white hover:text-brand-700',
}

type Props = {
  variant?: Variant
  /** Adds the trailing arrow that slides on hover, as on the reference CTAs. */
  arrow?: boolean
  to?: string
  href?: string
  children: ReactNode
} & Omit<ComponentProps<'button'>, 'ref'>

export function Button({
  variant = 'primary',
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
        <Icon
          name="arrow"
          className="size-4 transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover/btn:translate-x-1"
        />
      )}
    </>
  )

  if (to) return <Link to={to} className={cls}>{inner}</Link>
  if (href)
    return (
      <a href={href} className={cls} target={href.startsWith('http') ? '_blank' : undefined} rel="noreferrer">
        {inner}
      </a>
    )
  return (
    <button className={cls} {...rest}>
      {inner}
    </button>
  )
}
