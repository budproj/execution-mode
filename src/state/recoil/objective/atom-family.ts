import { atomFamily } from 'recoil'

import { Objective } from 'src/components/Objective/types'

import { PREFIX } from './constants'

const KEY = `${PREFIX}::OBJECTIVE_FAMILY`

export const objectiveAtomFamily = atomFamily<
  Partial<Objective> | undefined,
  Objective['id'] | undefined
>({
  key: KEY,
  default: undefined,
})

export default objectiveAtomFamily
