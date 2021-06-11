import { atomFamily } from 'recoil'

import { Objective } from '../../../components/Objective/types'
import { GraphQLEdge } from '../../../components/types'

import { PREFIX } from './constants'

export const teamActiveObjectives = atomFamily<
  Array<GraphQLEdge<Objective>> | undefined,
  string | undefined
>({
  key: `${PREFIX}::ACTIVE_OBJECTIVES`,
  default: undefined,
})
