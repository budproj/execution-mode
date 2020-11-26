import shuffle from 'lodash/shuffle'
import { ModelInstance } from 'miragejs'

import Models from 'lib/mirage/models'

export const buildKeyResultView = (
  keyResultsModels: Array<ModelInstance<typeof Models.keyResult>>,
) => {
  const keyResults = shuffle(keyResultsModels)
  const rank = keyResults.map((keyResult) => keyResult.id)

  return {
    keyResults,
    rank,
  }
}
