import { KeyResult } from 'src/components/KeyResult/types'

import buildPartialSelector from './build-partial-selector'

export const selectCurrentConfidence = buildPartialSelector<KeyResult['currentConfidence']>(
  'currentConfidence',
)

export default selectCurrentConfidence
