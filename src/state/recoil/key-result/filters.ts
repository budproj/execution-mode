import { atomFamily } from 'recoil'

import { Cycle } from 'src/components/Cycle/types'

import { PREFIX } from './constants'

export enum KEY_RESULT_FILTER_TYPE {
  NOT_ACTIVE_AND_OWNED_BY_USER = 'NOT_ACTIVE_AND_OWNED_BY_USER',
}

export type KeyResultNotActiveAndOwnedByUserFilter = {
  yearCycleIDs: Array<Cycle['id']>
  quarterCycleIDs: Array<Cycle['id']>
}

const filtersAtomFamily = atomFamily<any, KEY_RESULT_FILTER_TYPE>({
  key: `${PREFIX}::FILTER`,
  default: undefined,
})

export default filtersAtomFamily
