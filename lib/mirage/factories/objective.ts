import faker from 'faker'
import { Factory, ModelInstance, Server } from 'miragejs'

import { Objective } from 'components/Objective'

export default Factory.extend({
  title: faker.company.catchPhrase,
  createdAt: faker.date.past,
  updatedAt: faker.date.past,

  afterCreate(objective: ModelInstance<Objective>, server: Server) {
    const cycle = server.schema.cycles.first()

    objective.update('cycle', cycle)
  },
})
