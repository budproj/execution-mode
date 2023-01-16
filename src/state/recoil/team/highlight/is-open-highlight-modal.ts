import { atom } from 'recoil'

import { CARD_TYPES } from 'src/components/Page/Team/Highlights/utils/card-types'

import { PREFIX } from '../constants'

type configHighlightModalProperties = {
  type: CARD_TYPES | undefined
  isOpen: boolean
  usersIds?: string[]
}

export const configHighlightModal = atom<configHighlightModalProperties>({
  key: `${PREFIX}::CONFIG_HIGHLIGHT_MODAL`,
  default: {
    type: undefined,
    isOpen: false,
    usersIds: [],
  },
})
