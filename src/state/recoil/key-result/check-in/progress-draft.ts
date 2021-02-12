import { atomFamily } from 'recoil'

import { KeyResult } from 'src/components/KeyResult/types'
import selectCurrentProgress from 'src/state/recoil/key-result/current-progress'

import { PREFIX } from './constants'

const KEY = `${PREFIX}::PROGRESS_DRAFT`

const progressDraft = atomFamily<
  KeyResult['currentProgress'] | undefined,
  KeyResult['id'] | undefined
>({
  key: KEY,
  default: (id) => selectCurrentProgress(id),
})

export default progressDraft
