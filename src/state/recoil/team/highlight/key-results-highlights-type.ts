import { atom } from 'recoil'

import { CARD_TYPES } from 'src/components/Page/Team/Highlights/utils/card-types'

import { PREFIX } from '../constants'

export const keyResultsHighlightsType = atom<CARD_TYPES>({
  key: `${PREFIX}::KR_HIGHLIGHT_TYPE`,
  default: CARD_TYPES.CHECKIN,
})
