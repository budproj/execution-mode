import deepmerge from 'deepmerge'
import { DefaultValue, selectorFamily } from 'recoil'

import { KeyResult } from 'src/components/KeyResult'
import { PREFIX } from 'src/state/recoil/intl/constants'
import keyResultAtomFamily from 'src/state/recoil/key-result/atom-family'
import { RecoilSpecificationSetter } from 'src/state/recoil/types'

const KEY = `${PREFIX}::KEY_RESULT`

export const updateKeyResult = (id?: KeyResult['id']) => (
  { get, set }: RecoilSpecificationSetter,
  newKeyResult: Partial<KeyResult> | DefaultValue | undefined,
) => {
  if (!id) return
  if (!newKeyResult) return

  const atom = keyResultAtomFamily(id)
  const currentValue = get(atom) ?? {}
  const newValue = deepmerge(currentValue, newKeyResult as Partial<KeyResult>)

  set(atom, newValue)
}

export const selectKeyResult = selectorFamily<KeyResult | undefined, KeyResult['id'] | undefined>({
  key: KEY,
  get: (id) => ({ get }) => get(keyResultAtomFamily(id)),
  set: updateKeyResult,
})

export default selectKeyResult
