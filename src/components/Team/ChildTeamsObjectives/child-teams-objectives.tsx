import { useQuery } from '@apollo/client'
import { Flex } from '@chakra-ui/react'
import flatten from 'lodash/flatten'
import remove from 'lodash/remove'
import uniq from 'lodash/uniq'
import uniqueId from 'lodash/uniqueId'
import React, { useEffect } from 'react'

import ObjectiveGroup from 'src/components/Objective/Group'
import { Objective } from 'src/components/Objective/types'
import { Team } from 'src/components/Team/types'
import { GraphQLEdge } from 'src/components/types'
import { useConnectionEdges } from 'src/state/hooks/useConnectionEdges/hook'
import { useRecoilFamilyLoader } from 'src/state/recoil/hooks'
import { objectiveAtomFamily } from 'src/state/recoil/objective'

import queries from './queries.gql'
import ChildTeamsObjectivesSkeleton from './skeleton'

export interface ChildTeamsObjectivesProperties {
  rootTeamId: Team['id']
}

export interface GetTeamAndChildTeamsObjectivesQuery {
  team: Partial<Team>
}

const hasObjectives = (team?: Partial<Team>) =>
  team?.objectives && team.objectives.edges.length > 0 && true

const mergeObjectives = (rootObjectives: Objective[], childObjectives: Objective[]) => {
  if (!rootObjectives && !childObjectives) return

  const flattenedList = flatten([...rootObjectives, ...childObjectives])
  const uniqObjectives = uniq(flattenedList)
  const clearedObjectives = remove(uniqObjectives)

  return clearedObjectives
}

const ChildTeamsObjectives = ({ rootTeamId }: ChildTeamsObjectivesProperties) => {
  const loadObjectivesOnRecoil = useRecoilFamilyLoader<Objective>(objectiveAtomFamily)
  const { data, loading } = useQuery<GetTeamAndChildTeamsObjectivesQuery>(
    queries.GET_TEAM_AND_CHILD_TEAMS_OBJECTIVES,
    {
      variables: { rootTeamId },
    },
  )
  const [teamObjectives, setTeamObjectiveEdges] = useConnectionEdges<Objective>()
  const [childTeams, setChildTeamEdges] = useConnectionEdges<Team>()
  const [childTeamObjectives, setChildTeamObjectiveEdges] = useConnectionEdges<Objective>()

  const objectives = mergeObjectives(teamObjectives, childTeamObjectives)
  const isLoaded = Boolean(data?.team?.teams)

  useEffect(() => {
    if (!loading && data && objectives) loadObjectivesOnRecoil(objectives)
  }, [objectives, data, loading, loadObjectivesOnRecoil])

  useEffect(() => {
    if (data) {
      const { team } = data
      const { teams } = team

      const rawRootObjectives = team.objectives?.edges
      const rawChildObjectives = teams?.edges.map((edge) => edge.node.objectives?.edges)
      const flattenedChildObjectives = flatten(rawChildObjectives)
      const nonUndefinedChildObjectives = remove<GraphQLEdge<Objective>>(
        flattenedChildObjectives as any,
      )

      setTeamObjectiveEdges(rawRootObjectives)
      setChildTeamEdges(teams?.edges)
      setChildTeamObjectiveEdges(nonUndefinedChildObjectives)
    }
  }, [data, setTeamObjectiveEdges, setChildTeamEdges, setChildTeamObjectiveEdges])

  return (
    <Flex gridGap={4} direction="column">
      {isLoaded ? (
        <>
          {hasObjectives(data?.team) && (
            <ObjectiveGroup
              groupTitle={data?.team.name}
              objectiveIDs={teamObjectives.map((objective) => objective.id)}
            />
          )}

          {childTeams?.map(
            (childTeam) =>
              hasObjectives(childTeam) && (
                <ObjectiveGroup
                  key={childTeam.id ?? uniqueId()}
                  groupTitle={childTeam.name}
                  objectiveIDs={childTeam.objectives?.edges.map((edge) => edge.node.id)}
                />
              ),
          )}
        </>
      ) : (
        <ChildTeamsObjectivesSkeleton />
      )}
    </Flex>
  )
}

export default ChildTeamsObjectives
