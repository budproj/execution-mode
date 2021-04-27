import { atomFamily } from 'recoil'

import { KeyResult } from 'src/components/KeyResult/types'

import { PREFIX } from './constants'

const KEY = `${PREFIX}::INTL_DELETED_ENTRY_TYPE`

const intlDeletedEntryType = atomFamily<string | undefined, KeyResult['id'] | undefined>({
  key: KEY,
  default: undefined,
})

export default intlDeletedEntryType
