import faker from 'faker'
import { Factory } from 'miragejs'

export default Factory.extend({
  comment: () => faker.helpers.randomize([undefined, faker.lorem.paragraph()]),
  confidence: () => faker.random.number({ min: -1, max: 100 }),
  createdAt: faker.date.past,
})
