import { atom, selector } from 'recoil'

import { PREFIX } from './constants'

import { CustomSorting } from 'components/User'
import { getFromAPI } from 'state/actions'
import { userID as userIDAtom } from 'state/recoil/users/current/id'

export const KEY = `${PREFIX}::KEY_RESULTS`

export const selectRemoteUserKeyResultsCustomSorting = selector<CustomSorting['keyResults']>({
  key: `${KEY}::REMOTE`,
  get: async ({ get }): Promise<CustomSorting['keyResults']> => {
    const userID = get(userIDAtom)
    const response = await getFromAPI<CustomSorting['keyResults']>(
      `/users/${userID}/custom-sorting/key-results`,
      KEY,
    )

    return response
  },
})

export const userKeyResultsCustomSorting = atom<CustomSorting['keyResults']>({
  key: KEY,
  default: selectRemoteUserKeyResultsCustomSorting,
})
