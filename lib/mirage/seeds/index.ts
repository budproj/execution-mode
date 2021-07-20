import faker from 'faker'
import { Registry, Server } from 'miragejs'

import getConfig from 'src/config'

import { Factories } from '../factories'
import { Models } from '../models'

const { publicRuntimeConfig } = getConfig()

export const seeds = (server: Server<Registry<Models, Factories>>) => {
  faker.seed(publicRuntimeConfig.mirage.fakerSeed)

  const company = server.create('team', {
    // IsCompany: true,
    // onlyCompanies: true,
    // onlyCompaniesAndDepartments: true,
    // status: pickRandomModel(statusList),
  })

  const me = server.create('user', {
    teams: [company],
    companies: [company],
  })
}
