import DbCollection from 'miragejs/db-collection'

import { CompanyCycle, CompanyTeam } from 'components/Company'
import { KeyResult, KeyResultConfidence, KeyResultsHashmap } from 'components/KeyResult'
import { Objective } from 'components/Objective'
import { User } from 'components/User'
import { MirageResponse } from 'lib/mirage/handlers'
import { reduceToAttributes } from 'lib/mirage/selectors'

const getAll = (schema: Record<string, DbCollection>): MirageResponse<KeyResultsHashmap> => {
  const databaseModels = schema.keyResults.all().models
  const databaseData = databaseModels.reduce(reduceToAttributes, [])

  const buildKeyResult = (
    previous: Record<string, KeyResult>,
    next: Record<string, string | number>,
  ): KeyResult => {
    const team: CompanyTeam = schema.teams.find(next.teamId).attrs
    const cycle: CompanyCycle = schema.cycles.find(next.cycleId).attrs
    const objective: Objective = schema.objectives.find(next.objectiveId).attrs
    const confidence: KeyResultConfidence = schema.confidences.find(next.confidenceId).attrs
    const owner: User = schema.users.find(next.ownerId).attrs

    return {
      ...previous,
      [next.id]: {
        id: next.id,
        title: next.title,
        progress: next.progress,
        confidence: {
          id: next.confidenceId,
          value: confidence.value,
          user: confidence.userId,
          createdAt: confidence.createdAt,
        },
        team: {
          id: next.teamId,
          name: team.name,
        },
        cycle: {
          id: next.cycleId,
          start: cycle.start,
          end: cycle.end,
        },
        objective: {
          id: next.objectiveId,
          title: objective.title,
        },
        owner: {
          id: next.ownerId,
          name: owner.name,
          role: owner.role,
          picture: owner.picture,
        },
      },
    }
  }

  return {
    data: databaseData.reduce(buildKeyResult, {}),
  }
}

export default getAll
