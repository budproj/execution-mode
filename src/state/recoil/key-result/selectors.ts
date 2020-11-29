import getPath from 'lodash/get'
import snakeCase from 'lodash/snakeCase'
import { selectorFamily } from 'recoil'

import { Team } from 'src/components/Company/types'
import { KeyResult } from 'src/components/KeyResult'
import { Objective } from 'src/components/Objective/types'
import { User } from 'src/components/User/types'

import { RecoilSpecificationGetter, RecoilSpecificationSetter } from '../types'

import keyResultAtomFamily from './atom-family'
import { PREFIX } from './constants'

const KEY = `${PREFIX}::SELECTORS`

type ValueOf<T> = T[keyof T]

export const selectorSpecification = <T>(part: string) => ({
  key: `${KEY}::KEY_RESULT_${snakeCase(part).toUpperCase()}`,
  get: (id?: KeyResult['id']) => ({ get }: RecoilSpecificationGetter) => {
    if (!id) return

    const keyResult = get(keyResultAtomFamily(id))
    const keyResultPart = getPath(keyResult, part) as T

    return keyResultPart
  },
  set: (id: KeyResult['id']) => ({ get, set }: RecoilSpecificationSetter, newValue: Partial<T>) => {
    const originalKeyResult = get(keyResultAtomFamily(id)) as KeyResult
    const newPartialValue = { [part]: newValue }
    const newKeyResult: KeyResult = {
      ...originalKeyResult,
      ...newPartialValue,
    }

    set(keyResultAtomFamily(id), newKeyResult)
  },
})

export const buildPartialSelector = <
  T extends ValueOf<KeyResult> | ValueOf<Objective> | ValueOf<User> | ValueOf<Team>
>(
  part: string,
) => selectorFamily<T | undefined, KeyResult['id'] | undefined>(selectorSpecification<T>(part))
