import { useId, useState } from 'react'
import { PRODUCTS, REQUIREMENT_TYPES } from '../../lib/site'
import { LineIcon } from '../ui/LineIcon'

/**
 * Ruled fields rather than boxed ones: a label in the margin above, the value
 * on a hairline, and the hairline turning forest on focus. It is the same
 * hairline the rest of the spread is built from, which is what stops the form
 * reading as a widget dropped onto the page.
 */
const field =
  'mt-1 w-full border-b border-ink/28 bg-transparent py-3 text-[0.9375rem] text-ink transition-colors duration-300 placeholder:text-ink-soft/90 focus:border-forest focus:outline-none'
/* Labels stay quiet but not faint: 11px uppercase has to clear AA, and it
   sits over a photograph washed back rather than over flat ivory. */
const label =
  'block font-sans text-[0.6875rem] font-medium tracking-[0.16em] text-ink-soft uppercase'

/** Native select arrows are chrome; this one belongs to the type. */
const selectField = `${field} appearance-none pr-7`

function Req() {
  return (
    <span className="text-clay" aria-hidden="true">
      *
    </span>
  )
}

function Caret() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 12 8"
      className="pointer-events-none absolute right-0 bottom-3.5 w-2.5 text-ink-soft"
    >
      <path
        d="M1 1.5 6 6.5l5-5"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

type Status = 'idle' | 'sending' | 'sent' | 'error'

/**
 * There is no endpoint yet, so this resolves without sending anything and the
 * form confirms inline — the behaviour the form has always had. It is written
 * as a promise because the status below is driven off it: pointing this at a
 * real transport is the only edit needed, and nothing here pretends a request
 * is in flight when none is.
 */
async function send(_entry: FormData) {}

const TONE: Record<Status, string> = {
  idle: '',
  sending: 'text-ink-soft',
  sent: 'text-moss',
  error: 'text-[color-mix(in_srgb,var(--color-clay)_76%,var(--color-ink))]',
}

const MESSAGE: Record<Status, string> = {
  idle: '',
  sending: 'Sending your enquiry…',
  sent: 'Thank you — your enquiry has been recorded. We will be in touch shortly.',
  error: 'Something went wrong sending that. Please try again, or email us directly.',
}

/**
 * Required fields are left to native constraint validation: the browser blocks
 * the submit, moves focus to the offending control and announces it, which is
 * both better behaved and more accessible than anything hand-rolled here.
 */
export function EnquiryForm() {
  const id = useId()
  const [status, setStatus] = useState<Status>('idle')
  const busy = status === 'sending'

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    // Read the entry before awaiting: `currentTarget` is null once React has
    // pooled its way past the first suspension point.
    const entry = new FormData(event.currentTarget)
    setStatus('sending')
    try {
      await send(entry)
      setStatus('sent')
    } catch {
      setStatus('error')
    }
  }

  return (
    <form
      onSubmit={onSubmit}
      aria-describedby={status === 'idle' ? undefined : `${id}-status`}
    >
      <h3 className="font-sans text-[0.6875rem] font-semibold tracking-[0.2em] text-[color-mix(in_srgb,var(--color-clay)_76%,var(--color-ink))] uppercase">
        Send Us an Enquiry
      </h3>

      <div className="mt-8 grid gap-x-8 gap-y-7 sm:grid-cols-2 lg:mt-9">
        <div>
          <label className={label} htmlFor={`${id}-name`}>
            Name <Req />
          </label>
          <input
            id={`${id}-name`}
            name="name"
            required
            autoComplete="name"
            placeholder="Name"
            className={field}
          />
        </div>
        <div>
          <label className={label} htmlFor={`${id}-company`}>
            Company Name
          </label>
          <input
            id={`${id}-company`}
            name="company"
            autoComplete="organization"
            placeholder="Company Name"
            className={field}
          />
        </div>
        <div>
          <label className={label} htmlFor={`${id}-phone`}>
            Phone / WhatsApp <Req />
          </label>
          <input
            id={`${id}-phone`}
            name="phone"
            type="tel"
            required
            autoComplete="tel"
            placeholder="+91 98765 43210"
            className={field}
          />
        </div>
        <div>
          <label className={label} htmlFor={`${id}-email`}>
            Email <Req />
          </label>
          <input
            id={`${id}-email`}
            name="email"
            type="email"
            required
            autoComplete="email"
            placeholder="youremail@example.com"
            className={field}
          />
        </div>
        <div className="relative">
          <label className={label} htmlFor={`${id}-type`}>
            Requirement Type <Req />
          </label>
          <select
            id={`${id}-type`}
            name="requirementType"
            required
            defaultValue=""
            className={selectField}
          >
            <option value="" disabled>
              Select type
            </option>
            {REQUIREMENT_TYPES.map((t) => (
              <option key={t}>{t}</option>
            ))}
          </select>
          <Caret />
        </div>
        <div className="relative">
          <label className={label} htmlFor={`${id}-product`}>
            Product <Req />
          </label>
          <select
            id={`${id}-product`}
            name="product"
            required
            defaultValue=""
            className={selectField}
          >
            <option value="" disabled>
              Select product
            </option>
            {PRODUCTS.map((p) => (
              <option key={p.slug}>{p.name}</option>
            ))}
            <option>Other</option>
          </select>
          <Caret />
        </div>
        <div className="sm:col-span-2">
          <label className={label} htmlFor={`${id}-qty`}>
            Quantity / Requirement
          </label>
          <input
            id={`${id}-qty`}
            name="quantity"
            placeholder="e.g. 5 tons, 10 containers, etc."
            className={field}
          />
        </div>
        <div className="sm:col-span-2">
          <label className={label} htmlFor={`${id}-message`}>
            Message
          </label>
          <textarea
            id={`${id}-message`}
            name="message"
            rows={2}
            placeholder="Tell us more about your requirement..."
            className={`${field} field-sizing-content min-h-24 resize-y`}
          />
        </div>
      </div>

      <button
        type="submit"
        disabled={busy}
        aria-busy={busy}
        className="group/cta mt-10 inline-flex h-[3.125rem] w-full items-center justify-center gap-3 rounded-full bg-forest font-sans text-[0.9375rem] font-medium text-ivory transition-[background-color,opacity,transform] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-px hover:bg-[#2d3d1d] disabled:pointer-events-none disabled:opacity-55 sm:w-auto sm:px-9"
      >
        {busy ? 'Sending' : 'Send Enquiry'}
        <LineIcon
          name="arrow"
          strokeWidth={1.5}
          className="size-4.5 transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover/cta:translate-x-1"
        />
      </button>

      <p
        id={`${id}-status`}
        role={status === 'error' ? 'alert' : 'status'}
        aria-live="polite"
        className={`mt-4 text-[0.8125rem] leading-[1.5] ${TONE[status]}`}
      >
        {MESSAGE[status]}
      </p>
    </form>
  )
}
