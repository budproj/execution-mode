import faker from 'faker'
import { Registry, Server } from 'miragejs'

import getConfig from 'src/config'

import { Factories } from '../factories'
import { Models } from '../models'
import { generateRandomStatus } from './helpers'

const { publicRuntimeConfig } = getConfig()

export const seeds = (server: Server<Registry<Models, Factories>>) => {
  faker.seed(publicRuntimeConfig.mirage.fakerSeed)

  const company = server.create('team', {
    // order: { createdAt: 'DESC' },
    level: 'COMPANY',
    // onlyCompanies: true,
    // onlyCompaniesAndDepartments: true,
    status: generateRandomStatus(),
  })

  const team = server.create('team', {})
  company.update({ rankedDescendants: [team] })

  const me = server.create('user', {
    teams: [team],
    companies: [company],
  })
}
