import { atom } from 'recoil'

import { Team } from 'src/components/Team/types'

import { PREFIX } from './constants'

interface EditOrCreateTeamModalAtom {
  isEditingTeamId?: Team['id']
  isModalOpen: boolean
}

export const isEditTeamModalOpenAtom = atom<EditOrCreateTeamModalAtom>({
  key: `${PREFIX}::IS_EDIT_MODAL_OPEN`,
  default: {
    isEditingTeamId: undefined,
    isModalOpen: false,
  },
})
