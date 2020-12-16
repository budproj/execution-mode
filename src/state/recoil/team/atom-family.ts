import { atomFamily } from 'recoil'

import { Team } from 'src/components/Team/types'

import { PREFIX } from './constants'

const KEY = `${PREFIX}::TEAM_ATOM_FAMILY`

export const teamAtomFamily = atomFamily<Team | undefined, Team['id'] | undefined>({
  key: KEY,
  default: undefined,
})

export default teamAtomFamily
