import { selector } from 'recoil'

import keyResultSelector from './keyResult'

export const keyResult = keyResultSelector

export default selector({
  key: 'USER::CUSTOM_SORTING',
  get: ({ get }) => {
    const keyResult = get(keyResultSelector)

    return {
      keyResult,
    }
  },
})
