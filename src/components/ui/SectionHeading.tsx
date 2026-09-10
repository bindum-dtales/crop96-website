import type { ReactNode } from 'react'

type Props = {
  eyebrow: string
  title: ReactNode
  lead?: ReactNode
  align?: 'center' | 'left'
  className?: string
}

/** The eyebrow-rule / headline / lead stack that opens every section. */
export function SectionHeading({
  eyebrow,
  title,
  lead,
  align = 'center',
  className = '',
}: Props) {
  const centered = align === 'center'
  return (
    <header
      className={`${centered ? 'mx-auto max-w-3xl text-center' : 'max-w-2xl'} ${className}`}
    >
      <p className="eyebrow" data-reveal="fade">
        <span aria-hidden="true" className="h-px w-7 bg-harvest-500/70" />
        {eyebrow}
        {centered && <span aria-hidden="true" className="h-px w-7 bg-harvest-500/70" />}
      </p>
      <h2
        data-reveal
        className="mt-3 text-[clamp(1.75rem,3.2vw,2.375rem)] leading-[1.15]"
      >
        {title}
      </h2>
      {lead && (
        <p
          data-reveal
          className={`mt-3.5 text-[0.9375rem] leading-relaxed text-ink-500 sm:text-base ${
            centered ? 'mx-auto' : ''
          }`}
        >
          {lead}
        </p>
      )}
    </header>
  )
}

/** Highlights part of a headline in brand green, as the reference does. */
export function Hi({ children }: { children: ReactNode }) {
  return <span className="text-brand-600">{children}</span>
}
