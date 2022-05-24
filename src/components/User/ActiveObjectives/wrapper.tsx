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
import { userActiveObjectives } from '../../../state/recoil/user/active-objectives'
import {
  ObjectivesViewMode,
  userObjectivesViewMode,
} from '../../../state/recoil/user/objectives-view-mode'
import { CycleObjectives } from '../../Cycle/Objectives/wrapper'
import { Objective } from '../../Objective/types'
import { GraphQLConnectionPolicy, GraphQLEffect } from '../../types'
import { User } from '../types'

import queries from './queries.gql'

export interface UserActiveObjectivesProperties {
  userID: User['id']
}

export interface GetUserActiveObjectivesQuery {
  me: User
}

export const UserActiveObjectives = ({ userID }: UserActiveObjectivesProperties) => {
  const [objectivesPolicy, setObjectivesPolicy] = useState<GraphQLConnectionPolicy>()
  const [activeObjectives, setActiveObjectives] = useRecoilState(userActiveObjectives(userID))
  const [shouldUpdateObjectives, setShouldUpdateObjectives] = useRecoilState(isReloadNecessary)
  const [hasNotActiveObjectives] = useState(false)
  const setObjectivesViewMode = useSetRecoilState(userObjectivesViewMode(userID))
  const [loadObjectivesOnRecoil] = useRecoilFamilyLoader<Objective>(objectiveAtomFamily)

  const [objectiveEdges, setObjectiveEdges, _, isRemoteDataLoaded] = useConnectionEdges<Objective>()
  const [cycles, setCycleObjectives, cycleObjectives, isLoaded] = useCycleObjectives()

  const { called, refetch } = useQuery<GetUserActiveObjectivesQuery>(queries.GET_OBJECTIVES, {
    fetchPolicy: 'no-cache',
    variables: {
      // eslint-disable-next-line unicorn/no-null
      teamId: '0788abd6-4996-4224-8f24-094b2d3c0d3a',
      ownerId: userID,
      active: true,
    },
    notifyOnNetworkStatusChange: true,
    onCompleted: ({ me }) => {
      const userCompany = me?.companies?.edges[0]
      const objectives = userCompany?.node?.objectives?.edges ?? []
      setActiveObjectives(objectives)

      const objectivePolicy = userCompany?.node?.objectives?.policy
      if (objectivePolicy) {
        setObjectivesPolicy(objectivePolicy)
      }
    },
  })

  const handleViewOldCycles = () => {
    setObjectivesViewMode(ObjectivesViewMode.NOT_ACTIVE)
  }

  const handleRefetch = async () => {
    void refetch({
      // eslint-disable-next-line unicorn/no-null
      teamId: null,
      ownerId: userID,
      active: true,
    })
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
      handleRefetch()
      setShouldUpdateObjectives(false)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [shouldUpdateObjectives])

  return (
    <Stack spacing={12} h="full">
      {isLoaded ? (
        cycles.length === 0 ? (
          <OKRsEmptyState
            isPersonalObjective
            imageKey="empty-personal-okrs-tab"
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
              userID={userID}
            />
          ))
        )
      ) : (
        <OKRsSkeleton />
      )}
    </Stack>
  )
}
