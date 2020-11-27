import faker from 'faker'
import { Factory } from 'miragejs'

export default Factory.extend({
  title: faker.company.catchPhrase,
  createdAt: faker.date.past,
  updatedAt: faker.date.past,
})
