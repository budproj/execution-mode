import { atom } from 'recoil'

import { PREFIX } from './constants'

const KEY = `${PREFIX}::IS_CHECK_IN_MODAL_OPEN`

const isCheckInModalOpenAtom = atom<boolean>({
  key: KEY,
  default: false,
})

export default isCheckInModalOpenAtom
