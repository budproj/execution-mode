import faker from 'faker'
import shuffle from 'lodash/shuffle'
import { ModelInstance } from 'miragejs'

import { KeyResultFormat } from 'components/KeyResult'
import Models from 'lib/mirage/models'

export const buildKeyResultView = (
  keyResultModels: Array<ModelInstance<typeof Models.keyResult>>,
) => {
  const keyResults = shuffle(keyResultModels)
  const rank = keyResults.map((keyResult) => keyResult.id)

  return {
    keyResults,
    rank,
  }
}

export function buildProgressReport() {
  const handlers = {
    [KeyResultFormat.NUMBER]: () => faker.random.number({ min: this.keyResult.initialValue }),
    [KeyResultFormat.PERCENTAGE]: () => faker.random.float({ min: this.initialValue, max: 1 }),
    [KeyResultFormat.COIN_BRL]: () => faker.random.number({ min: this.initialValue }),
  }
  const formatHandler = handlers[this.keyResult.format]

  return formatHandler()
}
