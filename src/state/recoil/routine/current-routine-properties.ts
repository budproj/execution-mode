import { atom } from 'recoil'

import { PREFIX } from './constants'

const KEY = `${PREFIX}::CURRENT_ROUTINES_PROPERTIES_ATOM`

type RoutineProperties = {
  size?: number
}

export const currentRoutinePropertiesAtom = atom<RoutineProperties>({
  key: KEY,
  default: {
    size: undefined,
  },
})
