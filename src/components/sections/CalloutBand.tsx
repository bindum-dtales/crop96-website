import { Button } from '../ui/Button'

type Props = {
  title: string
  lead: string
  cta?: string
  to?: string
}

/** The closing green band shared by the inner pages. */
export function CalloutBand({ title, lead, cta = 'Send an Enquiry', to = '/contact' }: Props) {
  return (
    <section className="bg-white pb-14 sm:pb-16">
      <div className="container-96">
        <div
          data-reveal="up-lg"
          className="flex flex-col items-center gap-5 rounded-panel bg-linear-to-br from-brand-600 via-brand-700 to-brand-800 px-6 py-11 text-center shadow-panel sm:px-12"
        >
          <h2 className="max-w-2xl text-[clamp(1.5rem,2.8vw,2rem)] leading-tight text-white">
            {title}
          </h2>
          <p className="max-w-xl text-[0.9375rem] leading-relaxed text-white/85">{lead}</p>
          <Button to={to} variant="ghost-light" arrow>
            {cta}
          </Button>
        </div>
      </div>
    </section>
  )
}
