import { atom, selector } from 'recoil'

import { KeyResultsHashmap } from 'components/KeyResult'
import logger from 'lib/logger'
import { getFromAPI } from 'state/actions/api'

import { PREFIX } from './constants'

export const KEY = `${PREFIX}::REMOTE`

export const fetchKeyResults = selector<KeyResultsHashmap>({
  key: `${KEY}::FETCH`,
  get: async () => {
    logger.debug('Fething Key Results from remote repository', {
      component: KEY,
    })
    const remoteState = await getFromAPI<KeyResultsHashmap>('/key-results', KEY)

    logger.debug('Fetched data from Key Results API:', { data: remoteState, component: KEY })
    return remoteState
  },
})

export const remoteKeyResults = atom<KeyResultsHashmap | null>({
  key: KEY,
  default: fetchKeyResults,
})
