import { atomFamily, selectorFamily } from 'recoil'

import { KeyResult } from 'components/KeyResult'
import { remoteKeyResults } from 'state/recoil/key-results/remote'

import { PREFIX } from './constants'

export const KEY = `${PREFIX}::TITLE`

export const selectRemoteKeyResultTitleBasedOnID = selectorFamily<
  KeyResult['title'] | undefined,
  KeyResult['id']
>({
  key: `${KEY}::BASED_ON_ID`,
  get: (id) => ({ get }) => get(remoteKeyResults)?.[id].title,
})

export const keyResultTitle = atomFamily<KeyResult['title'] | undefined, KeyResult['id']>({
  key: KEY,
  default: selectRemoteKeyResultTitleBasedOnID,
})
