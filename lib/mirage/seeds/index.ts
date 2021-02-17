import faker from 'faker'
import orderBy from 'lodash/orderBy'
import { Registry, Server } from 'miragejs'

import logger from 'lib/logger'
import Factories from 'lib/mirage/factories'
import Models from 'lib/mirage/models'
import getConfig from 'src/config'

import { buildKeyResultCustomList, buildKeyResultCheckInValue } from './builders'
import { pickRandomModel } from './selectors'

const { publicRuntimeConfig } = getConfig()

function seeds(server: Server<Registry<typeof Models, typeof Factories>>) {
  faker.seed(publicRuntimeConfig.mirage.fakerSeed)

  const basePolicy = server.create('policy')
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
  company.update('teamsRanking', orderBy([rootTeam, ...teams], ['progress'], ['desc']) as any)

  const user = server.create('user', { teams, companies: [company] })
  const otherUsers = server.createList('user', 5, { teams } as any)
  const cycle = server.create('cycle', { team: company })
  const companyObjectives = server.createList('objective', 3, { cycle })
  const objectives = server.createList('objective', 3, { cycle })
  const keyResults = server.createList('keyResult', 10, {
    owner: user,
    objective: () => pickRandomModel(objectives),
    team: () => pickRandomModel(teams),
  })
  const keyResultCustomList = server.create('keyResultCustomList', {
    user,
    ...buildKeyResultCustomList(keyResults),
  })
  const keyResultCheckIns = server.createList('keyResultCheckIn', 40, {
    user,
    keyResult: () => pickRandomModel(keyResults),
    value: buildKeyResultCheckInValue,
    policies: basePolicy,
  })
  const keyResultComments = server.createList('keyResultComment', 100, {
    user,
    keyResult: () => pickRandomModel(keyResults),
    policies: basePolicy,
  })

  const users = [user, ...otherUsers]
  company.update('users', users as any)
  company.update('objectives', companyObjectives as any)
  rootTeam.update('users', users as any)
  rootTeam.update('objectives', [objectives[0]] as any)

  teams.map((team) => {
    team.update('users', users as any)
    team.update('objectives', objectives as any)

    return team
  })

  company.update('latestKeyResultCheckIn', keyResultCheckIns[0] as any)

  keyResults.map((keyResult) => {
    const latestKeyResultCheckIn = keyResult.keyResultCheckIns.models[0] as any
    const keyResultCheckIns = keyResult.keyResultCheckIns.models

    keyResultCheckIns.map((keyResultCheckIn, index) => {
      const parentIndex = index + 1

      if (parentIndex < keyResultCheckIns.length) {
        const parent = keyResultCheckIns[parentIndex]
        keyResultCheckIn.update('parent', parent)
      }

      return keyResultCheckIn
    })

    keyResult.update('latestKeyResultCheckIn', latestKeyResultCheckIn)
    keyResult.update('keyResultCheckIns', keyResult.keyResultCheckIns)

    return keyResult
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
      keyResultCheckIns,
      keyResultComments,
      otherUsers,
      basePolicy,
    },
  })
}

export default seeds
