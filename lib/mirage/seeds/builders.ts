import faker from 'faker'
import shuffle from 'lodash/shuffle'
import { ModelInstance } from 'miragejs'

import { KeyResultFormat } from 'src/components/KeyResult/types'

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
    [KeyResultFormat.NUMBER]: () =>
      faker.random.number({ min: this.keyResult.initialValue, max: this.keyResult.goal }),
    [KeyResultFormat.PERCENTAGE]: () =>
      faker.random.float({ min: this.initialValue, max: this.keyResult.goal }),
    [KeyResultFormat.COIN_BRL]: () =>
      faker.random.number({ min: this.initialValue, max: this.keyResult.goal }),
  }
  const formatHandler = handlers[(this.keyResult.format as any) as KeyResultFormat]

  return formatHandler()
}
