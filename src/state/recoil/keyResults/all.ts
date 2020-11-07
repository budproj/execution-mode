import { atom, selector } from 'recoil'

import { PREFIX } from './constants'

import { KeyResultsHashmap } from 'components/KeyResult'
import { getFromAPI } from 'state/actions/api'

export const KEY = `${PREFIX}::ALL`

export const selectAllRemoteKeyResults = selector<KeyResultsHashmap>({
  key: `${KEY}::REMOTE`,
  get: async () => getFromAPI<KeyResultsHashmap>('/key-results', KEY),
})

export const allKeyResults = atom<KeyResultsHashmap>({
  key: KEY,
  default: selectAllRemoteKeyResults,
})
