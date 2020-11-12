import { atomFamily, selectorFamily } from 'recoil'

import { KeyResult } from 'components/KeyResult'
import { remoteKeyResults } from 'state/recoil/key-results/remote'

import { PREFIX } from './constants'

export const KEY = `${PREFIX}::PROGRESS`

export const selectRemoteKeyResultProgressBasedOnID = selectorFamily<
  KeyResult['progress'] | undefined,
  KeyResult['id']
>({
  key: `${KEY}::BASED_ON_ID`,
  get: (id) => ({ get }) => get(remoteKeyResults)?.[id].progress,
})

export const keyResultProgress = atomFamily<KeyResult['progress'] | undefined, KeyResult['id']>({
  key: KEY,
  default: selectRemoteKeyResultProgressBasedOnID,
})
