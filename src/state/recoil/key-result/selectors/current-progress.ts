import { selectorFamily } from 'recoil'

import { KeyResult } from 'src/components/KeyResult/types'
import keyResultAtomFamily from 'src/state/recoil/key-result/atom-family'
import { RecoilInterfaceGetter } from 'src/state/recoil/types'

import { PREFIX } from './constants'

const KEY = `${PREFIX}::SELECT_CURRENT_PROGRESS`

export const getCurrentProgress = (id?: KeyResult['id']) => ({ get }: RecoilInterfaceGetter) => {
  if (!id) return 0

  const keyResult = get(keyResultAtomFamily(id))
  if (!keyResult) return 0

  return keyResult.currentProgress ?? keyResult.initialValue ?? 0
}

const selectCurrentProgress = selectorFamily<
  KeyResult['currentProgress'],
  KeyResult['id'] | undefined
>({
  key: KEY,
  get: getCurrentProgress,
})

export default selectCurrentProgress
