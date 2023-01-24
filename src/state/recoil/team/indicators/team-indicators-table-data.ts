import { atom } from 'recoil'

import { TeamIndicators } from 'src/components/Team/IndicatorsTable/types'

import { PREFIX } from '../constants'

export const teamIndicatorsTableData = atom<TeamIndicators[]>({
  key: `${PREFIX}::INDICATORS_TABLE_DATA`,
  default: [],
})
