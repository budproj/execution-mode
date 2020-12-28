import faker from 'faker'
import sample from 'lodash/sample'
import { Factory } from 'miragejs'

import { KEY_RESULT_FORMAT } from 'src/components/KeyResult/constants'

export default Factory.extend({
  title: faker.company.catchPhrase,
  description: faker.lorem.paragraph,
  format: () => sample(Object.values(KEY_RESULT_FORMAT)),
  currentConfidence: () => faker.random.number({ max: 100 }),
  currentProgress: 0,
  createdAt: faker.date.past,
  updatedAt: faker.date.past,

  initialValue() {
    const handlers = {
      [KEY_RESULT_FORMAT.NUMBER]: () => faker.random.number({ min: 0 }),
      [KEY_RESULT_FORMAT.PERCENTAGE]: () => faker.random.float({ min: 0, max: 100 }),
      [KEY_RESULT_FORMAT.COIN_BRL]: () => faker.random.number({ min: 0 }),
    }
    const formatHandler = handlers[(this.format as any) as KEY_RESULT_FORMAT]

    return formatHandler()
  },

  goal() {
    const initialValue = (this.initialValue as any) as number
    const min = initialValue * 1.1
    const handlers = {
      [KEY_RESULT_FORMAT.NUMBER]: () => faker.random.number({ min }),
      [KEY_RESULT_FORMAT.PERCENTAGE]: () => faker.random.float({ min, max: 100 }),
      [KEY_RESULT_FORMAT.COIN_BRL]: () => faker.random.number({ min }),
    }
    const formatHandler = handlers[(this.format as any) as KEY_RESULT_FORMAT]

    return formatHandler()
  },
})
