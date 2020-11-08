import DbCollection from 'miragejs/db-collection'

import { CompanyCycle, CompanyTeam } from 'components/Company'
import { KeyResult, KeyResultIcon, KeyResultsHashmap } from 'components/KeyResult'
import { Objective } from 'components/Objective'
import { User } from 'components/User'
import { MirageResponse } from 'lib/mirage/handlers'
import { reduceToAttrs } from 'lib/mirage/selectors'

const getAll = (schema: Record<string, DbCollection>): MirageResponse<KeyResultsHashmap> => {
  const dbModels = schema.keyResults.all().models
  const dbData = dbModels.reduce(reduceToAttrs, [])

  const buildKeyResult = (
    previous: Record<string, KeyResult>,
    next: Record<string, string | number>,
  ): KeyResult => {
    const team: CompanyTeam = schema.teams.find(next.teamId).attrs
    const cycle: CompanyCycle = schema.cycles.find(next.cycleId).attrs
    const icon: KeyResultIcon = schema.icons.find(next.iconId).attrs
    const objective: Objective = schema.objectives.find(next.objectiveId).attrs
    const owner: User = schema.users.find(next.ownerId).attrs

    return {
      ...previous,
      [next.id]: {
        id: next.id,
        title: next.title,
        confidence: next.confidence,
        progress: next.progress,
        team: {
          id: next.teamId,
          name: team.name,
        },
        cycle: {
          id: next.cycleId,
          start: cycle.start,
          end: cycle.end,
        },
        icon: {
          id: next.iconId,
          drawing: icon.drawing,
          backgroundColor: icon.backgroundColor,
        },
        objective: {
          id: next.objectiveId,
          title: objective.title,
        },
        owner: {
          id: next.ownerId,
          name: owner.name,
          role: owner.role,
        },
      },
    }
  }

  return {
    data: dbData.reduce(buildKeyResult, {}),
  }
}

export default getAll
