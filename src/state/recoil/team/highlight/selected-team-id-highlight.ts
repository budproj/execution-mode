import { atom } from 'recoil'

import { Team } from 'src/components/Team/types'

import { PREFIX } from '../constants'

export const selectedTeamIdHighlight = atom<Team['id']>({
  key: `${PREFIX}::SELECTED_TEAM_ID_HIGHLIGHT`,
  default: '',
})
