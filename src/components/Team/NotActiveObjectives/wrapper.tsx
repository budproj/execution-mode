import { useQuery } from '@apollo/client'
import { Stack } from '@chakra-ui/layout'
import React, { useEffect } from 'react'
import { useSetRecoilState } from 'recoil'

import { useConnectionEdges } from '../../../state/hooks/useConnectionEdges/hook'
import { useCycleFilters } from '../../../state/hooks/useCycleFilters/hook'
import { useCycleObjectives } from '../../../state/hooks/useCycleObjectives/hook'
import { cycleAtomFamily } from '../../../state/recoil/cycle'
import { useRecoilFamilyLoader } from '../../../state/recoil/hooks'
import { objectiveAtomFamily } from '../../../state/recoil/objective'
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
import { TimeMachineController } from './time-machine-controller'

interface TeamNotActiveObjectivesProperties {
  teamID: string
}

export interface GetTeamNotActiveObjectivesQuery {
  team: {
    id: string
    name: string
    supportObjectives: GraphQLConnection<Objective>
  }
}

export const TeamNotActiveObjectives = ({ teamID }: TeamNotActiveObjectivesProperties) => {
  const setObjectivesViewMode = useSetRecoilState(teamObjectivesViewMode(teamID))
  const [loadObjectivesOnRecoil] = useRecoilFamilyLoader<Objective>(objectiveAtomFamily)
  const [loadCyclesOnRecoil] = useRecoilFamilyLoader<Objective>(cycleAtomFamily)

  const [objectiveEdges, setObjectiveEdges, _, isConnectionLoaded] = useConnectionEdges<Objective>()
  const [objectiveCycles, setCycleObjectives, cycleObjectives] = useCycleObjectives()

  const [
    filteredCycles,
    filters,
    { applyYearFilter, applyQuarterFilter, updateCycles, isLoaded, cycles },
  ] = useCycleFilters(teamID)

  const handleClose = () => {
    setObjectivesViewMode(ObjectivesViewMode.ACTIVE)
  }

  const filteredCycleIDs = new Set(filteredCycles.map((cycle) => cycle.id))
  const filteredObjectiveCycles = objectiveCycles.filter(([cycle]) =>
    filteredCycleIDs.has(cycle.id),
  )

  useQuery<GetTeamNotActiveObjectivesQuery>(queries.GET_TEAM_NOT_ACTIVE_OBJECTIVES, {
    variables: { teamID },
    onCompleted: (data) => {
      setObjectiveEdges(data.team.supportObjectives?.edges ?? [])
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
      <TimeMachineController
        filters={filters}
        cycles={cycles}
        onYearFilter={applyYearFilter}
        onQuarterFilter={applyQuarterFilter}
        onClose={handleClose}
      />

      {isLoaded ? (
        filteredObjectiveCycles.length === 0 ? (
          <TeamOKRsEmptyState />
        ) : (
          filteredObjectiveCycles.map(([cycle, objectiveIDs]) => (
            <ObjectivesFromCycle
              key={cycle.id}
              isDisabled
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
