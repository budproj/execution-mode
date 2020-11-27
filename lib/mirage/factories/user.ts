import faker from 'faker'
import { Factory } from 'miragejs'

export default Factory.extend({
  authzSub: faker.random.uuid,
  name: faker.name.findName,
  role: faker.name.jobTitle,
  picture: () => faker.helpers.randomize([undefined, faker.image.avatar()]),
  createdAt: faker.date.past,
  updatedAt: faker.date.past,
})
