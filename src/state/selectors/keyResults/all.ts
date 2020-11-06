import { selector } from 'recoil'

import { KeyResultsHashmap } from 'components/KeyResult'
import { getFromAPI } from 'state/actions'

export const KEY = 'SELECTORS::KEY_RESULTS::ALL'

export default selector<KeyResultsHashmap>({
  key: KEY,
  get: async () => getFromAPI<KeyResultsHashmap>('/key-results', KEY),
})
