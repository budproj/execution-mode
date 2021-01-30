import faker from 'faker'
import { Registry, Server } from 'miragejs'

import logger from 'lib/logger'
import Factories from 'lib/mirage/factories'
import Models from 'lib/mirage/models'
import getConfig from 'src/config'

import { buildKeyResultCustomList, buildKeyResultCheckIn } from './builders'
import { pickRandomModel } from './selectors'

const { publicRuntimeConfig } = getConfig()

function seeds(server: Server<Registry<typeof Models, typeof Factories>>) {
  faker.seed(publicRuntimeConfig.mirage.fakerSeed)

  const policies = server.create('policy')
  const company = server.create('team', {
    isCompany: true,
    onlyCompanies: true,
    onlyCompaniesAndDepartments: true,
  })
  const rootTeam = server.create('team', {
    name: faker.random.word(),
    parentTeam: company,
    onlyCompaniesAndDepartments: true,
  })
  const teams = server.createList('team', 3, { parentTeam: rootTeam })
  rootTeam.update('teams', teams as any)
  const user = server.create('user', { teams, companies: [company] })
  const otherUsers = server.createList('user', 5, { teams } as any)
  const cycle = server.create('cycle', { team: company })
  const companyObjectives = server.createList('objective', 3, { cycle })
  const objectives = server.createList('objective', 3, { cycle })
  const keyResults = server.createList('keyResult', 10, {
    policies,
    owner: user,
    objective: () => pickRandomModel(objectives),
    team: () => pickRandomModel(teams),
  })
  const keyResultCustomList = server.create('keyResultCustomList', {
    user,
    ...buildKeyResultCustomList(keyResults),
  })
  const checkIns = server.createList('keyResultCheckIn', 40, {
    user,
    keyResult: () => pickRandomModel(keyResults),
    progress: buildKeyResultCheckIn,
  })

  const users = [user, ...otherUsers]
  company.update('users', users as any)
  company.update('objectives', companyObjectives as any)
  rootTeam.update('users', users as any)
  rootTeam.update('objectives', [objectives[0]] as any)

  // eslint-disable-next-line array-callback-return
  teams.map((team) => {
    team.update('users', users as any)
    team.update('objectives', objectives as any)
  })

  company.update('latestKeyResultCheckIn', checkIns[0] as any)

  // eslint-disable-next-line array-callback-return
  keyResults.map((keyResult) => {
    const latestKeyResultCheckIn = keyResult.checkIns.models[0] as any

    keyResult.update('currentProgress', latestKeyResultCheckIn?.progress ?? 0)
    keyResult.update('checkIns', keyResult.checkIns)
  })

  logger.debug('Inserted fake data on MirageJS server', {
    data: {
      company,
      companyObjectives,
      rootTeam,
      teams,
      user,
      cycle,
      objectives,
      keyResults,
      keyResultCustomList,
      checkIns,
      policies,
      otherUsers,
    },
  })
}

export default seeds
