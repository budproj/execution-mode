import { atom } from 'recoil'

import { Team } from '../../../components/Team/types'

import { PREFIX } from './constants'
import { Myself } from './types'

export const myselfAtom = atom<Myself>({
  key: `${PREFIX}::MYSELF`,
  default: undefined,
})

/**
 * @deprecated TODO: replace with team tree(s)
 */
export default atom<Team[]>({
  key: `${PREFIX}::TEAMS`,
  default: [],
})
