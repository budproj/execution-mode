import { atomFamily } from 'recoil'

import { KeyResult } from 'src/components/KeyResult/types'
import selectCurrentProgress from 'src/state/recoil/key-result/selectors/current-progress'

import { PREFIX } from './constants'

const KEY = `${PREFIX}::DRAFT_VALUE`

const draftValue = atomFamily<
  KeyResult['currentProgress'] | undefined,
  KeyResult['id'] | undefined
>({
  key: KEY,
  default: (id) => selectCurrentProgress(id),
})

export default draftValue
