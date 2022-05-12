import { atom } from 'recoil'

import { PREFIX } from './constants'

export enum KeyResultType {
  COMPANY = 'company',
  PERSONAL = 'personal',
}

export const keyResultTypeAtom = atom<KeyResultType>({
  key: `${PREFIX}::KR_TYPE`,
  default: KeyResultType.COMPANY,
})
