import { useQuery } from '@apollo/client'
import { Stack } from '@chakra-ui/layout'
import uniqBy from 'lodash/uniqBy'
import React, { useEffect, useState } from 'react'

import { useConnectionEdges } from '../../../state/hooks/useConnectionEdges/hook'
import { useRecoilFamilyLoader } from '../../../state/recoil/hooks'
import { objectiveAtomFamily } from '../../../state/recoil/objective'
import { Cycle } from '../../Cycle/types'
import { ObjectivesFromCycle } from '../../Objective/FromCycle/wrapper'
import { Objective } from '../../Objective/types'
import { Team } from '../types'

import { TeamActiveObjectivesEmptyState } from './empty-state'
import queries from './queries.gql'
import { TeamActiveObjectivesSkeleton } from './skeleton'

export interface TeamActiveObjectivesProperties {
  teamID: string
}

export interface GetTeamActiveObjectivesQuery {
  team: Partial<Team>
}

const groupObjectivesByCycle = (objectives?: Objective[]): Array<[Cycle, string[]]> => {
  if (!objectives) return []

  const cycles: Cycle[] = uniqBy(
    objectives.map((objective) => objective.cycle),
    'id',
  )

  return cycles.map((cycle) => [
    cycle,
    objectives
      .filter((objective) => objective.cycle.id === cycle.id)
      .map((objective) => objective.id),
  ])
}

export const TeamActiveObjectives = ({ teamID }: TeamActiveObjectivesProperties) => {
  const [cycleObjectives, setCycleObjectives] = useState<Array<[Cycle, string[]]>>([])
  const loadObjectivesOnRecoil = useRecoilFamilyLoader<Objective>(objectiveAtomFamily)
  const { data, loading, called } = useQuery<GetTeamActiveObjectivesQuery>(
    queries.GET_TEAM_ACTIVE_OBJECTIVES,
    {
      fetchPolicy: 'no-cache',
      variables: { teamID },
    },
  )
  const [objectives, setObjectiveEdges] = useConnectionEdges<Objective>()

  const isLoaded = called && !loading
  const syncedWithLocalState = data?.team.objectives?.edges.length === objectives.length

  useEffect(() => {
    if (data) setObjectiveEdges(data?.team.objectives?.edges)
  }, [data, setObjectiveEdges])

  useEffect(() => {
    if (objectives) {
      loadObjectivesOnRecoil(objectives)
    }
  }, [objectives, loadObjectivesOnRecoil])

  useEffect(() => {
    if (objectives) {
      const groupedObjectivesByCycle = groupObjectivesByCycle(objectives)

      setCycleObjectives(groupedObjectivesByCycle)
    }
  }, [objectives, setCycleObjectives])

  return (
    <Stack spacing={12} h="full">
      {isLoaded ? (
        syncedWithLocalState && isLoaded && cycleObjectives.length === 0 ? (
          <TeamActiveObjectivesEmptyState />
        ) : (
          cycleObjectives.map(([cycle, objectiveIDs]) => (
            <ObjectivesFromCycle
              key={cycle.id}
              cycle={cycle}
              objectiveIDs={objectiveIDs}
              teamID={teamID}
            />
          ))
        )
      ) : (
        <TeamActiveObjectivesSkeleton />
      )}
    </Stack>
  )
}
