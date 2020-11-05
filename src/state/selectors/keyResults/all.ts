import { selector } from 'recoil'

import { KeyResultsHashmap, KeyResult } from 'components/KeyResult'
import logger from 'lib/logger'

const reduceToID = (prev: KeyResultsHashmap, next: KeyResult): KeyResultsHashmap => ({
  ...prev,
  [next.id]: next,
})

export default selector({
  key: 'KEY_RESULTS::ALL',
  get: async () => {
    logger.info('Dispatching get request...', { component: 'KEY_RESULTS::ALL' })
    const response = await fetch('/api/key-results')
      .then((res) => res.json())
      .then((result) => result.data.reduce(reduceToID, {}))
    logger.info('Received response', { data: response, component: 'KEY_RESULTS::ALL' })

    return response
  },
})
