import faker from 'faker'
import { Factory } from 'miragejs'

export default Factory.extend({
  name: faker.commerce.department,
  description: faker.lorem.paragraph,
  currentProgress: () => faker.random.number({ min: 0, max: 100 }),
  currentConfidence: () => faker.random.number({ min: 0, max: 100 }),
  createdAt: faker.date.past,
  updatedAt: faker.date.past,
})
