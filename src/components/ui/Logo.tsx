import { Link } from 'react-router-dom'
import logo from '../../assets/logo.png'

type Props = {
  /** `light` sits the mark on the dark green footer. */
  variant?: 'dark' | 'light'
  className?: string
}

/**
 * The Crop 96 mark. It ships as artwork rather than inline SVG because the
 * wordmark, the sun and the clay ridge are the registered lockup — redrawing
 * them would drift. Intrinsic size is set so it never shifts layout on load.
 */
export function Logo({ variant = 'dark', className = 'h-10 sm:h-11' }: Props) {
  return (
    <Link
      to="/"
      className="group inline-flex shrink-0 items-center"
      aria-label="Crop 96 Agri Exim Pvt. Ltd. — home"
    >
      <img
        src={logo}
        alt="Crop 96 Agri Exim Pvt. Ltd."
        width={477}
        height={199}
        className={`w-auto origin-left transition-[height,transform,filter] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.03] ${className} ${
          variant === 'light' ? 'brightness-0 invert' : ''
        }`}
      />
    </Link>
  )
}
