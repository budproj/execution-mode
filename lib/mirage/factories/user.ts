import faker from 'faker'
import { Factory } from 'miragejs'

import { USER_GENDER } from 'src/components/User/constants'

export const user = Factory.extend({
  // AuthzSub: faker.datatype.uuid,
  firstName: faker.name.firstName,
  // LastName: faker.name.lastName,
  fullName: faker.name.findName,
  // Nickname: faker.internet.userName,
  // about: faker.lorem.paragraph,
  // linkedInProfileAddress: faker.internet.url,
  gender: () => faker.helpers.randomize([USER_GENDER.MALE, USER_GENDER.FEMALE]), // , undefined]),
  role: faker.name.jobTitle,
  picture: () => faker.helpers.randomize([faker.image.avatar()]), // , undefined]),
  createdAt: faker.date.past,
  // UpdatedAt: faker.date.past,
  email: faker.internet.email,
})
