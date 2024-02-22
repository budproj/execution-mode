import { atom } from 'recoil'

import { GraphQLPageInfo } from 'src/components/types'

import { PREFIX } from '../constants'

const KEY = `${PREFIX}::LIST_KEY_RESULTS_PAGE_INFO`

const listKeyResultsPageInfo = atom<GraphQLPageInfo>({
  key: KEY,
  default: {
    hasNextPage: false,
    endCursor: '',
  },
})

export default listKeyResultsPageInfo
