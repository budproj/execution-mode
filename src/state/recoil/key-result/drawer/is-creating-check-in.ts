import { atomFamily } from 'recoil'

import { KeyResult } from 'src/components/KeyResult/types'

import { PREFIX } from './constants'

const KEY = `${PREFIX}::IS_CREATING_CHECK_IN`

export const isCreatingCheckIn = atomFamily<boolean, KeyResult['id'] | undefined>({
  key: KEY,
  default: false,
})

export default isCreatingCheckIn
