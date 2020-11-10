import defaultsDeep from 'lodash/defaultsDeep'
import { atom, selector } from 'recoil'

import { KeyResultsHashmap } from 'components/KeyResult'
import logger from 'lib/logger'
import { getFromAPI } from 'state/actions/api'

import { PREFIX } from './constants'

export const KEY = `${PREFIX}::REMOTE`

export const selectRemoteKeyResults = selector<KeyResultsHashmap>({
  key: `${KEY}::FETCH`,
  get: async ({ get }) => {
    const localState = get(remoteKeyResults)
    if (localState) return localState

    logger.debug('Key Results local state not defined. Fetching data from remote API', {
      component: KEY,
    })
    const remoteState = await getFromAPI<KeyResultsHashmap>('/key-results', KEY)

    logger.debug('Fetched data from Key Results API:', { data: remoteState, component: KEY })
    return remoteState
  },
  set: ({ get, set }, newValue) => {
    logger.debug(`Updating local Key Results state with data:`, { data: newValue, component: KEY })

    const currentState = get(remoteKeyResults)
    logger.debug('Original Key Results data:', { data: currentState, component: KEY })

    const updatedKeyResults = defaultsDeep(newValue, currentState)
    logger.debug('New Key Results data:', { data: updatedKeyResults, component: KEY })

    set(remoteKeyResults, updatedKeyResults)
    logger.debug('Updated local Key Results data state with success', { component: KEY })
  },
})

export const remoteKeyResults = atom<KeyResultsHashmap | null>({
  key: KEY,
  default: null,
})
