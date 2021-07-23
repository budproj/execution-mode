import faker from 'faker'
import { Registry, Server } from 'miragejs'

import getConfig from 'src/config'

import { Factories } from '../factories'
import { Models } from '../models'

const { publicRuntimeConfig } = getConfig()

export const seeds = (server: Server<Registry<Models, Factories>>) => {
  faker.seed(publicRuntimeConfig.mirage.fakerSeed)

  const company = server.create('team', { level: 'COMPANY' })

  const teams = server.createList('team', 5)

  company.update({ rankedDescendants: teams })

  const me = server.create('user', { teams: teams, companies: [company] })
  server.db.keyResultCheckIns.update({ user: me }) // add user to all checkIns

}
