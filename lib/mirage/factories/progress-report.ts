import faker from 'faker'
import { Factory } from 'miragejs'

export default Factory.extend({
  comment: () => faker.helpers.randomize([undefined, faker.lorem.paragraph()]),
  createdAt: faker.date.past,
})
