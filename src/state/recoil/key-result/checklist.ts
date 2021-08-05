import { atomFamily } from 'recoil'

import { KeyResultChecklist } from 'src/components/KeyResult/types'

import { PREFIX } from './constants'

const key = `${PREFIX}::CHECKLIST`

export const keyResultChecklistAtom = atomFamily<
  KeyResultChecklist | undefined,
  string | undefined
>({
  key,
  default: undefined,
})

export const draftCheckMarksAtom = atomFamily<string[], string | undefined>({
  key: `${key}::DRAFT_CHECK_MARKS`,
  default: [],
})
