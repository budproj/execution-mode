import faker from 'faker'
import sample from 'lodash/sample'
import { Factory } from 'miragejs'

import { KeyResultViewBinding } from 'components/KeyResult/types'

export default Factory.extend({
  title: faker.company.catchPhrase,
  binding: () => sample(Object.values(KeyResultViewBinding)),
  createdAt: faker.date.past,
  updatedAt: faker.date.past,
})
