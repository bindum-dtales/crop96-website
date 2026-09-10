import { useEffect } from 'react'
import { Button } from '../components/ui/Button'

export default function NotFound() {
  useEffect(() => {
    document.title = 'Page not found — Crop 96 Agri Exim Pvt. Ltd.'
  }, [])

  return (
    <section className="container-96 flex min-h-[60vh] flex-col items-center justify-center py-20 text-center">
      <p className="eyebrow">
        <span aria-hidden="true" className="h-px w-7 bg-harvest-500/70" />
        Error 404
        <span aria-hidden="true" className="h-px w-7 bg-harvest-500/70" />
      </p>
      <h1 className="mt-3 text-[clamp(1.875rem,4vw,2.75rem)]">This field is fallow.</h1>
      <p className="mt-3 max-w-md text-[0.9375rem] leading-relaxed text-ink-500">
        The page you were looking for is not here. Head back to the homepage, or tell us what you were
        after.
      </p>
      <div className="mt-7 flex flex-wrap justify-center gap-3">
        <Button to="/" arrow>
          Back to Home
        </Button>
        <Button to="/contact" variant="outline">
          Contact Us
        </Button>
      </div>
    </section>
  )
}
