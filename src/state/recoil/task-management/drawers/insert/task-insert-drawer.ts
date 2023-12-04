import { atom } from 'recoil'

import { PREFIX } from './constants'

const KEY = `${PREFIX}::TEAM_ID`

export const taskInsertDrawerTeamID = atom<string | undefined>({
  key: KEY,
  default: undefined,
})
