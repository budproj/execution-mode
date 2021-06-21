import { Dispatch, SetStateAction, useEffect, useState } from 'react'
import { Resetter, useRecoilState, useResetRecoilState } from 'recoil'

import { Cycle } from '../../../components/Cycle/types'
import { cycleFilters, FilteredCycles } from '../../recoil/cycle/filters'

type FilterHandler = (cycleIDs: string[]) => void

interface Actions {
  applyYearFilter: FilterHandler
  applyQuarterFilter: FilterHandler
  resetFilters: Resetter
  updateCycles: Dispatch<SetStateAction<Cycle[]>>
}

type CycleFiltersHook = [Cycle[], FilteredCycles, Actions]

const filterCycles = (cycles: Cycle[], filters: FilteredCycles): Cycle[] => {
  if (!cycles) return cycles

  const hasQuarterFilter = filters?.quarterCycleIDs && filters.quarterCycleIDs.length > 0
  const hasYearFilter = filters?.yearCycleIDs && filters.yearCycleIDs.length > 0
  const hasFilters = hasQuarterFilter || hasYearFilter
  if (!hasFilters) return cycles

  const quarterFilteredCycles =
    hasQuarterFilter && cycles.filter((cycle) => filters?.quarterCycleIDs.includes(cycle.id))
  if (quarterFilteredCycles) return quarterFilteredCycles

  return cycles.filter(
    (cycle) =>
      filters?.yearCycleIDs.includes(cycle.id) ||
      (cycle.parent && filters?.yearCycleIDs.includes(cycle.parent.id)),
  )
}

export const useCycleFilters = (id: string, initialCycles: Cycle[] = []): CycleFiltersHook => {
  const [cycles, updateCycles] = useState(initialCycles)
  const [filteredCycles, setFilteredCycles] = useState(initialCycles)

  const [filters, setFilters] = useRecoilState(cycleFilters(id))
  const resetFilters = useResetRecoilState(cycleFilters(id))

  const applyYearFilter = (yearCycleIDs: string[]) => {
    setFilters({
      yearCycleIDs,
      quarterCycleIDs: [],
    })
  }

  const applyQuarterFilter = (quarterCycleIDs: string[]) => {
    setFilters({
      quarterCycleIDs,
    } as FilteredCycles)
  }

  const actions: Actions = {
    applyYearFilter,
    applyQuarterFilter,
    resetFilters,
    updateCycles,
  }

  useEffect(() => {
    setFilteredCycles(filterCycles(cycles, filters))
  }, [cycles, filters, setFilteredCycles])

  return [filteredCycles, filters, actions]
}
