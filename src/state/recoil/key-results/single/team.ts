import { atomFamily, selectorFamily } from 'recoil'

import { KeyResult } from 'components/KeyResult'
import { remoteKeyResults } from 'state/recoil/key-results/remote'

import { PREFIX } from './constants'

export const KEY = `${PREFIX}::TEAM`

export const selectRemoteKeyResultTeamBasedOnID = selectorFamily<
  KeyResult['team'] | undefined,
  KeyResult['id'] | undefined
>({
  key: `${KEY}::BASED_ON_ID`,
  get: (id) => ({ get }) => (id ? get(remoteKeyResults)?.[id].team : undefined),
})

export const keyResultTeam = atomFamily<KeyResult['team'] | undefined, KeyResult['id']>({
  key: KEY,
  default: selectRemoteKeyResultTeamBasedOnID,
})
