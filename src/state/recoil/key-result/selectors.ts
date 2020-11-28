import getPath from 'lodash/get'
import { selectorFamily } from 'recoil'

import { Team } from 'components/Company/types'
import { KeyResult } from 'components/KeyResult'
import { Objective } from 'components/Objective/types'
import { User } from 'components/User/types'

import keyResultAtomFamily from './atom-family'
import { PREFIX } from './constants'

const KEY = `${PREFIX}::SELECTORS`

type ValueOf<T> = T[keyof T]

export const buildPartialSelector = <
  T extends ValueOf<KeyResult> | ValueOf<Objective> | ValueOf<User> | ValueOf<Team>
>(
  part: string,
) =>
  selectorFamily<T | undefined, KeyResult['id'] | undefined>({
    key: `${KEY}::KEY_RESULT_${part.toUpperCase()}`,
    get: (id) => ({ get }) => {
      if (!id) return

      const keyResult = get(keyResultAtomFamily(id))
      const keyResultPart = getPath(keyResult, part) as T

      return keyResultPart
    },
    set: (id) => ({ get, set }, newValue) => {
      const originalKeyResult = get(keyResultAtomFamily(id as KeyResult['id'])) as KeyResult
      const newPartialValue = { [part]: newValue }
      const newKeyResult: KeyResult = {
        ...originalKeyResult,
        ...newPartialValue,
      }

      set(keyResultAtomFamily(id as KeyResult['id']), newKeyResult)
    },
  })
