import faker from 'faker'
import { KeyResultConfidence } from 'components/KeyResult'
import { Factory, ModelInstance, Server } from 'miragejs'

export default Factory.extend({
  value: () => faker.random.number(100),
  createdAt: faker.date.past,

  afterCreate(customSorting: ModelInstance<KeyResultConfidence>, server: Server) {
    const user = server.schema.users.first()

    customSorting.update('user', user)
  },
} as KeyResultConfidence)
