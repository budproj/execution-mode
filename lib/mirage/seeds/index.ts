import faker from 'faker'
import { Registry, Server } from 'miragejs'

import logger from 'lib/logger'
import Factories from 'lib/mirage/factories'
import Models from 'lib/mirage/models'
import { ProgressReport } from 'src/components/KeyResult/types'
import getConfig from 'src/config'

import { buildKeyResultView, buildProgressReport } from './builders'
import { pickRandomModel } from './selectors'

const { publicRuntimeConfig } = getConfig()

function seeds(server: Server<Registry<typeof Models, typeof Factories>>) {
  faker.seed(publicRuntimeConfig.mirage.fakerSeed)

  const policies = server.create('policy')
  const company = server.create('team', { isCompany: true })
  const rootTeam = server.create('team', { name: faker.random.word(), parentTeam: company })
  const teams = server.createList('team', 3, { parentTeam: rootTeam })
  rootTeam.update('teams', teams as any)
  const user = server.create('user', { teams, companies: [company] })
  const otherUsers = server.createList('user', 5, { teams } as any)
  const cycle = server.create('cycle', { team: company })
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

  const users = [user, ...otherUsers]
  company.update('users', users as any)
  rootTeam.update('users', users as any)
  rootTeam.update('objectives', [objectives[0]] as any)
  // eslint-disable-next-line array-callback-return
  teams.map((team) => {
    team.update('users', users as any)
    team.update('objectives', objectives as any)
  })
  company.update('latestReport', progressReports[0])

  keyResults.map((keyResult) => {
    const latestProgressReport = keyResult.progressReports.models[0] as ProgressReport

    return keyResult.update('currentProgress', latestProgressReport?.valueNew ?? 0)
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
      otherUsers,
    },
  })
}

export default seeds
