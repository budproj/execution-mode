import { useQuery } from '@apollo/client'
import { Stack } from '@chakra-ui/layout'
import React, { useEffect, useState } from 'react'
import { atom, useRecoilState, useSetRecoilState } from 'recoil'

import { useConnectionEdges } from '../../../state/hooks/useConnectionEdges/hook'
import { useCycleObjectives } from '../../../state/hooks/useCycleObjectives/hook'
import { useRecoilFamilyLoader } from '../../../state/recoil/hooks'
import { isReloadNecessary, objectiveAtomFamily } from '../../../state/recoil/objective'
import { teamActiveObjectives } from '../../../state/recoil/team/active-objectives'
import {
  ObjectivesViewMode,
  teamObjectivesViewMode,
} from '../../../state/recoil/team/objectives-view-mode'
import { CycleObjectives } from '../../Cycle/Objectives/wrapper'
import { Objective } from '../../Objective/types'
import { GraphQLConnection, GraphQLConnectionPolicy, GraphQLEffect } from '../../types'
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
  const [objectivesPolicy, setObjectivesPolicy] = useState<GraphQLConnectionPolicy>()
  const [activeObjectives, setActiveObjectives] = useRecoilState(teamActiveObjectives(teamID))
  const [isUpdatedNeededOnObjectives, setIsUpdatedNeededOnObjectives] = useRecoilState(
    isReloadNecessary,
  )
  const [hasNotActiveObjectives, setHasNotActiveObjectives] = useState(false)
  const setObjectivesViewMode = useSetRecoilState(teamObjectivesViewMode(teamID))
  const [loadObjectivesOnRecoil] = useRecoilFamilyLoader<Objective>(objectiveAtomFamily)

  const [objectiveEdges, setObjectiveEdges, _, isRemoteDataLoaded] = useConnectionEdges<Objective>()
  const [cycles, setCycleObjectives, cycleObjectives, isLoaded] = useCycleObjectives()

  const { called, refetch } = useQuery<GetTeamActiveObjectivesQuery>(
    queries.GET_TEAM_ACTIVE_OBJECTIVES,
    {
      fetchPolicy: 'no-cache',
      variables: { teamID },
      notifyOnNetworkStatusChange: true,
      onCompleted: ({ team }) => {
        setObjectivesPolicy(team.activeObjectives.policy)
        setActiveObjectives(team.activeObjectives?.edges ?? [])
        setHasNotActiveObjectives(team.notActiveObjectives.edges.length > 0)
      },
    },
  )

  const handleViewOldCycles = () => {
    setObjectivesViewMode(ObjectivesViewMode.NOT_ACTIVE)
  }

  const handleRefetch = async () => {
    void refetch({ teamID })
  }

  useEffect(() => {
    if (called && activeObjectives) setObjectiveEdges(activeObjectives)
  }, [called, activeObjectives, setObjectiveEdges])

  useEffect(() => {
    if (isRemoteDataLoaded) setCycleObjectives(objectiveEdges)
  }, [objectiveEdges, setCycleObjectives, isRemoteDataLoaded])

  useEffect(() => {
    loadObjectivesOnRecoil(cycleObjectives)
  }, [cycleObjectives, loadObjectivesOnRecoil])

  useEffect(() => {
    if (isUpdatedNeededOnObjectives) {
      void refetch({ teamID })
      setIsUpdatedNeededOnObjectives(false)
    }
  }, [isUpdatedNeededOnObjectives])

  return (
    <Stack spacing={12} h="full">
      {isLoaded ? (
        cycles.length === 0 ? (
          <TeamOKRsEmptyState
            teamID={teamID}
            isAllowedToCreateObjectives={objectivesPolicy?.create === GraphQLEffect.ALLOW}
            onViewOldCycles={hasNotActiveObjectives ? handleViewOldCycles : undefined}
            onNewObjective={handleRefetch}
          />
        ) : (
          cycles.map(([cycle, objectiveIDs]) => (
            <CycleObjectives
              key={cycle.id}
              cycle={cycle}
              objectiveIDs={objectiveIDs}
              teamID={teamID}
            />
          ))
        )
      ) : (
        <TeamOKRsSkeleton />
      )}
    </Stack>
  )
}
