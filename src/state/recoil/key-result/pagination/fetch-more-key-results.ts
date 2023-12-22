import { atom } from 'recoil'

import { KeyResult } from 'src/components/KeyResult/types'

import { PREFIX } from '../constants'

const KEY = `${PREFIX}::FETCH_MORE_KEY_RESULTS`

const loadedKeyResults = atom<KeyResult[]>({
  key: KEY,
  default: [],
})

export default loadedKeyResults
