import faker from 'faker'
import { Factory } from 'miragejs'

export default Factory.extend({
  text: faker.lorem.paragraphs,
  createdAt: faker.date.past,
})
