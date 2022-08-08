import { atom } from 'recoil'

import { User } from 'src/components/User/types'

import { PREFIX } from './constants'

export const selectedUsersCheckbox = atom<Array<User['id']>>({
  key: `${PREFIX}::SELECT_USERS_CHECKBOX`,
  default: [],
})
