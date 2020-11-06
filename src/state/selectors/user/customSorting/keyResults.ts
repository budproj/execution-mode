import { GetRecoilValue, selector } from 'recoil'

import { CustomSorting } from 'components/User'
import logger from 'lib/logger'
import { getFromAPI } from 'state/actions'
import userCustomSortingAtom from 'state/atoms/user/customSorting/keyResults'
import userIDAtom from 'state/atoms/user/id'

export const KEY = 'SELECTORS::USER::CUSTOM_SORTING::KEY_RESULTS'

const fetchKeyResultsSortinFromAPI = async (
  get: GetRecoilValue,
): Promise<CustomSorting['keyResults']> => {
  const userID = get(userIDAtom)
  logger.debug(`Selected USER_ID: ${userID}`, { component: KEY })

  const response = await getFromAPI<CustomSorting['keyResults']>(
    `/users/${userID}/custom-sorting/key-results`,
    KEY,
  )

  return response
}

export default selector<CustomSorting['keyResults']>({
  key: KEY,
  get: async ({ get }): Promise<CustomSorting['keyResults']> =>
    get(userCustomSortingAtom).length > 0
      ? get(userCustomSortingAtom)
      : fetchKeyResultsSortinFromAPI(get),
})
