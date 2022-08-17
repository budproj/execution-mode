import { atom } from 'recoil'

import { PREFIX } from './constants'

export interface Routine {
  id: string
  name: string
  isOutdated: number
  status: {
    latestReply: string
  }
}

const routines = [
  {
    id: '123',
    name: 'Restrospectiva da Semana',
    isOutdated: 3,
    status: {
      latestReply: '2022-09-12 10:00:00',
    },
  },
  {
    id: '321',
    name: 'Dua lipa rocks',
    isOutdated: 0,
    status: {
      latestReply: '2022-09-12 10:00:00',
    },
  },
]

export const pendingRoutinesQueryAtom = atom<Routine[]>({
  key: `${PREFIX}::PENDING_ROUTINES_QUERY`,
  default: routines,
})
