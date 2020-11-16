import { atomFamily, selectorFamily } from 'recoil'

import { KeyResult } from 'components/KeyResult'
import { remoteKeyResults } from 'state/recoil/key-results/remote'

import { PREFIX } from './constants'

export const KEY = `${PREFIX}::CYCLE`

export const selectRemoteKeyResultCycleBasedOnID = selectorFamily<
  KeyResult['cycle'] | undefined,
  KeyResult['id'] | undefined
>({
  key: `${KEY}::BASED_ON_ID`,
  get: (id) => ({ get }) => (id ? get(remoteKeyResults)?.[id].cycle : undefined),
})

export const keyResultCycle = atomFamily<KeyResult['cycle'] | undefined, KeyResult['id']>({
  key: KEY,
  default: selectRemoteKeyResultCycleBasedOnID,
})
