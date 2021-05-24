import { selectorFamily } from 'recoil'

import { Cycle } from 'src/components/Cycle/types'

import cycleAtomFamily from './atom-family'
import { PREFIX } from './constants'

const selectCyclesFromList = selectorFamily<
  Array<Partial<Cycle> | undefined>,
  Array<Cycle['id']> | undefined
>({
  key: `${PREFIX}::SELECT_FROM_LIST`,
  get:
    (cycleIDs) =>
    ({ get }) => {
      if (!cycleIDs) return []
      const cycles = cycleIDs.map((id) => get(cycleAtomFamily(id)))

      return cycles
    },
})

export default selectCyclesFromList
