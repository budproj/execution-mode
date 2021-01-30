import faker from 'faker'
import sample from 'lodash/sample'
import { Factory } from 'miragejs'

import { KEY_RESULT_CUSTOM_LIST_BINDING } from 'src/components/User/constants'

export default Factory.extend({
  title: faker.company.catchPhrase,
  binding: () => sample(Object.values(KEY_RESULT_CUSTOM_LIST_BINDING)),
  createdAt: faker.date.past,
  updatedAt: faker.date.past,
})
