import { atom } from 'recoil'

import { PREFIX } from './constants'

export const isEditTeamModalOpenAtom = atom({
  key: `${PREFIX}::IS_EDIT_MODAL_OPEN`,
  default: false,
})
