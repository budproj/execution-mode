import { Stack } from '@chakra-ui/react'
import React, { useEffect } from 'react'
import { useRecoilState } from 'recoil'

import { OKRsEmptyState } from 'src/components/Objective/OKRsEmptyState/wrapper'
import { OKRsSkeleton } from 'src/components/Objective/OKRsSkeleton/wrapper'
import { useConnectionEdges } from 'src/state/hooks/useConnectionEdges/hook'

import { useCycleObjectives } from '../../../state/hooks/useCycleObjectives/hook'
import { useRecoilFamilyLoader } from '../../../state/recoil/hooks'
import { isReloadNecessary, objectiveAtomFamily } from '../../../state/recoil/objective'
import CycleObjectives from '../../Cycle/Objectives/wrapper'
import { Objective } from '../../Objective/types'
import { GraphQLConnection } from '../../types'
import { useGetTeamObjective } from '../hooks/getTeamActiveObjectives/get-team-objective-queries'

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
  const [shouldUpdateObjectives, setShouldUpdateObjectives] = useRecoilState(isReloadNecessary)
  const [loadObjectivesOnRecoil] = useRecoilFamilyLoader<Objective>(objectiveAtomFamily)
  const [objectiveEdges, setActiveObjectives, _, isRemoteDataLoaded] =
    useConnectionEdges<Objective>()
  const { data, refetch } = useGetTeamObjective(teamID)

  const [cycles, setCycleObjectives, cycleObjectives, isLoaded] = useCycleObjectives()

  useEffect(() => {
    setActiveObjectives(data?.team.activeObjectives?.edges ?? [])
  }, [data, setActiveObjectives])

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
          <OKRsEmptyState />
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
