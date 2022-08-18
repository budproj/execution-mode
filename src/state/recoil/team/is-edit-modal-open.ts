import { atom } from 'recoil'

import { Team } from 'src/components/Team/types'

import { PREFIX } from './constants'

export const isEditTeamModalOpenAtom = atom<Team['id'] | undefined>({
  key: `${PREFIX}::IS_EDIT_MODAL_OPEN`,
  default: undefined,
})
