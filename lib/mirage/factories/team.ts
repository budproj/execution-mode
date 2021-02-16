import faker from 'faker'
import { Factory } from 'miragejs'

import { TEAM_GENDER } from 'src/components/Team/constants'

export default Factory.extend({
  name: faker.commerce.department,
  description: faker.lorem.lines(5),
  currentProgress: () => faker.random.number({ min: 0, max: 100 }),
  currentConfidence: () => faker.random.number({ min: 0, max: 100 }),
  createdAt: faker.date.past,
  updatedAt: faker.date.past,
  progressIncreaseSinceLastWeek: () => faker.random.float({ min: -100, max: 100 }),
  gender: () => faker.helpers.randomize([TEAM_GENDER.MALE, TEAM_GENDER.FEMALE, undefined]),
  isCompany: false,
  onlyCompanies: false,
  onlyCompaniesAndDepartments: false,
})
