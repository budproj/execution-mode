import { atom } from 'recoil'

import { User } from 'src/components/User/types'

import { PREFIX } from '../constants'

export const CSVIndicatorsData = atom<User[]>({
  key: `${PREFIX}::CSV_INDICATOR_DATA`,
  default: [],
})
