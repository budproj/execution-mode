import { useQuery } from '@apollo/client'
import { Stack } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { useRecoilState, useSetRecoilState } from 'recoil'

import { OKRsEmptyState } from 'src/components/Objective/OKRsEmptyState/wrapper'
import { OKRsSkeleton } from 'src/components/Objective/OKRsSkeleton/wrapper'

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
  const [shouldUpdateObjectives, setShouldUpdateObjectives] = useRecoilState(isReloadNecessary)
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
    if (shouldUpdateObjectives) {
      void refetch({ teamID })
      setShouldUpdateObjectives(false)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [shouldUpdateObjectives])

  return (
    <Stack spacing={12} h="full">
      {isLoaded ? (
        cycles.length === 0 ? (
          <OKRsEmptyState
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
        <OKRsSkeleton />
      )}
    </Stack>
  )
}
