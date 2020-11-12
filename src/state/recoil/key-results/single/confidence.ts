import { atomFamily, selectorFamily } from 'recoil'

import { KeyResult } from 'components/KeyResult'
import { remoteKeyResults } from 'state/recoil/key-results/remote'

import { PREFIX } from './constants'

export const KEY = `${PREFIX}::CONFIDENCE`

export const selectRemoteKeyResultConfidenceBasedOnID = selectorFamily<
  KeyResult['confidence'] | undefined,
  KeyResult['id']
>({
  key: `${KEY}::BASED_ON_ID`,
  get: (id) => ({ get }) => get(remoteKeyResults)?.[id].confidence,
})

export const keyResultConfidence = atomFamily<KeyResult['confidence'] | undefined, KeyResult['id']>(
  {
    key: KEY,
    default: selectRemoteKeyResultConfidenceBasedOnID,
  },
)
