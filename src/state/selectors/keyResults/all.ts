import { selector } from 'recoil'

import { fetchFromAPI } from 'state/actions'

export const KEY = 'SELECTORS::KEY_RESULTS::ALL'

export default selector({
  key: KEY,
  get: async () => fetchFromAPI('/key-results', KEY),
})
