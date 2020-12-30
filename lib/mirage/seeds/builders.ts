import faker from 'faker'
import shuffle from 'lodash/shuffle'
import { ModelInstance } from 'miragejs'

import { KEY_RESULT_FORMAT } from 'src/components/KeyResult/constants'

export const buildKeyResultView = (keyResultModels: Array<ModelInstance<any>>) => {
  const keyResults = shuffle(keyResultModels)
  const rank = keyResults.map((keyResult) => keyResult.id)

  return {
    keyResults,
    rank,
  }
}

export function buildProgressReport(this: any) {
  const handlers = {
    [KEY_RESULT_FORMAT.NUMBER]: () =>
      faker.random.number({ min: this.keyResult.initialValue, max: this.keyResult.goal }),
    [KEY_RESULT_FORMAT.PERCENTAGE]: () =>
      faker.random.float({ min: this.initialValue, max: this.keyResult.goal }),
    [KEY_RESULT_FORMAT.COIN_BRL]: () =>
      faker.random.number({ min: this.initialValue, max: this.keyResult.goal }),
  }
  const formatHandler = handlers[this.keyResult.format as KEY_RESULT_FORMAT]

  return formatHandler()
}
