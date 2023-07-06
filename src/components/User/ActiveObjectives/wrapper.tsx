import { Stack } from '@chakra-ui/react'
import React, { useEffect } from 'react'
import { useRecoilState } from 'recoil'

import { OKRsEmptyState } from 'src/components/Objective/OKRsEmptyState/wrapper'
import { OKRsSkeleton } from 'src/components/Objective/OKRsSkeleton/wrapper'
import { EventType } from 'src/state/hooks/useEvent/event-type'
import { useEvent } from 'src/state/hooks/useEvent/hook'

import { useConnectionEdges } from '../../../state/hooks/useConnectionEdges/hook'
import { useCycleObjectives } from '../../../state/hooks/useCycleObjectives/hook'
import { useRecoilFamilyLoader } from '../../../state/recoil/hooks'
import { isReloadNecessary, objectiveAtomFamily } from '../../../state/recoil/objective'
import { userActiveObjectives } from '../../../state/recoil/user/active-objectives'
import CycleObjectives from '../../Cycle/Objectives/wrapper'
import { Objective } from '../../Objective/types'
import { useGetUserObjectives } from '../hooks/getUserObjectives'
import { User } from '../types'

export interface UserActiveObjectivesProperties {
  userID: User['id']
}

export interface GetUserActiveObjectivesQuery {
  me: User
}

export const UserActiveObjectives = ({ userID }: UserActiveObjectivesProperties) => {
  const [activeObjectives, setActiveObjectives] = useRecoilState(userActiveObjectives(userID))
  const [shouldUpdateObjectives, setShouldUpdateObjectives] = useRecoilState(isReloadNecessary)
  const [loadObjectivesOnRecoil] = useRecoilFamilyLoader<Objective>(objectiveAtomFamily)
  const { called, refetch } = useGetUserObjectives(
    { ownerId: userID },
    { setObjetives: setActiveObjectives },
  )
  const { dispatch: dispatchCreatedObjective } = useEvent(EventType.CREATED_OBJECTIVE)

  const [objectiveEdges, setObjectiveEdges, _, isRemoteDataLoaded] = useConnectionEdges<Objective>()
  const [cycles, setCycleObjectives, cycleObjectives, isLoaded] = useCycleObjectives()

  const handleRefetch = async () => {
    void refetch({
      // eslint-disable-next-line unicorn/no-null
      teamId: null,
      ownerId: userID,
      active: true,
    })

    dispatchCreatedObjective({ isPersonal: true, userId: userID })
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
          <OKRsEmptyState isPersonalObjective imageKey="empty-personal-okrs-tab" />
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
