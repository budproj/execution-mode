import faker from 'faker'
import { Factory } from 'miragejs'

import { TEAM_GENDER } from 'src/components/Team/constants'

export default Factory.extend({
  name: faker.company.companyName,
  gender: () => faker.helpers.randomize([TEAM_GENDER.MALE, TEAM_GENDER.FEMALE, undefined]),
  description: faker.lorem.paragraph,
  currentProgress: () => faker.random.float({ min: 0, max: 100 }),
  currentConfidence: () => faker.random.number({ min: 0, max: 100 }),
  percentageProgressIncrease: () => faker.random.float({ min: 0, max: 100 }),
  createdAt: faker.date.past,
  updatedAt: faker.date.past,
})
