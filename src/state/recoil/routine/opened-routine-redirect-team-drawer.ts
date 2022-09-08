import { atom } from 'recoil'

import { PREFIX } from './constants'

const KEY = `${PREFIX}::OPENED_ROUTINE_REDIRECT_TEAM_DRAWER`

export const isOpenRoutineRedirectTeamPage = atom<boolean>({
  key: KEY,
  default: false,
})
