import faker from 'faker'
import { Factory } from 'miragejs'

export default Factory.extend({
  title: faker.company.catchPhrase,
  createdAt: faker.date.past,
  updatedAt: faker.date.past,
  currentProgress: () => faker.random.number({ min: 0, max: 100 }),
  currentConfidence: () => faker.random.number({ min: 0, max: 100 }),
})
