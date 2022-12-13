import { CARD_TYPES } from './card-types'

export const highlightCardTheme = {
  [CARD_TYPES.FEELING]: {
    color: 'yellow.700',
    bg: 'yellow.100',
    hover: 'yellow.200',
  },
  [CARD_TYPES.PRODUCTIVITY]: {
    color: 'brand.500',
    bg: 'brand.50',
    hover: 'brand.100',
  },
  [CARD_TYPES.ROADBLOCK]: {
    color: 'pink.500',
    bg: 'pink.50',
    hover: 'pink.100',
  },

  [CARD_TYPES.CHECKIN]: {
    color: 'pink.500',
    bg: 'pink.50',
    hover: 'pink.100',
  },
  [CARD_TYPES.CONFIDENCE]: {
    color: 'pink.500',
    bg: 'pink.50',
    hover: 'pink.100',
  },
  [CARD_TYPES.KRMEMBERS]: {
    color: 'brand.500',
    bg: 'brand.50',
    hover: 'brand.100',
  },
  [CARD_TYPES.BARRIER]: {
    color: 'purple.500',
    bg: 'purple.50',
    hover: 'purple.100',
  },
}
