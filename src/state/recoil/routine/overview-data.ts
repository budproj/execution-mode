import { atom } from 'recoil'

import { OverviewData } from 'src/components/Routine/RetrospectiveTab/RoutinesOverview'

import { PREFIX } from './constants'

export const overviewDataAtom = atom<OverviewData | undefined>({
  key: `${PREFIX}::OVERVIEW_DATA`,
  default: undefined,
})
