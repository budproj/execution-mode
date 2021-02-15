import { atomFamily } from 'recoil'

import { KeyResult, KeyResultCheckIn } from 'src/components/KeyResult/types'

import { PREFIX } from './constants'
import selectLatestCheckInValue from './latest-value'

const KEY = `${PREFIX}::PROGRESS_DRAFT`

const progressDraft = atomFamily<
  KeyResultCheckIn['value'] | undefined,
  KeyResult['id'] | undefined
>({
  key: KEY,
  default: selectLatestCheckInValue,
})

export default progressDraft
