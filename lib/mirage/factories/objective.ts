import faker from 'faker'
import { Factory } from 'miragejs'

export default Factory.extend({
  title: faker.company.catchPhrase,
  createdAt: faker.date.past,
  updatedAt: faker.date.past,
  progress: () => faker.random.number({ min: 0, max: 100 }),
  confidence: () => faker.random.number({ min: 0, max: 100 }),
  progressIncreaseSinceLastWeek: () => faker.random.float({ min: -100, max: 100 }),
})
