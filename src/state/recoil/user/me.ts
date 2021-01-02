import { atom } from 'recoil'

import { User } from 'src/components/User/types'

import { PREFIX } from './constants'

const KEY = `${PREFIX}::ME`

const meAtom = atom<User['id']>({
  key: KEY,
  default: '',
})

export default meAtom
