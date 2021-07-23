import faker from 'faker'
import { Factory } from 'miragejs'

export const status = Factory.extend({
  progress: faker.datatype.number({ min: 40, max: 100 }),
  confidence: faker.datatype.number({ min: 0, max: 100 }),
  isActive: true,
  isOutdated: false,
  afterCreate(status, server) {
    const keyResultCheckIn = server.create('keyResultCheckIn')

    status.update({ latestCheckIn: keyResultCheckIn })
  }
})
