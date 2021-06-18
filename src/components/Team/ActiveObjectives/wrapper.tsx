import { useQuery } from '@apollo/client'
import { Stack } from '@chakra-ui/layout'
import uniqBy from 'lodash/uniqBy'
import React, { useEffect, useState } from 'react'
import { useRecoilState, useSetRecoilState } from 'recoil'

import { useConnectionEdges } from '../../../state/hooks/useConnectionEdges/hook'
import { useRecoilFamilyLoader } from '../../../state/recoil/hooks'
import { objectiveAtomFamily } from '../../../state/recoil/objective'
import { teamActiveObjectives } from '../../../state/recoil/team/active-objectives'
import {
  ObjectivesViewMode,
  teamObjectivesViewMode,
} from '../../../state/recoil/team/objectives-view-mode'
import { Cycle } from '../../Cycle/types'
import { ObjectivesFromCycle } from '../../Objective/FromCycle/wrapper'
import { Objective } from '../../Objective/types'
import { GraphQLConnection } from '../../types'

import { TeamActiveObjectivesEmptyState } from './empty-state'
import queries from './queries.gql'
import { TeamActiveObjectivesSkeleton } from './skeleton'

export interface TeamActiveObjectivesProperties {
  teamID: string
}

export interface GetTeamActiveObjectivesQuery {
  team: {
    id: string
    name: string
    activeObjectives: GraphQLConnection<Objective>
    notActiveObjectives: GraphQLConnection<Objective>
  }
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
  const [hasNotActiveObjectives, setHasNotActiveObjectives] = useState(false)
  const loadObjectivesOnRecoil = useRecoilFamilyLoader<Objective>(objectiveAtomFamily)
  const [activeObjectives, setActiveObjectives] = useRecoilState(teamActiveObjectives(teamID))
  const setObjectivesViewMode = useSetRecoilState(teamObjectivesViewMode(teamID))
  const [objectives, setObjectiveEdges, _, isLoaded] = useConnectionEdges<Objective>()
  const { called } = useQuery<GetTeamActiveObjectivesQuery>(queries.GET_TEAM_ACTIVE_OBJECTIVES, {
    fetchPolicy: 'no-cache',
    variables: { teamID },
    onCompleted: (data) => {
      setActiveObjectives(data.team.activeObjectives?.edges ?? [])
      setHasNotActiveObjectives(data.team.notActiveObjectives.edges.length > 0)
    },
  })

  const groupedObjectivesByCycle = groupObjectivesByCycle(objectives)

  const handleViewOldCycles = () => {
    setObjectivesViewMode(ObjectivesViewMode.NOT_ACTIVE)
  }

  useEffect(() => {
    if (called && activeObjectives) setObjectiveEdges(activeObjectives)
  }, [called, activeObjectives, setObjectiveEdges])

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
              onViewOldCycles={hasNotActiveObjectives ? handleViewOldCycles : undefined}
            />
          ))
        )
      ) : (
        <TeamActiveObjectivesSkeleton />
      )}
    </Stack>
  )
}
