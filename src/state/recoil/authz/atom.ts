import { atom } from 'recoil'

import { PREFIX } from './constants'
import { AuthzUser } from './types'

const authz = atom<AuthzUser | undefined>({
  key: PREFIX,
  default: undefined,
})

export default authz
