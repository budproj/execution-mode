import faker from 'faker'
import { Factory } from 'miragejs'

import { User } from 'components/User'

export default Factory.extend({
  name: faker.name.findName,
  role: faker.name.jobTitle,
} as User)
