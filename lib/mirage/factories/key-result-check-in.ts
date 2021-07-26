import faker from 'faker'
import { Factory } from 'miragejs'

export const keyResultCheckIn = Factory.extend({
  value: () => faker.datatype.number({ min: 0, max: 100 }),
  progress: () => faker.datatype.number({ min: 0, max: 100 }),
  confidence: () => faker.datatype.number({ min: 0, max: 100 }),
  createdAt: faker.date.recent,

  afterCreate(keyResultCheckIn, server) {
    const policy = server.create('nodePolicy')

    keyResultCheckIn.update({ policy })
  },
})
