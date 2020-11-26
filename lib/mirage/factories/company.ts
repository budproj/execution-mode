import faker from 'faker'
import { Factory } from 'miragejs'

export default Factory.extend({
  name: faker.company.companyName,
  createdAt: faker.date.past,
  updatedAt: faker.date.past,
})
