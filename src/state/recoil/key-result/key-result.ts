import deepmerge from 'deepmerge'
import { DefaultValue, selectorFamily } from 'recoil'

import { overwriteMerge } from 'lib/deepmerge'
import { KeyResult } from 'src/components/KeyResult/types'
import { PREFIX } from 'src/state/recoil/intl/constants'
import { RecoilInterfaceReadWrite } from 'src/state/recoil/types'

import keyResultAtomFamily from './atom-family'

const KEY = `${PREFIX}::KEY_RESULT`

export const updateKeyResult =
  (id?: KeyResult['id']) =>
  (
    { get, set }: RecoilInterfaceReadWrite,
    newKeyResult: Partial<KeyResult> | DefaultValue | undefined,
  ) => {
    if (!id) return
    if (!newKeyResult) return

    const atom = keyResultAtomFamily(id)
    const currentValue = get(atom) ?? {}
    const newValue = deepmerge(currentValue, newKeyResult as Partial<KeyResult>, {
      arrayMerge: overwriteMerge,
    })

    set(atom, newValue)
  }

export const selectKeyResult = selectorFamily<
  Partial<KeyResult> | undefined,
  KeyResult['id'] | undefined
>({
  key: KEY,
  get:
    (id) =>
    ({ get }) =>
      get(keyResultAtomFamily(id)),
  set: updateKeyResult,
})

export default selectKeyResult
