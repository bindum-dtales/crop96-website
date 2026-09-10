import type { IconName } from '../components/ui/Icon'

export const NAV = [
  { label: 'Home', to: '/' },
  { label: 'About Us', to: '/about' },
  { label: 'Our Produce', to: '/products' },
  { label: 'What We Offer', to: '/services' },
  { label: 'Contact', to: '/contact' },
] as const

export const CONTACT = {
  phone: '+91 98765 43210',
  phoneHref: 'tel:+919876543210',
  email: 'contact.crop96@gmail.com',
  emailHref: 'mailto:contact.crop96@gmail.com',
  address: 'Bengaluru, Karnataka, India',
  whatsapp: 'Chat on WhatsApp',
  whatsappHref: 'https://wa.me/919876543210',
  linkedinHref: 'https://www.linkedin.com/',
}

export type Service = {
  slug: string
  title: string
  blurb: string
  image: string
  icon: IconName
  tone: 'brand' | 'harvest'
  detail: string[]
}

export const SERVICES: Service[] = [
  {
    slug: 'direct-procurement',
    title: 'Direct Procurement',
    blurb: 'Direct sourcing of agricultural produce from farmers across Karnataka.',
    image: '/img/svc-procurement.webp',
    icon: 'sprout',
    tone: 'brand',
    detail: [
      'We buy at the farm gate, so growers deal with one buyer instead of a chain of intermediaries.',
      'Prices are agreed up front against grade and moisture, and payments are settled on a fixed cycle.',
      'Field teams cover the major producing belts of Karnataka through the full harvest window.',
    ],
  },
  {
    slug: 'wholesale-supply',
    title: 'Wholesale Supply',
    blurb: 'Reliable supply for wholesalers and bulk buyers with consistent quality and quantity.',
    image: '/img/svc-wholesale.webp',
    icon: 'warehouse',
    tone: 'harvest',
    detail: [
      'Contracted volumes are held against an agreed specification for the length of the season.',
      'Consignments are graded and lot-numbered before dispatch so every load is traceable.',
      'Storage and staging near the producing belt keeps lead times short for repeat buyers.',
    ],
  },
  {
    slug: 'retail-supply',
    title: 'Retail Supply',
    blurb: 'Quality agricultural products supplied to retail businesses and market channels.',
    image: '/img/svc-retail.webp',
    icon: 'cart',
    tone: 'brand',
    detail: [
      'Pack sizes and grades are matched to the shelf, not to the bulk trade.',
      'Scheduled replenishment keeps produce moving before it loses condition.',
      'Consistent grading across deliveries so the shelf looks the same week to week.',
    ],
  },
  {
    slug: 'export-supply',
    title: 'Export Supply',
    blurb: 'Connecting Indian agricultural produce with global markets and buyers.',
    image: '/img/svc-export.webp',
    icon: 'globe',
    tone: 'harvest',
    detail: [
      'Export lots are selected against destination-market specification and season.',
      'Documentation, phytosanitary certification and container staging are handled end to end.',
      'Shipment planning works back from the buyer’s arrival window rather than the harvest date.',
    ],
  },
]

export type Product = {
  slug: string
  name: string
  blurb: string
  image: string
  icon: IconName
  tone: 'brand' | 'harvest'
  season: string
  grades: string
  packaging: string
}

export const PRODUCTS: Product[] = [
  {
    slug: 'groundnut',
    name: 'Groundnut',
    blurb: 'Quality groundnuts sourced directly from trusted farmers across Karnataka.',
    image: '/img/prod-groundnut.webp',
    icon: 'sprout',
    tone: 'brand',
    season: 'Kharif — Oct to Jan',
    grades: 'Bold, Java, TJ kernels',
    packaging: '25 / 50 kg jute or PP bags',
  },
  {
    slug: 'rice',
    name: 'Rice',
    blurb: 'Carefully sourced rice suitable for wholesale, retail and export requirements.',
    image: '/img/prod-rice.webp',
    icon: 'grain',
    tone: 'harvest',
    season: 'Year round',
    grades: 'Raw, steam and parboiled',
    packaging: '5 / 25 / 50 kg bags',
  },
  {
    slug: 'maize',
    name: 'Maize',
    blurb: 'Reliable maize procurement with emphasis on quality and consistent supply.',
    image: '/img/prod-maize.webp',
    icon: 'corn',
    tone: 'brand',
    season: 'Kharif and Rabi',
    grades: 'Feed and industrial grade',
    packaging: '50 kg bags or bulk',
  },
  {
    slug: 'mango',
    name: 'Mango',
    blurb: 'Fresh, carefully selected mangoes sourced during the appropriate harvest season.',
    image: '/img/prod-mango.webp',
    icon: 'mango',
    tone: 'harvest',
    season: 'Apr to Jul',
    grades: 'Alphonso, Badami, Totapuri',
    packaging: 'Ventilated 3 / 5 kg cartons',
  },
  {
    slug: 'sugarcane',
    name: 'Sugarcane',
    blurb: 'Directly sourced sugarcane from farming communities with a focus on quality and dependable supply.',
    image: '/img/prod-sugarcane.webp',
    icon: 'cane',
    tone: 'brand',
    season: 'Dec to Mar',
    grades: 'Mill and juice grade',
    packaging: 'Bulk truck loads',
  },
]

export const PROCESS = [
  { step: '01', title: 'Farmers', icon: 'farmer' as IconName },
  { step: '02', title: 'Direct Procurement', icon: 'handshake' as IconName },
  { step: '03', title: 'Quality Selection', icon: 'gear' as IconName },
  { step: '04', title: 'Wholesale / Retail / Export', icon: 'truck' as IconName },
  { step: '05', title: 'Markets', icon: 'globe' as IconName },
]

export const BENEFITS = [
  { title: 'Fair Value\nfor Farmers', tone: 'brand' as const },
  { title: 'Quality\nProducts', tone: 'harvest' as const },
  { title: 'Direct Sourcing\nin Karnataka', tone: 'brand' as const },
]

export const REQUIREMENT_TYPES = ['Wholesale', 'Retail', 'Export', 'Other'] as const
