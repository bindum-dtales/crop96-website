type Props = {
  /** The section numeral, e.g. `01`. */
  index?: string
  children: React.ReactNode
  className?: string
}

/**
 * "01 / THE CROP 96 WAY" — the running section marker. The numeral sits back
 * a little from the label so the eye lands on the words, as in the reference.
 */
export function Eyebrow({ index, children, className = '' }: Props) {
  return (
    <p className={`eyebrow ${className}`}>
      {index && (
        <>
          <span className="text-terracotta/65">{index}</span>
          <span aria-hidden="true" className="text-terracotta/35">
            /
          </span>
        </>
      )}
      <span>{children}</span>
    </p>
  )
}
