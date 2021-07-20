import faker from 'faker'
import { Factory } from 'miragejs'

import { TEAM_GENDER } from 'src/components/Team/constants'

export const team = Factory.extend({
  name: faker.commerce.department,
  // Description: faker.lorem.lines(5),
  // createdAt: faker.date.past,
  // updatedAt: faker.date.past,
  // progressIncreaseSinceLastWeek: () => faker.random.float({ min: -100, max: 100 }),
  gender: () => faker.helpers.randomize([TEAM_GENDER.MALE, TEAM_GENDER.FEMALE, undefined]),
  // IsCompany: false,
  // onlyCompanies: false,
  // onlyCompaniesAndDepartments: false,
})
