import faker from 'faker'
import { Factory } from 'miragejs'

import { CADENCE } from 'src/components/Cycle/constants'

export default Factory.extend({
  period: faker.random.word,
  active: faker.random.boolean,
  cadence: () => faker.helpers.randomize(Object.values(CADENCE)),
  dateStart: faker.date.past,
  dateEnd: faker.date.future,
  createdAt: faker.date.past,
  updatedAt: faker.date.past,
})
