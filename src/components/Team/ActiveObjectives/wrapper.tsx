import { useQuery } from '@apollo/client'
import { Stack } from '@chakra-ui/layout'
import React, { useEffect, useState } from 'react'
import { useRecoilState, useSetRecoilState } from 'recoil'

import { useConnectionEdges } from '../../../state/hooks/useConnectionEdges/hook'
import { useCycleObjectives } from '../../../state/hooks/useCycleObjectives/hook'
import { useRecoilFamilyLoader } from '../../../state/recoil/hooks'
import { objectiveAtomFamily } from '../../../state/recoil/objective'
import { teamActiveObjectives } from '../../../state/recoil/team/active-objectives'
import {
  ObjectivesViewMode,
  teamObjectivesViewMode,
} from '../../../state/recoil/team/objectives-view-mode'
import { ObjectivesFromCycle } from '../../Objective/FromCycle/wrapper'
import { Objective } from '../../Objective/types'
import { GraphQLConnection } from '../../types'
import { TeamOKRsEmptyState } from '../OKRsEmptyState/wrapper'
import { TeamOKRsSkeleton } from '../OKRsSkeleton/wrapper'

import queries from './queries.gql'

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

export const TeamActiveObjectives = ({ teamID }: TeamActiveObjectivesProperties) => {
  const [activeObjectives, setActiveObjectives] = useRecoilState(teamActiveObjectives(teamID))
  const [hasNotActiveObjectives, setHasNotActiveObjectives] = useState(false)
  const setObjectivesViewMode = useSetRecoilState(teamObjectivesViewMode(teamID))
  const loadObjectivesOnRecoil = useRecoilFamilyLoader<Objective>(objectiveAtomFamily)

  const [objectiveEdges, setObjectiveEdges, _, isLoaded] = useConnectionEdges<Objective>()
  const [cycles, setCycleObjectives, cycleObjectives] = useCycleObjectives()

  const { called } = useQuery<GetTeamActiveObjectivesQuery>(queries.GET_TEAM_ACTIVE_OBJECTIVES, {
    fetchPolicy: 'no-cache',
    variables: { teamID },
    onCompleted: (data) => {
      setActiveObjectives(data.team.activeObjectives?.edges ?? [])
      setHasNotActiveObjectives(data.team.notActiveObjectives.edges.length > 0)
    },
  })

  const handleViewOldCycles = () => {
    setObjectivesViewMode(ObjectivesViewMode.NOT_ACTIVE)
  }

  useEffect(() => {
    if (called && activeObjectives) setObjectiveEdges(activeObjectives)
  }, [called, activeObjectives, setObjectiveEdges])

  useEffect(() => {
    if (objectiveEdges) setCycleObjectives(objectiveEdges)
  }, [objectiveEdges, setCycleObjectives])

  useEffect(() => {
    loadObjectivesOnRecoil(cycleObjectives)
  }, [cycleObjectives, loadObjectivesOnRecoil])

  return (
    <Stack spacing={12} h="full">
      {isLoaded ? (
        cycles.length === 0 ? (
          <TeamOKRsEmptyState />
        ) : (
          cycles.map(([cycle, objectiveIDs]) => (
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
        <TeamOKRsSkeleton />
      )}
    </Stack>
  )
}
