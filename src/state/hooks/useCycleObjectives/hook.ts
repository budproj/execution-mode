import uniqBy from 'lodash/uniqBy'
import { useCallback, useMemo, useState } from 'react'

import { Cycle } from '../../../components/Cycle/types'
import { Objective, ObjectiveMode } from '../../../components/Objective/types'

type CycleObjectives = Array<[Cycle, string[]]>
type CycleObjectivesHook = [
  CycleObjectives,
  (newObjectives?: Objective[]) => void,
  Objective[],
  boolean,
]

const groupObjectivesByCycle = (objectives?: Objective[]): CycleObjectives => {
  if (!objectives) return []

  const cycles: Cycle[] = uniqBy(
    objectives.map((objective) => objective.cycle),
    'id',
  )

  return cycles.map((cycle) => [
    cycle,
    objectives
      .filter((objective) => objective.cycle.id === cycle.id)
      .sort((a, b) =>
        a.mode === ObjectiveMode.DRAFT ? -1 : b.mode === ObjectiveMode.DRAFT ? 1 : 0,
      )
      .map((objective) => objective.id),
  ])
}

export const useCycleObjectives = (initialObjectives?: Objective[]): CycleObjectivesHook => {
  const [objectives, setObjectives] = useState(initialObjectives ?? [])
  const [isLoaded, setIsLoaded] = useState(Boolean(initialObjectives))

  const cycles = useMemo(() => groupObjectivesByCycle(objectives), [objectives])

  const update = useCallback(
    (newObjectives: Objective[] = []) => {
      setObjectives(newObjectives)
      if (!isLoaded) setIsLoaded(true)
    },
    [isLoaded, setObjectives, setIsLoaded],
  )

  return [cycles, update, objectives, isLoaded]
}
