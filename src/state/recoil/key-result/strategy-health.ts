import { atom } from 'recoil'

import { Confidence } from 'src/components/Report/BoardsOverview/KeyResultConfidences/types'

import { PREFIX } from './constants'

export const krHealthStatusAtom = atom<Confidence['name'] | undefined>({
  key: `${PREFIX}::KR_HEALTH_STATUS`,
  default: undefined,
})
