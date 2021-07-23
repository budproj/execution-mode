import faker from 'faker'
import { Factory } from 'miragejs'

export const cycle = Factory.extend({
  createdAt: faker.date.past(),
  policy: { read: 'ALLOW', update: 'ALLOW', delete: 'ALLOW' },
  period: 'blablabla',
  cadence: () => faker.helpers.randomize(['YEARLY', 'QUARTERLY']),
  active: true,
  dateStart: faker.date.past,
  dateEnd: faker.date.future,
  updatedAt: faker.date.recent,
  afterCreate(cycle, server) {
    const status = server.create('status')
    const delta = server.create('deltum') // miragejs tries to singularize the word delta, incorrectly

    cycle.update({ status, delta })
  }
})

