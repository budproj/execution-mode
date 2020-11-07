import { atom } from 'recoil'

import { PREFIX } from './constants'

import { User } from 'components/User'

export const KEY = `${PREFIX}::ID`

export const userID = atom<User['id']>({
  key: KEY,
  default: '1',
})
