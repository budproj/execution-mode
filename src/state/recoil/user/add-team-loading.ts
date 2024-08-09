import { atom } from 'recoil'

import { PREFIX } from './constants'

export const isAddTeamLoadingAtom = atom({
  key: `${PREFIX}::IS_ADDING_TEAM`,
  default: false,
})
