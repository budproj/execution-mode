import { atom } from 'recoil'

import { CustomSorting } from 'components/User'

export const KEY = 'ATOMS::USER::CUSTOM_SORTING::KEY_RESULTS'

export default atom<CustomSorting['keyResults']>({
  key: KEY,
  default: [],
})
