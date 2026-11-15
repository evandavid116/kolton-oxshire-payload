import Link from 'next/link'
import type { GivingSection as GivingSectionType, PartnerPage as PartnerPageType } from '@/types/globals'

type Props = {
  giving: GivingSectionType
  partner: PartnerPageType
}

const DEFAULT_SUBLINES = ["It's More Than a Transaction.", 'You Are Family.']

export default function InvitePartner({ giving, partner }: Props) {
  const sublines =
    partner?.heroSublines && partner.heroSublines.length > 0
      ? partner.heroSublines.map((s) => s.line)
      : DEFAULT_SUBLINES
  const lead = sublines.slice(0, -1).join(' ')
  const last = sublines[sublines.length - 1]

  return (
    <section className="hb-split">
      <div className="hb-invite" id="invite">
        <span className="hb-slug">No. 08 &mdash; Book to speak</span>
        <h2 className="hb-cond">
          Invite Kolton to <span className="hb-red">preach</span>
        </h2>
        <p>
          Join Kolton at live speaking engagements and revival meetings across the country.
          Experience the power of God in person.
        </p>
        <Link className="hb-btn hb-solid" style={{ alignSelf: 'start' }} href="/book-to-speak">
          Start an invitation &rarr;
        </Link>
      </div>
      <div className="hb-partner" id="partner">
        <span className="hb-slug">No. 09 &mdash; {giving?.eyebrow || 'Partner With Us'}</span>
        <h2 className="hb-cond">
          {lead} <span className="hb-red">{last}</span>
        </h2>
        <p>
          {giving?.subheading ||
            'Your generous giving fuels the spread of the Gospel. Every dollar sown is a seed planted for the Kingdom.'}
        </p>
        <Link className="hb-btn hb-ink" style={{ alignSelf: 'start' }} href="/partner">
          {partner?.heroCtaLabel || 'Join the Family'} &rarr;
        </Link>
      </div>
    </section>
  )
}
