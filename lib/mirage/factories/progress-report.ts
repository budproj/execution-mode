import faker from 'faker'
import { Factory } from 'miragejs'

export default Factory.extend({
  valuePrevious: () => faker.random.number({ min: 0, max: 60 }),
  valueNew: () => faker.random.number({ min: 61, max: 100 }),
  comment: faker.lorem.paragraph,
  createdAt: faker.date.past,
})
