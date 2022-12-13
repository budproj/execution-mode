import { CARD_TYPES } from './card-types'

export interface KeyResultsHighlights {
  getTeamFlags: {
    outdatedLength: number
    lowLength: number
    noRelatedLength: number
    barrierLength: number
  }
  loading: boolean
  called: boolean
}

type HightlightCard = {
  type: CARD_TYPES
  quantity: number
}

export const parsedData = (data: KeyResultsHighlights['getTeamFlags']) => {
  const parsedHightlight: HightlightCard[] = []

  for (const item of Object.keys(data)) {
    if (item === 'outdatedLength') {
      parsedHightlight.push({
        type: CARD_TYPES.CHECKIN,
        quantity: data.outdatedLength,
      })
    }

    if (item === 'lowLength') {
      parsedHightlight.push({
        type: CARD_TYPES.CONFIDENCE,
        quantity: data.lowLength,
      })
    }

    if (item === 'noRelatedLength') {
      parsedHightlight.push({
        type: CARD_TYPES.KRMEMBERS,
        quantity: data.noRelatedLength,
      })
    }

    if (item === 'barrierLength') {
      parsedHightlight.push({
        type: CARD_TYPES.BARRIER,
        quantity: data.barrierLength,
      })
    }
  }

  return parsedHightlight
}
