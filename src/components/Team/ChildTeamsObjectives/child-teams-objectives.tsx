import { useQuery } from '@apollo/client'
import { Flex } from '@chakra-ui/react'
import flatten from 'lodash/flatten'
import remove from 'lodash/remove'
import uniq from 'lodash/uniq'
import React, { useEffect } from 'react'

import ObjectiveGroup from 'src/components/Objective/Group'
import { Objective } from 'src/components/Objective/types'
import queries from 'src/components/Team/queries.gql'
import { Team } from 'src/components/Team/types'
import { useRecoilFamilyLoader } from 'src/state/recoil/hooks'
import { objectiveAtomFamily } from 'src/state/recoil/objective'

import ChildTeamsObjectivesSkeleton from './skeleton'

export interface ChildTeamsObjectivesProperties {
  rootTeamId: Team['id']
}

const parseObjectives = (rootTeam?: Team) => {
  if (!rootTeam || !rootTeam?.teams) return

  const reducedTeams = rootTeam.teams.map((team) => team.objectives)
  const flattenedList = flatten(reducedTeams)
  const uniqObjectives = uniq(flattenedList)
  const clearedObjectives = remove(uniqObjectives)

  return clearedObjectives
}

const ChildTeamsObjectives = ({ rootTeamId }: ChildTeamsObjectivesProperties) => {
  const loadObjectivesOnRecoil = useRecoilFamilyLoader<Partial<Objective | undefined>>(
    objectiveAtomFamily,
  )
  const { data, loading } = useQuery(queries.GET_CHILD_TEAMS_OBJECTIVES, {
    variables: { rootTeamId },
  })

  const objectives = parseObjectives(data?.team)
  const isLoaded = Boolean(data?.team?.teams)

  useEffect(() => {
    if (!loading && data && objectives) loadObjectivesOnRecoil(objectives)
  }, [objectives, data, loading, loadObjectivesOnRecoil])

  return (
    <Flex gridGap={4} direction="column">
      {isLoaded ? (
        data?.team?.teams.map((team: Team) => (
          <ObjectiveGroup
            key={team.id ?? Math.random()}
            groupTitle={team.name}
            objectiveIDs={team.objectives?.map((objective) => objective.id)}
          />
        ))
      ) : (
        <ChildTeamsObjectivesSkeleton />
      )}
    </Flex>
  )
}

export default ChildTeamsObjectives
