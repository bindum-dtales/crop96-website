import type { LineIconName } from '../components/ui/LineIcon'

/** Tone drives the icon plate: olive-tinted sage, or terracotta blush. */
export type Tone = 'sage' | 'blush'

/* ── Section 01 — Our Impact ─────────────────────────────────────── */

export const IMPACT_POINTS: {
  title: string
  copy: string
  icon: LineIconName
  tone: Tone
}[] = [
  {
    title: 'Better\nLivelihoods',
    copy: 'Fairer prices for hard work.',
    icon: 'leaf',
    tone: 'sage',
  },
  {
    title: 'Stronger\nCommunities',
    copy: 'Growth at the source.',
    icon: 'community',
    tone: 'blush',
  },
  {
    title: 'Sustainable\nFarming',
    copy: 'Preserving resources for future generations.',
    icon: 'sprout',
    tone: 'sage',
  },
  {
    title: 'Better Food\nfor Everyone',
    copy: 'Good produce for healthier lives.',
    icon: 'handHeart',
    tone: 'blush',
  },
]

/** The vertical word column beside the pull quote. */
export const IMPACT_WORDS = ['People', 'Fields', 'Food', 'A brighter tomorrow']

/* ── Section 03 — From Origin to Market ──────────────────────────── */

export const TRADITIONAL_CHAIN: { label: string; icon: LineIconName }[] = [
  { label: 'Farmer', icon: 'farmer' },
  { label: 'Local Trader', icon: 'trader' },
  { label: 'Commission Agent', icon: 'agent' },
  { label: 'Wholesaler', icon: 'warehouse' },
  { label: 'Distributor', icon: 'truck' },
  { label: 'Retailer', icon: 'market' },
  { label: 'Consumer', icon: 'community' },
]

/** Position 1 is the Crop 96 lockup itself, swapped in by `ChainRow`. */
export const CROP96_CHAIN: { label: string; icon: LineIconName }[] = [
  { label: 'Farmer / Source', icon: 'farmer' },
  { label: 'Crop 96', icon: 'leaf' },
  { label: 'Retail / Wholesale\n/ Export', icon: 'truck' },
  { label: 'Market', icon: 'community' },
]

export const VALUE_PROPS: {
  title: string
  copy: string
  icon: LineIconName
  tone: Tone
}[] = [
  {
    title: 'Quality',
    copy: 'Sourced from the best agricultural regions',
    icon: 'badge',
    tone: 'sage',
  },
  {
    title: 'Consistency',
    copy: 'Reliable supply, season after season',
    icon: 'sprout',
    tone: 'sage',
  },
  { title: 'Price', copy: 'Better value through efficient sourcing', icon: 'coins', tone: 'blush' },
  { title: 'Fair Value', copy: 'For farmers and markets', icon: 'handshake', tone: 'blush' },
]

/* ── Section 05 — What We Offer ──────────────────────────────────── */

/**
 * The four routes to market. `note` is set smaller beside the title, so the
 * E-commerce card can say it is not open yet without a second line.
 */
export const OFFERINGS: {
  index: string
  title: string
  note?: string
  copy: string
  image: string
  alt: string
  to: string
}[] = [
  {
    index: '01',
    title: 'Direct Procurement',
    copy: 'Sourcing directly from trusted farming regions to ensure quality, traceability and better value.',
    image: '/img/harvest-rice.webp',
    alt: 'A farmer lifting a bundle of rice seedlings at the water’s edge',
    to: '/services#direct-procurement',
  },
  {
    index: '02',
    title: 'Wholesale & Retail',
    copy: 'Reliable supply for large buyers, retailers and institutional clients across India.',
    image: '/img/svc-wholesale.webp',
    alt: 'Stock racked to the roof down a warehouse aisle',
    to: '/services#wholesale-supply',
  },
  {
    index: '03',
    title: 'Export',
    copy: 'Taking India’s best produce to global markets with consistent quality and compliance.',
    image: '/img/svc-export.webp',
    alt: 'Container stacks and gantry cranes at a shipping terminal',
    to: '/services#export-supply',
  },
  {
    index: '04',
    title: 'E-commerce',
    note: '(Coming Soon)',
    copy: 'Bringing farm-fresh produce to more people, with the same commitment to quality.',
    image: '/img/warehouse.webp',
    alt: 'Cartons staged in bays across a distribution floor',
    to: '/services',
  },
]

