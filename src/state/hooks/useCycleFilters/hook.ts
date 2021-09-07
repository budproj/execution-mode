import { uniqBy } from 'lodash'
import { useCallback, useState } from 'react'
import { Resetter, useRecoilState, useResetRecoilState } from 'recoil'

import { Cycle } from '../../../components/Cycle/types'
import { cycleAppliedFilters, cycleFilters, FilteredCycles } from '../../recoil/cycle/filters'

type FilterHandler = (cycleIDs: string[]) => void

interface Options {
  isLoaded: boolean
  applyYearFilter: FilterHandler
  applyQuarterFilter: FilterHandler
  resetFilters: Resetter
  updateCycles: (cycles?: Cycle[]) => void
  cycles: Cycle[]
}

type CycleFiltersHook = [Cycle[], FilteredCycles, Options]

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

export const useCycleFilters = (id: string, initialCycles?: Cycle[]): CycleFiltersHook => {
  const [cycles, setCycles] = useState(initialCycles ?? [])
  const [filteredCycles, setFilteredCycles] = useState(initialCycles ?? [])
  const [isLoaded, setIsLoaded] = useState(Boolean(initialCycles))

  const [filters, setFilters] = useRecoilState(cycleFilters(id))
  const resetFilters = useResetRecoilState(cycleAppliedFilters(id))

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

  const updateCycles = useCallback(
    (cycles: Cycle[] = []) => {
      const cyclesWithParent = cycles.filter((cycle) => Boolean(cycle.parent))
      const parents = cyclesWithParent.map((cycle) => cycle.parent) as Cycle[]
      const flattenedCycles = uniqBy([...cycles, ...parents], 'id')

      setCycles(flattenedCycles)
      setFilteredCycles(filterCycles(cycles, filters))
      if (!isLoaded) setIsLoaded(true)
    },
    [setCycles, filters, setFilteredCycles, isLoaded, setIsLoaded],
  )

  const options: Options = {
    isLoaded,
    applyYearFilter,
    applyQuarterFilter,
    resetFilters,
    updateCycles,
    cycles,
  }

  return [filteredCycles, filters, options]
}
