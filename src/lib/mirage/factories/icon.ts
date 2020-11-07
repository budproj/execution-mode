import faker from 'faker'
import { Factory } from 'miragejs'

import { KeyResultIcon } from 'components/KeyResult'

export default Factory.extend({
  drawing: faker.random.word(),
  backgroundColor: faker.random.hexaDecimal(),
} as KeyResultIcon)
