import faker from 'faker'
import { Factory, ModelInstance, Server } from 'miragejs'

import { Team } from 'components/Company/types'

export default Factory.extend({
  name: faker.commerce.department,
  createdAt: faker.date.past,
  updatedAt: faker.date.past,

  afterCreate(team: ModelInstance<Team>, server: Server) {
    const company = server.schema.companies.first()

    team.update('company', company)
  },
})
