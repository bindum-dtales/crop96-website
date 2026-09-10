import { Hero96 } from '../components/home/Hero96'
import { ShorterPath } from '../components/home/ShorterPath'
import { WhatWeOffer } from '../components/home/WhatWeOffer'
import { OriginMap } from '../components/home/OriginMap'
import { Commitment } from '../components/home/Commitment'
import { Enquiry } from '../components/sections/Enquiry'

/**
 * One continuous spread in three movements: the land the produce comes from,
 * the shorter route it travels, and the four ways it reaches a buyer. Each
 * movement opens on ivory with display type, and the page closes on the
 * commitment band and the enquiry spread, so the joins read as page turns
 * rather than seams. The enquiry section is the same one the contact page
 * ends on — one form, one set of behaviour, two places it is reachable.
 */
export default function Home() {
  return (
    <>
      <Hero96 />
      <OriginMap />
      <ShorterPath />
      <WhatWeOffer />
      <Commitment />
      <Enquiry />
    </>
  )
}
