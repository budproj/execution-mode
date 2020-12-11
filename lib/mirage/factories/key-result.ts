import faker from 'faker'
import sample from 'lodash/sample'
import { Factory } from 'miragejs'

import { KeyResultFormat } from 'src/components/KeyResult/types'

export default Factory.extend({
  title: faker.company.catchPhrase,
  description: faker.lorem.paragraph,
  format: () => sample(Object.values(KeyResultFormat)),
  createdAt: faker.date.past,
  updatedAt: faker.date.past,

  initialValue() {
    const handlers = {
      [KeyResultFormat.NUMBER]: () => faker.random.number({ min: 0 }),
      [KeyResultFormat.PERCENTAGE]: () => faker.random.float({ min: 0, max: 100 }),
      [KeyResultFormat.COIN_BRL]: () => faker.random.number({ min: 0 }),
    }
    const formatHandler = handlers[(this.format as any) as KeyResultFormat]

    return formatHandler()
  },

  goal() {
    const initialValue = (this.initialValue as any) as number
    const min = initialValue * 1.1
    const handlers = {
      [KeyResultFormat.NUMBER]: () => faker.random.number({ min }),
      [KeyResultFormat.PERCENTAGE]: () => faker.random.float({ min, max: 100 }),
      [KeyResultFormat.COIN_BRL]: () => faker.random.number({ min }),
    }
    const formatHandler = handlers[(this.format as any) as KeyResultFormat]

    return formatHandler()
  },
})
