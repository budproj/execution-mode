import faker from 'faker'
import flatten from 'lodash/flatten'
import orderBy from 'lodash/orderBy'
import { Registry, Server } from 'miragejs'

import logger from 'lib/logger'
import Factories from 'lib/mirage/factories'
import Models from 'lib/mirage/models'
import { CADENCE } from 'src/components/Cycle/constants'
import getConfig from 'src/config'
import { AUTHZ_POLICY } from 'src/state/recoil/authz/policies/constants'

import { buildKeyResultCheckInValue } from './builders'
import { pickRandomModel } from './selectors'

const { publicRuntimeConfig } = getConfig()

function seeds(server: Server<Registry<typeof Models, typeof Factories>>) {
  faker.seed(publicRuntimeConfig.mirage.fakerSeed)

  const allowPolicy = server.create('policy')
  const denyPolicy = server.create('policy', {
    create: AUTHZ_POLICY.DENY,
    update: AUTHZ_POLICY.DENY,
    read: AUTHZ_POLICY.DENY,
    delete: AUTHZ_POLICY.DENY,
  } as any)

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

  const strategicCycle = server.create('cycle', {
    period: '2021',
    team: company,
    status: pickRandomModel(statusList),
    active: true,
    hasNotActiveChildren: false,
    cadence: CADENCE.YEARLY,
  })

  const tacticalCycle = server.create('cycle', {
    period: 'Q1',
    team: company,
    status: pickRandomModel(statusList),
    active: true,
    cadence: CADENCE.QUARTERLY,
    parent: strategicCycle,
  })

  const previousStrategicCycle = server.create('cycle', {
    period: '2020',
    team: company,
    status: pickRandomModel(statusList),
    active: false,
    hasNotActiveChildren: true,
    cadence: CADENCE.YEARLY,
  })

  const previousTacticalCycle1 = server.create('cycle', {
    period: 'Q3',
    team: company,
    status: pickRandomModel(statusList),
    active: false,
    cadence: CADENCE.QUARTERLY,
    parent: previousStrategicCycle,
  })

  const previousTacticalCycle2 = server.create('cycle', {
    period: 'Q4',
    team: company,
    status: pickRandomModel(statusList),
    active: false,
    cadence: CADENCE.QUARTERLY,
    parent: previousStrategicCycle,
  })

  const oldStrategicCycle = server.create('cycle', {
    period: '2019',
    team: company,
    status: pickRandomModel(statusList),
    active: false,
    hasNotActiveChildren: true,
    cadence: CADENCE.YEARLY,
  })

  const oldTacticalCycle = server.create('cycle', {
    period: 'Q4',
    team: company,
    status: pickRandomModel(statusList),
    active: false,
    cadence: CADENCE.QUARTERLY,
    parent: oldStrategicCycle,
  })

  const cycles = {
    active: {
      [CADENCE.YEARLY]: strategicCycle,
      [CADENCE.QUARTERLY]: tacticalCycle,
    },
    inactive: {
      previous: {
        [CADENCE.YEARLY]: previousStrategicCycle,
        [CADENCE.QUARTERLY]: [previousTacticalCycle1, previousTacticalCycle2],
      },
      old: {
        [CADENCE.YEARLY]: oldStrategicCycle,
        [CADENCE.QUARTERLY]: oldTacticalCycle,
      },
    },
  }

  const strategicObjectives = server.createList('objective', 3, {
    cycle: cycles.active.YEARLY,
    status: pickRandomModel(statusList),
  })

  const tacticalObjectives = server.createList('objective', 3, {
    cycle: cycles.active.QUARTERLY,
    status: pickRandomModel(statusList),
  })

  const previousStrategicObjectives = server.createList('objective', 3, {
    cycle: cycles.inactive.previous.YEARLY,
    status: pickRandomModel(statusList),
  })

  const previousTacticalObjectives1 = server.createList('objective', 3, {
    cycle: cycles.inactive.previous.QUARTERLY[0],
    status: pickRandomModel(statusList),
  })

  const previousTacticalObjectives2 = server.createList('objective', 3, {
    cycle: cycles.inactive.previous.QUARTERLY[1],
    status: pickRandomModel(statusList),
  })

  const oldStrategicObjectives = server.createList('objective', 3, {
    cycle: cycles.inactive.old.YEARLY,
    status: pickRandomModel(statusList),
  })

  const oldTacticalObjectives = server.createList('objective', 3, {
    cycle: cycles.inactive.old.QUARTERLY,
    status: pickRandomModel(statusList),
  })

  const objectives = {
    active: {
      [CADENCE.YEARLY]: strategicObjectives,
      [CADENCE.QUARTERLY]: tacticalObjectives,
    },
    inactive: {
      previous: {
        [CADENCE.YEARLY]: previousStrategicObjectives,
        [CADENCE.QUARTERLY]: [previousTacticalObjectives1, previousTacticalObjectives2],
      },
      old: {
        [CADENCE.YEARLY]: oldStrategicObjectives,
        [CADENCE.QUARTERLY]: oldTacticalObjectives,
      },
    },
  }

  const strategicKeyResults = server.createList('keyResult', 4, {
    owner: user,
    objective: () => pickRandomModel(strategicObjectives),
    team: () => pickRandomModel(teams),
  })

  const tacticalKeyResults = server.createList('keyResult', 4, {
    owner: user,
    objective: () => pickRandomModel(tacticalObjectives),
    team: () => pickRandomModel(teams),
  })

  const previousStrategicKeyResults = server.createList('keyResult', 4, {
    owner: user,
    objective: () => pickRandomModel(previousStrategicObjectives),
    team: () => pickRandomModel(teams),
  })

  const previousTacticalKeyResults1 = server.createList('keyResult', 4, {
    owner: user,
    objective: () => pickRandomModel(previousTacticalObjectives1),
    team: () => pickRandomModel(teams),
  })

  const previousTacticalKeyResults2 = server.createList('keyResult', 4, {
    owner: user,
    objective: () => pickRandomModel(previousTacticalObjectives2),
    team: () => pickRandomModel(teams),
  })

  const oldStrategicKeyResults = server.createList('keyResult', 4, {
    owner: user,
    objective: () => pickRandomModel(oldStrategicObjectives),
    team: () => pickRandomModel(teams),
  })

  const oldTacticalKeyResults = server.createList('keyResult', 4, {
    owner: user,
    objective: () => pickRandomModel(oldTacticalObjectives),
    team: () => pickRandomModel(teams),
  })

  const keyResults = {
    active: {
      [CADENCE.YEARLY]: strategicKeyResults,
      [CADENCE.QUARTERLY]: tacticalKeyResults,
    },
    inactive: {
      previous: {
        [CADENCE.YEARLY]: previousStrategicKeyResults,
        [CADENCE.QUARTERLY]: [previousTacticalKeyResults1, previousTacticalKeyResults2],
      },
      old: {
        [CADENCE.YEARLY]: oldStrategicKeyResults,
        [CADENCE.QUARTERLY]: oldTacticalKeyResults,
      },
    },
  }

  const strategicKeyResultCheckIns = server.createList('keyResultCheckIn', 10, {
    user,
    keyResult: () => pickRandomModel(strategicKeyResults),
    value: buildKeyResultCheckInValue,
    valueIncrease: buildKeyResultCheckInValue,
    policies: allowPolicy,
  })

  const tacticalKeyResultCheckIns = server.createList('keyResultCheckIn', 10, {
    user,
    keyResult: () => pickRandomModel(tacticalKeyResults),
    value: buildKeyResultCheckInValue,
    valueIncrease: buildKeyResultCheckInValue,
    policies: allowPolicy,
  })

  const previousStrategicKeyResultCheckIns = server.createList('keyResultCheckIn', 10, {
    user,
    keyResult: () => pickRandomModel(previousStrategicKeyResults),
    value: buildKeyResultCheckInValue,
    valueIncrease: buildKeyResultCheckInValue,
    policies: denyPolicy,
  })

  const previousTacticalKeyResultCheckIns1 = server.createList('keyResultCheckIn', 10, {
    user,
    keyResult: () => pickRandomModel(previousTacticalKeyResults1),
    value: buildKeyResultCheckInValue,
    valueIncrease: buildKeyResultCheckInValue,
    policies: denyPolicy,
  })

  const previousTacticalKeyResultCheckIns2 = server.createList('keyResultCheckIn', 10, {
    user,
    keyResult: () => pickRandomModel(previousTacticalKeyResults2),
    value: buildKeyResultCheckInValue,
    valueIncrease: buildKeyResultCheckInValue,
    policies: denyPolicy,
  })

  const oldStrategicKeyResultCheckIns = server.createList('keyResultCheckIn', 10, {
    user,
    keyResult: () => pickRandomModel(oldStrategicKeyResults),
    value: buildKeyResultCheckInValue,
    valueIncrease: buildKeyResultCheckInValue,
    policies: denyPolicy,
  })

  const oldTacticalKeyResultCheckIns = server.createList('keyResultCheckIn', 10, {
    user,
    keyResult: () => pickRandomModel(oldTacticalKeyResults),
    value: buildKeyResultCheckInValue,
    valueIncrease: buildKeyResultCheckInValue,
    policies: denyPolicy,
  })

  const keyResultCheckIns = {
    active: {
      [CADENCE.YEARLY]: strategicKeyResultCheckIns,
      [CADENCE.QUARTERLY]: tacticalKeyResultCheckIns,
    },
    inactive: {
      previous: {
        [CADENCE.YEARLY]: previousStrategicKeyResultCheckIns,
        [CADENCE.QUARTERLY]: [
          previousTacticalKeyResultCheckIns1,
          previousTacticalKeyResultCheckIns2,
        ],
      },
      old: {
        [CADENCE.YEARLY]: oldStrategicKeyResultCheckIns,
        [CADENCE.QUARTERLY]: oldTacticalKeyResultCheckIns,
      },
    },
  }

  const strategicKeyResultComments = server.createList('keyResultComment', 10, {
    user,
    keyResult: () => pickRandomModel(strategicKeyResults),
    policies: allowPolicy,
  })

  const tacticalKeyResultComments = server.createList('keyResultComment', 10, {
    user,
    keyResult: () => pickRandomModel(tacticalKeyResults),
    policies: allowPolicy,
  })

  const previousStrategicKeyResultComments = server.createList('keyResultComment', 10, {
    user,
    keyResult: () => pickRandomModel(previousStrategicKeyResults),
    policies: denyPolicy,
  })

  const previousTacticalKeyResultComments1 = server.createList('keyResultComment', 10, {
    user,
    keyResult: () => pickRandomModel(previousTacticalKeyResults1),
    policies: denyPolicy,
  })

  const previousTacticalKeyResultComments2 = server.createList('keyResultComment', 10, {
    user,
    keyResult: () => pickRandomModel(previousTacticalKeyResults2),
    policies: denyPolicy,
  })

  const oldStrategicKeyResultComments = server.createList('keyResultComment', 10, {
    user,
    keyResult: () => pickRandomModel(oldStrategicKeyResults),
    policies: denyPolicy,
  })

  const oldTacticalKeyResultComments = server.createList('keyResultComment', 10, {
    user,
    keyResult: () => pickRandomModel(oldTacticalKeyResults),
    policies: denyPolicy,
  })

  const keyResultComments = {
    active: {
      [CADENCE.YEARLY]: strategicKeyResultComments,
      [CADENCE.QUARTERLY]: tacticalKeyResultComments,
    },
    inactive: {
      previous: {
        [CADENCE.YEARLY]: previousStrategicKeyResultComments,
        [CADENCE.QUARTERLY]: [
          previousTacticalKeyResultComments1,
          previousTacticalKeyResultComments2,
        ],
      },
      old: {
        [CADENCE.YEARLY]: oldStrategicKeyResultComments,
        [CADENCE.QUARTERLY]: oldTacticalKeyResultComments,
      },
    },
  }

  const users = [user, ...otherUsers]

  company.update('users', users as any)
  company.update('objectives', [
    ...objectives.active.YEARLY,
    ...objectives.inactive.previous.YEARLY,
    ...objectives.inactive.old.YEARLY,
  ] as any)
  rootTeam.update('users', users as any)
  rootTeam.update('objectives', [
    ...objectives.active.QUARTERLY,
    ...flatten(objectives.inactive.previous.QUARTERLY),
    ...objectives.inactive.old.QUARTERLY,
  ] as any)

  teams.map((team) => {
    team.update('users', users as any)
    team.update('objectives', [
      ...objectives.active.QUARTERLY,
      ...flatten(objectives.inactive.previous.QUARTERLY),
      ...objectives.inactive.old.QUARTERLY,
    ] as any)

    return team
  })

  company.update('latestKeyResultCheckIn', tacticalKeyResultCheckIns[0] as any)

  tacticalKeyResults.map((keyResult) => {
    const latestKeyResultCheckIn = keyResult.keyResultCheckIns.models[0] as any
    const tacticalKeyResultCheckIns = keyResult.keyResultCheckIns.models

    tacticalKeyResultCheckIns.map((keyResultCheckIn, index) => {
      const parentIndex = index + 1

      if (parentIndex < tacticalKeyResultCheckIns.length) {
        const parent = tacticalKeyResultCheckIns[parentIndex]
        keyResultCheckIn.update('parent', parent)
      }

      return keyResultCheckIn
    })

    keyResult.update('latestKeyResultCheckIn', latestKeyResultCheckIn)
    keyResult.update('keyResultCheckIns', keyResult.keyResultCheckIns)

    return keyResult
  })

  cycles.active.YEARLY.update('keyResults', strategicKeyResults as any)
  cycles.active.QUARTERLY.update('keyResults', tacticalKeyResults as any)
  cycles.inactive.previous.YEARLY.update('keyResults', previousStrategicKeyResults as any)
  cycles.inactive.previous.QUARTERLY[0].update('keyResults', previousTacticalKeyResults1 as any)
  cycles.inactive.previous.QUARTERLY[1].update('keyResults', previousTacticalKeyResults2 as any)
  cycles.inactive.old.YEARLY.update('keyResults', oldStrategicKeyResults as any)
  cycles.inactive.old.QUARTERLY.update('keyResults', oldTacticalKeyResults as any)

  logger.debug('Inserted fake data on MirageJS server', {
    data: {
      company,
      strategicObjectives,
      rootTeam,
      teams,
      user,
      cycles,
      objectives,
      keyResults,
      keyResultCheckIns,
      keyResultComments,
      otherUsers,
      allowPolicy,
      statusList,
    },
  })
}

export default seeds
