import { atom } from 'recoil'

import { PREFIX } from '../constants'

const KEY = `${PREFIX}::QUERY_VARIABLES_LIMIT_OFFSET`
export const KRS_PER_PAGE = 2

type PaginationQueryVariables = {
  limit: number
  offset: number
}

const paginationKRs = atom<PaginationQueryVariables>({
  key: KEY,
  default: {
    limit: KRS_PER_PAGE,
    offset: 0,
  },
})

export default paginationKRs
