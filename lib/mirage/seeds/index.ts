import faker from 'faker'
import orderBy from 'lodash/orderBy'
import { Registry, Server } from 'miragejs'

import logger from 'lib/logger'
import Factories from 'lib/mirage/factories'
import Models from 'lib/mirage/models'
import { CADENCE } from 'src/components/Cycle/constants'
import getConfig from 'src/config'

import { buildKeyResultCheckInValue } from './builders'
import { pickRandomModel } from './selectors'

const { publicRuntimeConfig } = getConfig()

function seeds(server: Server<Registry<typeof Models, typeof Factories>>) {
  faker.seed(publicRuntimeConfig.mirage.fakerSeed)

  const basePolicy = server.create('policy')
  const statusList = server.createList('status', 10)
  const company = server.create('team', {
    isCompany: true,
    onlyCompanies: true,
    onlyCompaniesAndDepartments: true,
    status: pickRandomModel(statusList),
  })

  const rootTeam = server.create('team', {
    name: faker.random.word(),
    parent: company,
    onlyCompaniesAndDepartments: true,
    status: pickRandomModel(statusList),
  })

  const teams = server.createList('team', 3, {
    parent: rootTeam,
    status: pickRandomModel(statusList),
  })
  rootTeam.update('teams', teams as any)
  company.update('teamsRanking', orderBy([rootTeam, ...teams], ['progress'], ['desc']) as any)

  const user = server.create('user', { teams, companies: [company] })
  const otherUsers = server.createList('user', 5, { teams } as any)

  const companyCycle = server.create('cycle', {
    title: '2021',
    team: company,
    status: pickRandomModel(statusList),
    active: true,
    cadence: CADENCE.YEARLY,
  })

  const cycle = server.create('cycle', {
    title: 'Q1',
    team: company,
    status: pickRandomModel(statusList),
    active: true,
    cadence: CADENCE.QUARTERLY,
    parent: companyCycle,
  })

  const cycles = {
    [CADENCE.YEARLY]: companyCycle,
    [CADENCE.QUARTERLY]: cycle,
  }

  const companyObjectives = server.createList('objective', 3, {
    cycle: companyCycle,
    status: pickRandomModel(statusList),
  })
  const objectives = server.createList('objective', 3, {
    cycle,
    status: pickRandomModel(statusList),
  })
  const keyResults = server.createList('keyResult', 10, {
    owner: user,
    objective: () => pickRandomModel(objectives),
    team: () => pickRandomModel(teams),
  })
  const keyResultCheckIns = server.createList('keyResultCheckIn', 40, {
    user,
    keyResult: () => pickRandomModel(keyResults),
    value: buildKeyResultCheckInValue,
    valueIncrease: buildKeyResultCheckInValue,
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
    const objective = keyResult.objective as any
    const cycle = cycles[objective.cycle.cadence as CADENCE]

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

    const previousCycleKeyResultIds = (cycle.attrs.keyResultIds as any[]) ?? []
    const previousCycleKeyResults = previousCycleKeyResultIds.map(
      (keyResultId: any) => keyResults[keyResultId - 1],
    )
    const newCycleKeyResults = [...previousCycleKeyResults, keyResult]

    cycle.update('keyResults', newCycleKeyResults as any)
    console.log(newCycleKeyResults, 'tag')

    return keyResult
  })

  logger.debug('Inserted fake data on MirageJS server', {
    data: {
      company,
      companyObjectives,
      rootTeam,
      teams,
      user,
      cycles,
      objectives,
      keyResults,
      keyResultCheckIns,
      keyResultComments,
      otherUsers,
      basePolicy,
      statusList,
    },
  })
}

export default seeds
