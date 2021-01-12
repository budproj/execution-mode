import faker from 'faker'
import { Factory } from 'miragejs'

import { USER_GENDER } from 'src/components/User/constants'

export default Factory.extend({
  authzSub: faker.random.uuid,
  firstName: faker.name.firstName,
  lastName: faker.name.lastName,
  fullName: faker.name.findName,
  gender: () => faker.helpers.randomize([USER_GENDER.MALE, USER_GENDER.FEMALE, undefined]),
  role: faker.name.jobTitle,
  picture: () => faker.helpers.randomize([undefined, faker.image.avatar()]),
  createdAt: faker.date.past,
  updatedAt: faker.date.past,
})
