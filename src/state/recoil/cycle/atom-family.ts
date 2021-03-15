import { atomFamily } from 'recoil'

import { Cycle } from 'src/components/Cycle/types'

import { PREFIX } from './constants'

const KEY = `${PREFIX}::FAMILY`

export const cycleAtomFamily = atomFamily<Partial<Cycle> | undefined, Cycle['id'] | undefined>({
  key: KEY,
  default: undefined,
})

export default cycleAtomFamily
