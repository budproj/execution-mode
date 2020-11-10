import { atom } from 'recoil'

import { User } from 'components/User'

import { PREFIX } from './constants'

export const KEY = `${PREFIX}::ID`

export const userID = atom<User['id']>({
  key: KEY,
  default: '1',
})
