import { atom } from 'recoil'

import { PendingRoutine } from 'src/components/Routine/types'

import { PREFIX } from './constants'

export const pendingRoutinesAtom = atom<PendingRoutine[]>({
  key: `${PREFIX}::PENDING_ROUTINES`,
  default: [],
})
