import faker from 'faker'
import { Factory, ModelInstance, Server } from 'miragejs'

import { Cycle } from 'components/Company/types'

export default Factory.extend({
  dateStart: faker.date.past,
  dateEnd: faker.date.future,
  createdAt: faker.date.past,
  updatedAt: faker.date.past,

  afterCreate(cycle: ModelInstance<Cycle>, server: Server) {
    const company = server.schema.companies.first()

    cycle.update('company', company)
  },
})
