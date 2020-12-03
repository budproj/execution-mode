import getPath from 'lodash/get'
import snakeCase from 'lodash/snakeCase'
import { DefaultValue, selectorFamily } from 'recoil'

import { Team } from 'src/components/Company/types'
import { KeyResult } from 'src/components/KeyResult'
import { Objective } from 'src/components/Objective/types'
import { User } from 'src/components/User/types'
import keyResultAtomFamily from 'src/state/recoil/key-result/atom-family'
import { RecoilSpecificationGetter, RecoilSpecificationSetter } from 'src/state/recoil/types'

import { PREFIX } from './constants'

const KEY = `${PREFIX}::PARTIAL_SELECTOR`

type ValueOf<T> = T[keyof T]
type KeyResultPart = ValueOf<KeyResult> | ValueOf<Objective> | ValueOf<User> | ValueOf<Team>

export const getKeyResultPart = <T extends KeyResultPart>(part: string) => (
  id?: KeyResult['id'],
) => ({ get }: RecoilSpecificationGetter) => {
  if (!id) return

  const keyResult = get(keyResultAtomFamily(id))
  const keyResultPart = getPath(keyResult, part) as T

  return keyResultPart
}

export const setKeyResultPart = <T>(part: string) => (id?: KeyResult['id']) => (
  { get, set }: RecoilSpecificationSetter,
  newValue: T | DefaultValue | undefined,
) => {
  if (!id) return

  const originalKeyResult = get(keyResultAtomFamily(id)) as KeyResult
  const newPartialValue = { [part]: newValue }
  const newKeyResult: KeyResult = {
    ...originalKeyResult,
    ...newPartialValue,
  }

  set(keyResultAtomFamily(id), newKeyResult)
}

export const buildPartialSelector = <T extends KeyResultPart>(part: string) =>
  selectorFamily<T | undefined, KeyResult['id'] | undefined>({
    key: `${KEY}::KEY_RESULT_${snakeCase(part).toUpperCase()}`,
    get: getKeyResultPart<T>(part),
    set: setKeyResultPart<T>(part),
  })

export default buildPartialSelector
