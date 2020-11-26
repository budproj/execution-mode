import faker from 'faker'
import sample from 'lodash/sample'
import { Factory } from 'miragejs'

import { KeyResultFormat } from 'components/KeyResult/types'

export default Factory.extend({
  title: faker.company.catchPhrase,
  description: faker.lorem.paragraph,
  initialValue: () => faker.random.number({ min: 0, max: 30 }),
  goal: () => faker.random.number({ min: 31, max: 100 }),
  format: () => sample(Object.values(KeyResultFormat)),
  createdAt: faker.date.past,
  updatedAt: faker.date.past,
})
