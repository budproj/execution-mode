import { atom } from 'recoil'

import { PREFIX } from './constants'

const KEY = `${PREFIX}::TASK_SUPPORT_TEAM`

export const taskSupportTeamAtom = atom<any[]>({
  key: KEY,
  default: [],
})
