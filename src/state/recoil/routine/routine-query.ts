import { atom } from 'recoil'

import { PREFIX } from './constants'

interface routineProperties {
  id: string
  name: string
  isOutdated: boolean
  status: {
    latestCheckIn: string
  }
}

const routines = [
  {
    id: '123',
    name: 'Restrospectiva da Semana',
    isOutdated: true,
    status: {
      latestCheckIn: '2022-09-12 10:00:00',
    },
  },
  {
    id: '321',
    name: 'Dua lipa rocks',
    isOutdated: false,
    status: {
      latestCheckIn: '2022-09-12 10:00:00',
    },
  },
]

export const pendingRoutinesQueryAtom = atom<routineProperties[]>({
  key: `${PREFIX}::PENDING_ROUTINES_QUERY`,
  default: routines,
})
