import { atomFamily, selectorFamily } from 'recoil'

import { KeyResult } from 'components/KeyResult'
import { remoteKeyResults } from 'state/recoil/key-results/remote'

import { PREFIX } from './constants'

export const KEY = `${PREFIX}::OWNER`

export const selectRemoteKeyResultOwnerBasedOnID = selectorFamily<
  KeyResult['owner'] | undefined,
  KeyResult['id'] | undefined
>({
  key: `${KEY}::BASED_ON_ID`,
  get: (id) => ({ get }) => (id ? get(remoteKeyResults)?.[id].owner : undefined),
})

export const keyResultOwner = atomFamily<KeyResult['owner'] | undefined, KeyResult['id']>({
  key: KEY,
  default: selectRemoteKeyResultOwnerBasedOnID,
})
