import { atom } from 'recoil'

import { Team } from 'src/components/Team/types'

import { PREFIX } from './constants'

export const selectedDashboardTeamAtom = atom<Partial<Team> | undefined>({
  key: `${PREFIX}::SELECTED_DASBHOARD_TEAM`,
  default: undefined,
})
