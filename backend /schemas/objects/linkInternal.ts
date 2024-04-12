import { LinkIcon } from '@sanity/icons'
import { PAGE_REFERENCES } from '../../constants'
import { getPriceRange } from '../../utils/getPriceRange'

export default {
  title: 'Internal Link',
  name: 'linkInternal',
  type: 'object',
  icon: LinkIcon,
  fields: [
    {
      name: 'title',
      type: 'string',
      validation: Rule => Rule.required(),
    },
    {
      name: 'reference',
      type: 'reference',
      to: PAGE_REFERENCES,
      weak: true,
      validation: Rule => Rule.required(),
    },
  ],
  preview: {
    select: {
      reference: 'reference',
      referenceProductTitle: 'reference.store.title',
      referenceProductPriceRange: 'reference.store.priceRange',
      referenceTitle: 'reference.title',
      referenceType: 'reference._type',
      title: 'title',
    },
    prepare({
      reference,
      referenceProductPriceRange,
      referenceProductTitle,
      referenceTitle,
      referenceType,
      title,
    }) {
      let subtitle = []
      if (reference) {
        subtitle.push([`→ ${referenceTitle || referenceProductTitle}`])
        if (referenceType === 'product' && referenceProductPriceRange) {
          subtitle.push(`(${getPriceRange(referenceProductPriceRange)})`)
        }
      } else {
        subtitle.push('(Nonexistent document reference)')
      }

      return {
        subtitle: subtitle.join(' '),
        title,
      }
    },
  },
}
