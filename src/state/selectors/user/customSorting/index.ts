import { selector } from 'recoil'

import keyResultsSelector from './keyResults'

export const keyResults = keyResultsSelector

export default selector({
  key: 'USER::CUSTOM_SORTING',
  get: ({ get }) => {
    const keyResults = get(keyResultsSelector)

    return {
      keyResults,
    }
  },
})
