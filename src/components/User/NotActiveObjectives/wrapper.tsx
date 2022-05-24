import { useQuery } from '@apollo/client'
import { Stack } from '@chakra-ui/react'
import React, { useEffect } from 'react'
import { useSetRecoilState } from 'recoil'

import { OKRsEmptyState } from 'src/components/Objective/OKRsEmptyState/wrapper'
import { OKRsSkeleton } from 'src/components/Objective/OKRsSkeleton/wrapper'

import { useConnectionEdges } from '../../../state/hooks/useConnectionEdges/hook'
import { useCycleFilters } from '../../../state/hooks/useCycleFilters/hook'
import { useCycleObjectives } from '../../../state/hooks/useCycleObjectives/hook'
import { cycleAtomFamily } from '../../../state/recoil/cycle'
import { useRecoilFamilyLoader } from '../../../state/recoil/hooks'
import { objectiveAtomFamily } from '../../../state/recoil/objective'
import {
  ObjectivesViewMode,
  userObjectivesViewMode,
} from '../../../state/recoil/user/objectives-view-mode'
import { CycleObjectives } from '../../Cycle/Objectives/wrapper'
import { Objective } from '../../Objective/types'
import queries from '../ActiveObjectives/queries.gql'
import { User } from '../types'

import { TimeMachineController } from './time-machine-controller'

interface UserNotActiveObjectivesProperties {
  userID: User['id']
}

export interface GetUserNotActiveObjectivesQuery {
  me: User
}

export const UserNotActiveObjectives = ({ userID }: UserNotActiveObjectivesProperties) => {
  const setObjectivesViewMode = useSetRecoilState(userObjectivesViewMode(userID))
  const [loadObjectivesOnRecoil] = useRecoilFamilyLoader<Objective>(objectiveAtomFamily)
  const [loadCyclesOnRecoil] = useRecoilFamilyLoader<Objective>(cycleAtomFamily)

  const [objectiveEdges, setObjectiveEdges, _, isConnectionLoaded] = useConnectionEdges<Objective>()
  const [objectiveCycles, setCycleObjectives, cycleObjectives] = useCycleObjectives()

  const [filteredCycles, __, { updateCycles, isLoaded, cycles }] = useCycleFilters(userID)

  const handleClose = () => {
    setObjectivesViewMode(ObjectivesViewMode.ACTIVE)
  }

  const filteredCycleIDs = new Set(filteredCycles.map((cycle) => cycle.id))
  const filteredObjectiveCycles = objectiveCycles.filter(([cycle]) =>
    filteredCycleIDs.has(cycle.id),
  )

  useQuery<GetUserNotActiveObjectivesQuery>(queries.GET_OBJECTIVES, {
    variables: {
      // eslint-disable-next-line unicorn/no-null
      teamId: null,
      ownerId: userID,
      active: false,
    },
    onCompleted: ({ me }) => {
      const userCompany = me?.companies?.edges[0]
      const objectives = userCompany?.node?.objectives?.edges ?? []
      setObjectiveEdges(objectives)
    },
  })

  useEffect(() => {
    if (objectiveEdges) setCycleObjectives(objectiveEdges)
  }, [objectiveEdges, setCycleObjectives])

  useEffect(() => {
    loadObjectivesOnRecoil(cycleObjectives)
  }, [cycleObjectives, loadObjectivesOnRecoil])

  useEffect(() => {
    if (isConnectionLoaded) updateCycles(objectiveCycles.map(([cycle]) => cycle))
  }, [objectiveCycles, isConnectionLoaded, updateCycles])

  useEffect(() => {
    loadCyclesOnRecoil(cycles)
  }, [cycles, loadCyclesOnRecoil])

  return (
    <Stack spacing={12} h="full">
      <TimeMachineController onClose={handleClose} />

      {isLoaded ? (
        filteredObjectiveCycles.length === 0 ? (
          <OKRsEmptyState isPersonalObjective imageKey="empty-personal-okrs-tab" />
        ) : (
          filteredObjectiveCycles.map(([cycle, objectiveIDs]) => (
            <CycleObjectives
              key={cycle.id}
              isDisabled
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
