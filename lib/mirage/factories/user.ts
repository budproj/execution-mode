import faker from 'faker'
import { Factory } from 'miragejs'

import { UserGender } from 'src/components/User/types'

export default Factory.extend({
  authzSub: faker.random.uuid,
  name: faker.name.findName,
  gender: () => faker.helpers.randomize([UserGender.MALE, UserGender.FEMALE, undefined]),
  role: faker.name.jobTitle,
  picture: () => faker.helpers.randomize([undefined, faker.image.avatar()]),
  createdAt: faker.date.past,
  updatedAt: faker.date.past,
})
