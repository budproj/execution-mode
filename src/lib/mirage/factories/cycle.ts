import faker from 'faker'
import { Factory } from 'miragejs'

import { CompanyCycle } from 'components/Company'

export default Factory.extend({
  start: faker.date.past,
  end: faker.date.future,
} as CompanyCycle)
