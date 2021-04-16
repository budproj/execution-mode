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

const parseObjectives = (rootTeam?: Partial<Team>) => {
  if (!rootTeam) return

  const rootTeamObjectives = rootTeam?.objectives?.edges?.map((edge) => edge.node) ?? []
  const childTeamsObjectives =
    rootTeam?.teams?.edges?.map((edge) => edge.node.objectives?.edges?.map((edge) => edge.node)) ??
    []
  const flattenedList = flatten([...rootTeamObjectives, ...childTeamsObjectives])
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

  const objectives = parseObjectives(data?.team)
  const isLoaded = Boolean(data?.team?.teams)

  useEffect(() => {
    if (!loading && data && objectives) loadObjectivesOnRecoil(objectives)
  }, [objectives, data, loading, loadObjectivesOnRecoil])

  return (
    <Flex gridGap={4} direction="column">
      {isLoaded ? (
        <>
          {hasObjectives(data?.team) && (
            <ObjectiveGroup
              groupTitle={data?.team.name}
              objectiveIDs={data?.team.objectives?.edges?.map((edge) => edge.node.id)}
            />
          )}

          {data?.team?.teams?.edges?.map(
            (edge) =>
              hasObjectives(edge.node) && (
                <ObjectiveGroup
                  key={edge.node.id ?? uniqueId()}
                  groupTitle={edge.node.name}
                  objectiveIDs={edge.node.objectives?.edges?.map((edge) => edge.node.id)}
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
