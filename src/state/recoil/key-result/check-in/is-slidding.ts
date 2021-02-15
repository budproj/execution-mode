import { atomFamily } from 'recoil'

import { KeyResult } from 'src/components/KeyResult/types'

import { PREFIX } from './constants'

const KEY = `${PREFIX}::IS_SLIDDING`

const isSlidding = atomFamily<boolean, KeyResult['id'] | undefined>({
  key: KEY,
  default: false,
})

export default isSlidding
