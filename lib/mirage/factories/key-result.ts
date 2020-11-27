import faker from 'faker'
import sample from 'lodash/sample'
import { Factory } from 'miragejs'

import { KeyResultFormat } from 'components/KeyResult/types'

export default Factory.extend({
  title: faker.company.catchPhrase,
  description: faker.lorem.paragraph,
  format: () => sample(Object.values(KeyResultFormat)),
  createdAt: faker.date.past,
  updatedAt: faker.date.past,

  initialValue() {
    const handlers = {
      [KeyResultFormat.NUMBER]: () => faker.random.number({ min: 0 }),
      [KeyResultFormat.PERCENTAGE]: () => faker.random.float({ min: 0, max: 1 }),
      [KeyResultFormat.COIN_BRL]: () => faker.random.number({ min: 0 }),
    }
    const formatHandler = handlers[this.format]

    return formatHandler()
  },

  goal() {
    const handlers = {
      [KeyResultFormat.NUMBER]: () => faker.random.number({ min: this.initialValue }),
      [KeyResultFormat.PERCENTAGE]: () => faker.random.float({ min: this.initialValue, max: 1 }),
      [KeyResultFormat.COIN_BRL]: () => faker.random.number({ min: this.initialValue }),
    }
    const formatHandler = handlers[this.format]

    return formatHandler()
  },
})
