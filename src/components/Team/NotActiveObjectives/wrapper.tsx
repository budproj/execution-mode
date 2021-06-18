import { useQuery } from '@apollo/client'
import { Stack } from '@chakra-ui/layout'
import React, { useEffect } from 'react'
import { useSetRecoilState } from 'recoil'

import { useConnectionEdges } from '../../../state/hooks/useConnectionEdges/hook'
import { useCycleObjectives } from '../../../state/hooks/useCycleObjectives/hook'
import { useRecoilFamilyLoader } from '../../../state/recoil/hooks'
import { objectiveAtomFamily } from '../../../state/recoil/objective'
import { teamObjectivesViewMode } from '../../../state/recoil/team/objectives-view-mode'
import { ObjectivesFromCycle } from '../../Objective/FromCycle/wrapper'
import { Objective } from '../../Objective/types'
import { GraphQLConnection } from '../../types'
import { TeamOKRsEmptyState } from '../OKRsEmptyState/wrapper'
import { TeamOKRsSkeleton } from '../OKRsSkeleton/wrapper'

import queries from './queries.gql'

interface TeamNotActiveObjectivesProperties {
  teamID: string
}

export interface GetTeamNotActiveObjectivesQuery {
  team: {
    id: string
    name: string
    objectives: GraphQLConnection<Objective>
  }
}

export const TeamNotActiveObjectives = ({ teamID }: TeamNotActiveObjectivesProperties) => {
  const setObjectivesViewMode = useSetRecoilState(teamObjectivesViewMode(teamID))
  const loadObjectivesOnRecoil = useRecoilFamilyLoader<Objective>(objectiveAtomFamily)

  const [objectiveEdges, setObjectiveEdges, _, isLoaded] = useConnectionEdges<Objective>()
  const [cycles, setCycleObjectives, cycleObjectives] = useCycleObjectives()

  useQuery<GetTeamNotActiveObjectivesQuery>(queries.GET_TEAM_NOT_ACTIVE_OBJECTIVES, {
    variables: { teamID },
    onCompleted: (data) => {
      setObjectiveEdges(data.team.objectives?.edges ?? [])
    },
  })

  useEffect(() => {
    if (objectiveEdges) setCycleObjectives(objectiveEdges)
  }, [objectiveEdges, setCycleObjectives])

  useEffect(() => {
    loadObjectivesOnRecoil(cycleObjectives)
  }, [cycleObjectives, loadObjectivesOnRecoil])

  console.log(cycles, 'tag')

  return (
    <Stack spacing={12} h="full">
      {isLoaded ? (
        cycles.length === 0 ? (
          <TeamOKRsEmptyState />
        ) : (
          cycles.map(([cycle, objectiveIDs]) => (
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
