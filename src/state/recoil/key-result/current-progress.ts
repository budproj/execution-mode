import { DefaultValue, selectorFamily } from 'recoil'

import { KeyResult } from 'src/components/KeyResult/types'
import { setKeyResultPart } from 'src/state/recoil/key-result/build-partial-selector'
import { RecoilInterfaceGetter, RecoilInterfaceReadWrite } from 'src/state/recoil/types'

import keyResultAtomFamily from './atom-family'
import { PREFIX } from './constants'

const KEY = `${PREFIX}::CURRENT_PROGRESS`

const buildPartialSetter = setKeyResultPart<KeyResult['currentProgress']>('currentProgress')

export const getCurrentProgress = (id?: KeyResult['id']) => ({ get }: RecoilInterfaceGetter) => {
  if (!id) return 0

  const keyResult = get(keyResultAtomFamily(id))
  if (!keyResult) return 0

  return keyResult.currentProgress ?? keyResult.initialValue ?? 0
}

export const setCurrentProgress = (id?: KeyResult['id']) => (
  recoilInterface: RecoilInterfaceReadWrite,
  newValue?: KeyResult['currentProgress'] | DefaultValue,
) => {
  if (!id || !newValue) return

  const partialSetter = buildPartialSetter(id)

  partialSetter(recoilInterface, newValue)
}

const selectCurrentProgress = selectorFamily<
  KeyResult['currentProgress'] | undefined,
  KeyResult['id'] | undefined
>({
  key: KEY,
  get: getCurrentProgress,
  set: setCurrentProgress,
})

export default selectCurrentProgress
