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
  ).sort((a, b) => {
    if (a.cadence === 'YEARLY' && b.cadence !== 'YEARLY') {
      return -1 // A comes first
    }

    if (a.cadence !== 'YEARLY' && b.cadence === 'YEARLY') {
      return 1 // B comes first
    }

    return 0 // Maintain current order
  })

  return cycles.map((cycle) => [
    cycle,
    objectives
      .filter((objective) => objective.cycle.id === cycle.id)
      .sort((a, b) => {
        if (a.mode === ObjectiveMode.DRAFT && b.mode === ObjectiveMode.DRAFT) {
          // Objetivos do draft mode em ordem crescente
          return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
        }

        if (a.mode === ObjectiveMode.DRAFT) {
          // Draft mode antes de published mode
          return -1
        }

        if (b.mode === ObjectiveMode.DRAFT) {
          // Draft mode antes de published mode

          return 1
        }

        // Objetivos do published mode em ordem decrescente
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      })
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
