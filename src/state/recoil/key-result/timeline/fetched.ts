import { atomFamily } from 'recoil'

import { KeyResult } from 'src/components/KeyResult/types'

import { PREFIX } from './constants'

const KEY = `${PREFIX}::FETCHED`

const keyResultTimelineFetched = atomFamily<boolean, KeyResult['id'] | undefined>({
  key: KEY,
  default: false,
})

export default keyResultTimelineFetched
