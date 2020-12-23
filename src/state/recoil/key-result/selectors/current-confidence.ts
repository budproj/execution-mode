import { KeyResult } from 'src/components/KeyResult/types'
import { buildPartialSelector } from 'src/state/recoil/key-result/selectors'

export const selectCurrentConfidence = buildPartialSelector<KeyResult['currentConfidence']>(
  'currentConfidence',
)

export default selectCurrentConfidence
