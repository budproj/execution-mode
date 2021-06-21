import deepmerge from 'deepmerge'
import { atomFamily, DefaultValue, selectorFamily } from 'recoil'

import { Cycle } from 'src/components/Cycle/types'

import { overwriteMerge } from '../../../../lib/deepmerge'
import { PREFIX } from '../key-result/constants'

export type FilteredCycles = {
  yearCycleIDs: Array<Cycle['id']>
  quarterCycleIDs: Array<Cycle['id']>
}

export const cycleAppliedFilters = atomFamily<FilteredCycles, string>({
  key: `${PREFIX}::APPLIED_FILTERS`,
  default: {
    yearCycleIDs: [],
    quarterCycleIDs: [],
  },
})

export const cycleFilters = selectorFamily<FilteredCycles, string>({
  key: `${PREFIX}::FILTERS`,
  get:
    (id) =>
    ({ get }) =>
      get(cycleAppliedFilters(id)),
  set:
    (id) =>
    ({ get, set }, newFilters) => {
      if (newFilters instanceof DefaultValue) return

      const atom = cycleAppliedFilters(id)
      const currentFilters = get(atom)

      const filters = deepmerge(currentFilters, newFilters, { arrayMerge: overwriteMerge })

      set(atom, filters)
    },
})
