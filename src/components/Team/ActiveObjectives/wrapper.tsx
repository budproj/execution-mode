import { useQuery } from '@apollo/client'
import { Stack } from '@chakra-ui/layout'
import uniqBy from 'lodash/uniqBy'
import React, { useEffect } from 'react'
import { useRecoilState } from 'recoil'

import { useConnectionEdges } from '../../../state/hooks/useConnectionEdges/hook'
import { useRecoilFamilyLoader } from '../../../state/recoil/hooks'
import { objectiveAtomFamily } from '../../../state/recoil/objective'
import { teamActiveObjectives } from '../../../state/recoil/team/active-objectives'
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
  const loadObjectivesOnRecoil = useRecoilFamilyLoader<Objective>(objectiveAtomFamily)
  const [activeObjectives, setActiveObjectives] = useRecoilState(teamActiveObjectives(teamID))
  const [objectives, setObjectiveEdges, _, isLoaded] = useConnectionEdges<Objective>()
  const { data } = useQuery<GetTeamActiveObjectivesQuery>(queries.GET_TEAM_ACTIVE_OBJECTIVES, {
    fetchPolicy: 'no-cache',
    variables: { teamID },
    onCompleted: (data) => {
      setActiveObjectives(data.team.objectives?.edges ?? [])
    },
  })

  const groupedObjectivesByCycle = groupObjectivesByCycle(objectives)

  useEffect(() => {
    if (activeObjectives) setObjectiveEdges(activeObjectives)
  }, [activeObjectives, setObjectiveEdges])

  useEffect(() => {
    if (objectives) loadObjectivesOnRecoil(objectives)
  }, [objectives, loadObjectivesOnRecoil])

  return (
    <Stack spacing={12} h="full">
      {isLoaded ? (
        groupedObjectivesByCycle.length === 0 ? (
          <TeamActiveObjectivesEmptyState />
        ) : (
          groupedObjectivesByCycle.map(([cycle, objectiveIDs]) => (
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
