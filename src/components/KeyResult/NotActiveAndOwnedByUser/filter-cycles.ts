import { Cycle } from 'src/components/Cycle/types'
import { KeyResultNotActiveAndOwnedByUserFilter } from 'src/state/recoil/key-result/filters'

const filterCycles = (cycles?: Cycle[], filters?: KeyResultNotActiveAndOwnedByUserFilter) => {
  if (!cycles) return cycles

  const hasQuarterFilter = filters?.quarterCycleIDs && filters.quarterCycleIDs.length > 0
  const hasYearFilter = filters?.yearCycleIDs && filters.yearCycleIDs.length > 0
  // eslint-disable-next-line @typescript-eslint/prefer-nullish-coalescing
  const hasFilters = hasQuarterFilter || hasYearFilter
  if (!hasFilters) return cycles

  const quarterFilteredCycles =
    hasQuarterFilter && cycles.filter((cycle) => filters?.quarterCycleIDs.includes(cycle.id))
  if (quarterFilteredCycles) return quarterFilteredCycles

  const yearFilteredCycles = cycles.filter(
    (cycle) =>
      filters?.yearCycleIDs.includes(cycle.id) ||
      (cycle.parent && filters?.yearCycleIDs.includes(cycle.parent.id)),
  )

  return yearFilteredCycles
}

export default filterCycles
