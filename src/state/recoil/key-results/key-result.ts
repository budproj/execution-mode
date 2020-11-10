import { KeyResult } from 'components/KeyResult'
import { atomFamily, selectorFamily } from 'recoil'
import { remoteKeyResults } from './remote'
import { PREFIX } from './constants'
import defaultsDeep from 'lodash/defaultsDeep'
import logger from 'lib/logger'

export const KEY = `${PREFIX}::ALL`

export const selectKeyResultBasedOnID = selectorFamily<
  KeyResult | Partial<KeyResult> | undefined,
  KeyResult['id']
>({
  key: `${KEY}::ID`,
  get: (id) => ({ get }) => get(remoteKeyResults)?.[id],
  set: (id) => ({ get, set }, newValue) => {
    logger.debug(`Updating local state of Key Result with ID ${id} with new data:`, {
      data: newValue,
      component: KEY,
    })

    const currentState = get(selectKeyResultBasedOnID(id))
    logger.debug('Original Key Result data:', { data: currentState, component: KEY })

    const updatedKeyResult = defaultsDeep(newValue, currentState)
    logger.debug('New Key Result data:', { data: updatedKeyResult, component: KEY })

    const allKeyResults = get(remoteKeyResults)
    const updatedLocalRepository = {
      ...allKeyResults,
      [id]: updatedKeyResult,
    }
    logger.debug('Merged Key Result with local repository:', {
      data: updatedLocalRepository,
      component: KEY,
    })

    set(remoteKeyResults, updatedLocalRepository)
    logger.debug('Updated local Key Result data state with success', { component: KEY })
  },
})

export const keyResult = atomFamily<KeyResult | undefined, KeyResult['id']>({
  key: KEY,
  default: selectKeyResultBasedOnID,
})
