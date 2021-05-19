import { useQuery } from '@apollo/client'
import { Stack } from '@chakra-ui/layout'
import uniq from 'lodash/uniq'
import React, { useEffect } from 'react'

import { useConnectionEdges } from '../../../state/hooks/useConnectionEdges/hook'
import { useRecoilFamilyLoader } from '../../../state/recoil/hooks'
import { objectiveAtomFamily } from '../../../state/recoil/objective'
import { Cycle } from '../../Cycle/types'
import { ObjectivesFromCycle } from '../../Objective/FromCycle/wrapper'
import { Objective } from '../../Objective/types'
import { Team } from '../types'

import queries from './queries.gql'

export interface TeamActiveObjectivesProperties {
  teamID: string
}

export interface GetTeamActiveObjectivesQuery {
  team: Partial<Team>
}

const groupObjectivesByCycle = (objectives: Objective[]): Array<[Cycle, Objective[]]> => {
  const objectivesCyclePairs: Array<[Cycle, Objective]> = objectives.map((objective) => [
    objective.cycle,
    objective,
  ])
  const cycles = uniq(objectivesCyclePairs.map(([cycle]) => cycle))

  return cycles.map((cycle) => [
    cycle,
    objectives.filter((objective) => objective.cycle.id === cycle.id),
  ])
}

export const TeamActiveObjectives = ({ teamID }: TeamActiveObjectivesProperties) => {
  const loadObjectivesOnRecoil = useRecoilFamilyLoader<Objective>(objectiveAtomFamily)
  const { data, loading } = useQuery<GetTeamActiveObjectivesQuery>(
    queries.GET_TEAM_ACTIVE_OBJECTIVES,
    {
      variables: { teamID },
    },
  )
  const [objectives, setObjectiveEdges] = useConnectionEdges<Objective>()

  const groupedObjectivesByCycle = groupObjectivesByCycle(objectives)

  useEffect(() => {
    if (data) setObjectiveEdges(data?.team.objectives?.edges)
  }, [data, setObjectiveEdges])

  useEffect(() => {
    if (objectives) loadObjectivesOnRecoil(objectives)
  }, [objectives, loadObjectivesOnRecoil])

  // Return (
  //   <Flex gridGap={4} direction="column">
  //     {isLoaded ? (
  //       <>
  //         {hasObjectives(data?.team) && (
  //           <ObjectiveGroup
  //             groupTitle={data?.team.name}
  //             objectiveIDs={teamObjectives.map((objective) => objective.id)}
  //           />
  //         )}
  //
  //         {childTeams?.map(
  //           (childTeam) =>
  //             hasObjectives(childTeam) && (
  //               <ObjectiveGroup
  //                 key={childTeam.id ?? uniqueId()}
  //                 groupTitle={childTeam.name}
  //                 objectiveIDs={childTeam.objectives?.edges.map((edge) => edge.node.id)}
  //               />
  //             ),
  //         )}
  //       </>
  //     ) : (
  //       <ChildTeamsObjectivesSkeleton />
  //     )}
  //   </Flex>
  // )
  return (
    <Stack>
      {groupedObjectivesByCycle.map(([cycle, objectives]) => (
        <ObjectivesFromCycle key={cycle.id} cycle={cycle} objectives={objectives} />
      ))}
    </Stack>
  )
}
