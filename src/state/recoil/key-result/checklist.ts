import { atomFamily } from 'recoil'

import { KeyResultChecklist } from 'src/components/KeyResult/types'

import { PREFIX } from './constants'

const key = `${PREFIX}`

export const keyResultChecklistAtom = atomFamily<
  KeyResultChecklist | undefined,
  string | undefined
>({
  key,
  default: undefined,
})
