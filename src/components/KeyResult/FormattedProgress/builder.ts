import { FormatNumberOptions } from 'react-intl'

import { KeyResultFormat } from 'src/components/KeyResult/types'

export const buildFormatNumberOptionsBasedOnFormat = (
  format?: KeyResultFormat,
): FormatNumberOptions => {
  const formatNumberOptionHashmap: Record<KeyResultFormat, FormatNumberOptions> = {
    [KeyResultFormat.NUMBER]: {},

    [KeyResultFormat.PERCENTAGE]: {
      style: 'percent',
    },

    [KeyResultFormat.COIN_BRL]: {
      style: 'currency',
      currency: 'BRL',
    },
  }

  return formatNumberOptionHashmap[format] ?? formatNumberOptionHashmap[KeyResultFormat.NUMBER]
}
