import { KeyResult } from 'src/components/KeyResult/types'
import { buildPartialSelector } from 'src/state/recoil/key-result/selectors'

export const selectCurrentProgress = buildPartialSelector<KeyResult['currentProgress']>(
  'currentProgress',
)

export default selectCurrentProgress
