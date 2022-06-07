import { atomFamily } from 'recoil'

import { Objective } from 'src/components/Objective/types'
import { GraphQLEdge } from 'src/components/types'

import { PREFIX } from './constants'

export const userActiveObjectives = atomFamily<
  Array<GraphQLEdge<Objective>> | undefined,
  string | undefined
>({
  key: `${PREFIX}::ACTIVE_OBJECTIVES`,
  default: undefined,
})
