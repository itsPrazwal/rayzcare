import { DEFAULT_CURRENCY_CODE } from '../constants'

const formatNumber = value => {
  return new Intl.NumberFormat('en', {
    currency: DEFAULT_CURRENCY_CODE,
    style: 'currency',
  }).format(value)
}

export const getPriceRange = price => {
  if (!price || typeof price?.minVariantPrice === 'undefined') {
    return 'No price found'
  }

  if (price.maxVariantPrice && price.minVariantPrice !== price.maxVariantPrice) {
    return `${formatNumber(price.minVariantPrice)} – ${formatNumber(price.maxVariantPrice)}`
  }

  return formatNumber(price.minVariantPrice)
}
