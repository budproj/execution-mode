import { atom } from 'recoil'

import { Cycle } from 'src/components/Cycle/types'

import { PREFIX } from './constants'

interface CyclesEditModalViewMode {
  isOpened: boolean
  cycleId: Cycle['id'] | undefined
}

export const cyclesEditModalViewMode = atom<CyclesEditModalViewMode>({
  key: `${PREFIX}::EDIT_MODAL_VIEW_MODE`,
  default: {
    isOpened: false,
    cycleId: '',
  },
})
