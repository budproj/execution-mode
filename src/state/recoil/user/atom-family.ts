import { atomFamily } from 'recoil'

import { User } from 'src/components/User/types'

import { PREFIX } from './constants'

const KEY = `${PREFIX}::FAMILY`

export const userAtomFamily = atomFamily<User | undefined, User['id'] | undefined>({
  key: KEY,
  default: undefined,
})

export default userAtomFamily