export const COMMITMENTS: { title: string; copy: string; icon: LineIconName }[] = [
  { title: 'Quality Assurance', copy: 'From farm to final delivery', icon: 'shield' },
  { title: 'Reliable Supply', copy: 'Across seasons', icon: 'community' },
  { title: 'Sustainable Practices', copy: 'For future generations', icon: 'sprout' },
  { title: 'Partnership-Driven', copy: 'Built on trust', icon: 'link' },
]

/* ── Section 02 — The Crop 96 Way ────────────────────────────────── */

/**
 * Origins pinned on the peninsular map.
 *
 * Three coordinates per crop, all percentages of the map frame so the whole
 * constellation scales with it instead of needing breakpoints of its own:
 * `at` places the produce for composition, `dot` marks the actual growing
 * region on the land, and `label` hangs the caption off a frame edge. The
 * hairline between the two is what ties the composition back to the geography.
 */
export const ORIGINS: {
  name: string
  copy: string
  image: string
  /** `object-position` for frames whose subject is off-centre. */
  focus?: string
  /** Crops past a busy background: `scale` up, centred on (x, y) of the source. */
  zoom?: { scale: number; x: number; y: number }
  at: { x: number; y: number; size: number }
  dot: { x: number; y: number }
  label: { y: number }
  side: 'left' | 'right'
}[] = [
  {
    name: 'Mango',
    copy: 'Sun-ripened.\nWorld-loved.',
    image: '/img/prod-mango.webp',
    at: { x: 72, y: 15, size: 22 },
    dot: { x: 62, y: 27 },
    label: { y: 15.5 },
    side: 'right',
  },
  {
    name: 'Groundnut',
    copy: 'Naturally rich.\nGlobally trusted.',
    image: '/img/prod-groundnut.webp',
    /* The source photo is a tray of cones on a red crate; zooming past the
       crate is what makes the frame read as groundnut rather than plastic. */
    zoom: { scale: 2.2, x: 0.356, y: 0.4 },
    at: { x: 60, y: 43, size: 22 },
    dot: { x: 47, y: 40 },
    label: { y: 42.5 },
    side: 'right',
  },
  {
    name: 'Rice',
    copy: 'A staple\nfor generations.',
    image: '/img/prod-rice.webp',
    at: { x: 70, y: 72, size: 21 },
    dot: { x: 59, y: 62 },
    label: { y: 70 },
    side: 'right',
  },
  {
    name: 'Maize',
    copy: 'Stronger grounds\nfor a brighter future.',
    image: '/img/prod-maize.webp',
    at: { x: 23, y: 35, size: 21 },
    dot: { x: 39, y: 36 },
    label: { y: 42.5 },
    side: 'left',
  },
  {
    name: 'Sugarcane',
    copy: 'Sweetness\nthat travels further.',
    image: '/img/prod-sugarcane.webp',
    at: { x: 36, y: 69, size: 21 },
    dot: { x: 47, y: 56 },
    label: { y: 67 },
    side: 'left',
  },
]

/** State names lettered onto the land itself, in map-frame percentages. */
export const MAP_LABELS = [
  { text: 'Andhra\nPradesh', x: 55, y: 20 },
  { text: 'Karnataka', x: 33, y: 32 },
  { text: 'Anantapur\n(Andhra Pradesh)', x: 61, y: 56, small: true },
  { text: 'Tamil Nadu', x: 41, y: 83 },
]

export const ORIGIN_PROPS: { title: string; copy: string; icon: LineIconName; tone: Tone }[] = [
  { title: 'Quality', copy: 'Sourced from the best', icon: 'leaf', tone: 'sage' },
  { title: 'Consistency', copy: 'Season after season', icon: 'refresh', tone: 'sage' },
  { title: 'Price', copy: 'More value, less layers', icon: 'coins', tone: 'blush' },
  { title: 'Fair Value', copy: 'For farmers and markets', icon: 'handshake', tone: 'blush' },
]
