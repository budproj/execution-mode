import { atomFamily } from 'recoil'

import { KeyResult, ProgressReport } from 'src/components/KeyResult/types'

import { PREFIX } from './constants'
import currentProgress from './current-progress'

const KEY = `${PREFIX}::DRAFT_VALUE`

const draftValue = atomFamily<ProgressReport['valueNew'] | undefined, KeyResult['id'] | undefined>({
  key: KEY,
  default: (id) => currentProgress(id),
})

export default draftValue
