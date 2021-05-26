import { useQuery } from '@apollo/client'
import { Stack } from '@chakra-ui/layout'
import uniq from 'lodash/uniq'
import React, { useEffect } from 'react'

import { useConnectionEdges } from '../../../state/hooks/useConnectionEdges/hook'
import { useRecoilFamilyLoader } from '../../../state/recoil/hooks'
import { objectiveAtomFamily } from '../../../state/recoil/objective'
import { Cycle } from '../../Cycle/types'
import { ObjectivesFromCycle } from '../../Objective/FromCycle/wrapper'
import { Objective } from '../../Objective/types'
import { Team } from '../types'

import queries from './queries.gql'
import { TeamActiveObjectivesSkeleton } from './skeleton'

export interface TeamActiveObjectivesProperties {
  teamID: string
}

export interface GetTeamActiveObjectivesQuery {
  team: Partial<Team>
}

const groupObjectivesByCycle = (
  objectives?: Objective[],
): Array<[Cycle, Objective[]]> | undefined => {
  if (!objectives) return

  const objectivesCyclePairs: Array<[Cycle, Objective]> = objectives.map((objective) => [
    objective.cycle,
    objective,
  ])
  const cycles = uniq(objectivesCyclePairs.map(([cycle]) => cycle))

  return cycles.map((cycle) => [
    cycle,
    objectives.filter((objective) => objective.cycle.id === cycle.id),
  ])
}

export const TeamActiveObjectives = ({ teamID }: TeamActiveObjectivesProperties) => {
  const loadObjectivesOnRecoil = useRecoilFamilyLoader<Objective>(objectiveAtomFamily)
  const { data, loading, called } = useQuery<GetTeamActiveObjectivesQuery>(
    queries.GET_TEAM_ACTIVE_OBJECTIVES,
    {
      variables: { teamID },
    },
  )
  const [objectives, setObjectiveEdges] = useConnectionEdges<Objective>()

  const groupedObjectivesByCycle = groupObjectivesByCycle(objectives)
  const isLoaded = called && !loading && groupedObjectivesByCycle

  useEffect(() => {
    if (data) setObjectiveEdges(data?.team.objectives?.edges)
  }, [data, setObjectiveEdges])

  useEffect(() => {
    if (objectives) loadObjectivesOnRecoil(objectives)
  }, [objectives, loadObjectivesOnRecoil])

  return (
    <Stack spacing={12}>
      {isLoaded && groupedObjectivesByCycle ? (
        groupedObjectivesByCycle.map(([cycle, objectives]) => (
          <ObjectivesFromCycle key={cycle.id} cycle={cycle} objectives={objectives} />
        ))
      ) : (
        <TeamActiveObjectivesSkeleton />
      )}
    </Stack>
  )
}
