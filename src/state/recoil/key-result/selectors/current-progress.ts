import { DefaultValue, selectorFamily } from 'recoil'

import { KeyResult } from 'src/components/KeyResult/types'
import keyResultAtomFamily from 'src/state/recoil/key-result/atom-family'
import { RecoilInterfaceGetter, RecoilInterfaceReadWrite } from 'src/state/recoil/types'

import { setKeyResultPart } from './build-partial-selector'
import { PREFIX } from './constants'

const KEY = `${PREFIX}::SELECT_CURRENT_PROGRESS`

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
  KeyResult['currentProgress'],
  KeyResult['id'] | undefined
>({
  key: KEY,
  get: getCurrentProgress,
  set: setCurrentProgress,
})

export default selectCurrentProgress
