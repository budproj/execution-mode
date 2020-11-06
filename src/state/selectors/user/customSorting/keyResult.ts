import { selector } from 'recoil'

import logger from 'lib/logger'
import { fetchFromAPI } from 'state/actions'
import userIDAtom from 'state/atoms/user/id'

export const KEY = 'SELECTORS::USER::CUSTOM_SORTING::KEY_RESULTS'

export default selector({
  key: KEY,
  get: async ({ get }) => {
    const userID = get(userIDAtom)
    logger.debug(`Selected USER_ID: ${userID}`, { component: KEY })

    const response = await fetchFromAPI(`/users/${userID}/custom-sorting/key-results`, KEY)

    return response
  },
})
