import faker from 'faker'
import { Factory } from 'miragejs'

export default Factory.extend({
  name: faker.commerce.department,
  description: faker.lorem.paragraph,
  createdAt: faker.date.past,
  updatedAt: faker.date.past,
})
