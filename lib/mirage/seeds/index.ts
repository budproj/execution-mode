import faker from 'faker'
import { Registry, Server } from 'miragejs'

import logger from 'lib/logger'
import Factories from 'lib/mirage/factories'
import Models from 'lib/mirage/models'
import getConfig from 'src/config'

import { buildKeyResultView, buildProgressReport } from './builders'
import { pickRandomModel } from './selectors'

const { publicRuntimeConfig } = getConfig()

function seeds(server: Server<Registry<typeof Models, typeof Factories>>) {
  faker.seed(publicRuntimeConfig.mirage.fakerSeed)

  const policies = server.create('policy')
  const company = server.create('company')
  const rootTeam = server.create('team')
  const teams = server.createList('team', 3, { company, parentTeam: rootTeam })
  rootTeam.update('teams', teams as any)
  const user = server.create('user', { teams })
  const cycle = server.create('cycle', { company })
  const objectives = server.createList('objective', 3, { cycle })
  const keyResults = server.createList('keyResult', 10, {
    policies,
    owner: user,
    objective: () => pickRandomModel(objectives),
    team: () => pickRandomModel(teams),
  })
  const keyResultView = server.create('keyResultView', {
    user,
    ...buildKeyResultView(keyResults),
  })
  const progressReports = server.createList('progressReport', 40, {
    user,
    keyResult: () => pickRandomModel(keyResults),
    valueNew: buildProgressReport,
    valuePrevious: buildProgressReport,
  })
  const confidenceReports = server.createList('confidenceReport', 40, {
    user,
    keyResult: () => pickRandomModel(keyResults),
  })

  logger.debug('Inserted fake data on MirageJS server', {
    data: {
      company,
      rootTeam,
      teams,
      user,
      cycle,
      objectives,
      keyResults,
      keyResultView,
      progressReports,
      confidenceReports,
      policies,
    },
  })
}

export default seeds
