type Props = {
  name: IconName
  className?: string
}

/**
 * Every glyph the site uses, as one stroked 24px set. A dependency-free set
 * keeps the line weight consistent with the reference and costs no bundle.
 */
const PATHS = {
  sprout:
    'M12 20v-7m0 0C12 9 9 6 4 6c0 5 3 8 8 7Zm0 0c0-4 3-7 8-7 0 5-3 8-8 7Z',
  warehouse: 'M3 21V9l9-5 9 5v12M3 21h18M8 21v-6h8v6M8 15h8',
  cart: 'M3 4h2l2.4 11.2a2 2 0 0 0 2 1.6h7.5a2 2 0 0 0 2-1.55L20.5 8H6M9 21h.01M17 21h.01',
  globe: 'M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18Zm0 0c2.5-2.4 3.8-5.4 3.8-9S14.5 5.4 12 3c-2.5 2.4-3.8 5.4-3.8 9s1.3 6.6 3.8 9ZM3.4 9h17.2M3.4 15h17.2',
  grain: 'M12 21V11m0 0c0-3 1.8-5.6 5-7 .5 3.6-1.2 6.4-5 7Zm0 0c0-3-1.8-5.6-5-7-.5 3.6 1.2 6.4 5 7Zm0 4.5c0-2.6 1.6-4.8 4.4-6-.4 3.1-1.9 5.4-4.4 6Z',
  corn: 'M12 22V13m0 0c3.3 0 6-3.6 6-8 0 0-6 .4-6 8Zm0 0c-3.3 0-6-3.6-6-8 0 0 6 .4 6 8Zm-3-4.6 3 1.8 3-1.8',
  mango: 'M16.5 4c-2 0-3.4.9-4.5 2.2C10.9 4.9 9.5 4 7.5 4 5 4 3 6.4 3 10c0 5 4.4 10 9 10s9-5 9-10c0-3.6-2-6-4.5-6ZM12 6.2c.6-1.6 2-2.7 3.7-3.2',
  cane: 'M7 21 17 3M5 17l10-1M6 13l10-1M7 9l10-1M8 5l9-1',
  farmer:
    'M12 12a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7Zm-8 9a8 8 0 0 1 16 0M4.5 6h15',
  handshake: 'm11 17 2 2 3-3 3 3 2-2-6-6-2 2-3-3-4 4 2 2 3-3M3 11l4-4',
  gear: 'M12 15.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7Z M19.4 15a1.6 1.6 0 0 0 .3 1.8l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.6 1.6 0 0 0-2.7 1.1V21a2 2 0 1 1-4 0v-.1A1.6 1.6 0 0 0 7.5 19.4l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1A1.6 1.6 0 0 0 3.6 14H3a2 2 0 1 1 0-4h.1A1.6 1.6 0 0 0 4.6 7.5l-.1-.1a2 2 0 1 1 2.8-2.8l.1.1A1.6 1.6 0 0 0 10 3.6V3a2 2 0 1 1 4 0v.1a1.6 1.6 0 0 0 2.5 1.5l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1a1.6 1.6 0 0 0 1.1 2.7H21a2 2 0 1 1 0 4h-.1a1.6 1.6 0 0 0-1.5 1Z',
  truck: 'M3 16V6h11v10M14 9h3.5l2.5 3.5V16M3 16h1.5m9 0H9m11 0h1M7 19a2 2 0 1 0 0-4 2 2 0 0 0 0 4Zm11 0a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z',
  check: 'm5 12.5 4.5 4.5L19 7.5',
  arrow: 'M4 12h15m0 0-6-6m6 6-6 6',
  phone:
    'M6.5 3.5h3l1.5 4-2 1.5a12 12 0 0 0 6 6l1.5-2 4 1.5v3A2 2 0 0 1 18.4 20 16 16 0 0 1 4 5.6a2 2 0 0 1 2.5-2.1Z',
  mail: 'M3 6h18v12H3z M3 6.5 12 13l9-6.5',
  pin: 'M12 21s7-5.7 7-11a7 7 0 1 0-14 0c0 5.3 7 11 7 11Zm0-8.5a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z',
  whatsapp:
    'M3.5 20.5 5 16a8 8 0 1 1 3 3l-4.5 1.5Zm6-11c-.5 0-1 .2-1.2.7-.3.6-.3 1.6.4 2.7.8 1.3 2 2.4 3.4 3 1 .4 1.9.4 2.4.1.4-.2.7-.7.8-1.2 0-.2 0-.4-.2-.5l-1.6-.8c-.2 0-.4 0-.5.2l-.5.6c-.1.2-.3.2-.5.1a6 6 0 0 1-2.2-2c-.1-.2 0-.4.1-.5l.5-.6c.1-.2.2-.4.1-.6l-.6-1.1c-.1-.2-.2-.2-.4-.2Z',
  linkedin: 'M5 9v10M5 5.5v.01M10 19v-5.5a2.5 2.5 0 0 1 5 0V19M10 9v10',
  copyright: 'M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18Zm2.5-11.2A3 3 0 1 0 15 14',
  menu: 'M4 7h16M4 12h16M4 17h16',
  close: 'M6 6l12 12M18 6 6 18',
} as const

export type IconName = keyof typeof PATHS

export function Icon({ name, className = 'size-6' }: Props) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.7}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
      focusable="false"
    >
      <path d={PATHS[name]} />
    </svg>
  )
}
