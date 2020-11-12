import { atomFamily, selectorFamily } from 'recoil'

import { KeyResult } from 'components/KeyResult'
import { remoteKeyResults } from 'state/recoil/key-results/remote'

import { PREFIX } from './constants'

export const KEY = `${PREFIX}::OBJECTIVE`

export const selectRemoteKeyResultObjectiveBasedOnID = selectorFamily<
  KeyResult['objective'] | undefined,
  KeyResult['id']
>({
  key: `${KEY}::BASED_ON_ID`,
  get: (id) => ({ get }) => get(remoteKeyResults)?.[id].objective,
})

export const keyResultObjective = atomFamily<KeyResult['objective'] | undefined, KeyResult['id']>({
  key: KEY,
  default: selectRemoteKeyResultObjectiveBasedOnID,
})
