import { useQuery } from '@apollo/client'
import flatten from 'lodash/flatten'
import remove from 'lodash/remove'
import uniq from 'lodash/uniq'
import React, { useEffect } from 'react'

import { Objective } from 'src/components/Objective/types'
import queries from 'src/components/Team/queries.gql'
import { Team } from 'src/components/Team/types'
import { useRecoilFamilyLoader } from 'src/state/recoil/hooks'
import { objectiveAtomFamily } from 'src/state/recoil/objective'

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

  useEffect(() => {
    if (!loading && data && objectives) loadObjectivesOnRecoil(objectives)
  }, [objectives, data, loading, loadObjectivesOnRecoil])

  return <p>Ok</p>
}

export default ChildTeamsObjectives
