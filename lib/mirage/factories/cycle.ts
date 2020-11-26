import faker from 'faker'
import { Factory } from 'miragejs'

export default Factory.extend({
  dateStart: faker.date.past,
  dateEnd: faker.date.future,
  createdAt: faker.date.past,
  updatedAt: faker.date.past,
})
