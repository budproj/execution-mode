import { atom } from 'recoil'

import { KeyResultView } from 'components/KeyResult/types'

import { PREFIX } from './constants'

const KEY = `${PREFIX}::RANK_ATOM`

const rankAtom = atom<KeyResultView['rank']>({
  key: KEY,
  default: [],
})

export default rankAtom
