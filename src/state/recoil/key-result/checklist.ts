import { atom, atomFamily } from 'recoil'

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

export const checkMarkIsBeingRemovedAtom = atomFamily<boolean, string | undefined>({
  key: `${key}::IS_BEING_REMOVED`,
  default: false,
})

export const isCheckListCollapseOpenAtom = atom<boolean>({
  key: `${key}::IS_COLLAPSE_OPEN`,
  default: false,
})

export const isCheckListAllDisabledAtom = atom<boolean>({
  key: `${key}::IS_ALL_DISABLED`,
  default: false,
})
