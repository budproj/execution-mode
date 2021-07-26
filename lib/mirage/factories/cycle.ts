import faker from 'faker'
import { Factory } from 'miragejs'

export const cycle = Factory.extend({
  createdAt: faker.date.past(),
  period: 'blablabla',
  cadence: () => faker.helpers.randomize(['YEARLY', 'QUARTERLY']),
  active: true,
  dateStart: faker.date.past,
  dateEnd: faker.date.future,
  updatedAt: faker.date.recent,
  afterCreate(cycle, server) {
    const status = server.create('status')
    const delta = server.create('deltum') // Miragejs tries to singularize the word delta, incorrectly
    const policy = server.create('nodePolicy')

    cycle.update({ status, delta, policy })
  },
})
