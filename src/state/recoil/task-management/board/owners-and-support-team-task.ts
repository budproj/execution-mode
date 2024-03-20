import { atom } from 'recoil'

import { User } from 'src/components/User/types'

import { PREFIX } from './constants'

const KEY = `${PREFIX}::TASK_SUPPORT_TEAM`

export const ownersAndSupportTeamTaskAtom = atom<User[]>({
  key: KEY,
  default: [],
})
