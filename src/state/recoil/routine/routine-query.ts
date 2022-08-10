import { atom } from 'recoil'

import { PREFIX } from './constants'

interface routineProperties {
  id: string
  name: string
  isOutdated: boolean
}

const rotinas = [
  {
    id: '123',
    name: 'Restrospectiva da Semana',
    isOutdated: true,
  },
  {
    id: '321',
    name: 'Dua lipa rocks',
    isOutdated: false,
  },
]

export const pendingRoutinesQueryAtom = atom<routineProperties[]>({
  key: `${PREFIX}::PENDING_ROUTINES_QUERY`,
  default: rotinas,
})
