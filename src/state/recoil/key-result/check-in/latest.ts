import remove from 'lodash/remove'
import { DefaultValue, selectorFamily } from 'recoil'

import { KeyResult, KeyResultCheckIn } from 'src/components/KeyResult/types'
import buildPartialSelector from 'src/state/recoil/key-result/build-partial-selector'
import { RecoilInterfaceGetter, RecoilInterfaceReadWrite } from 'src/state/recoil/types'

import keyResultAtomFamily from '../atom-family'

import { DEFAULT_CONFIDENCE, PREFIX } from './constants'

const KEY = `${PREFIX}::LATEST`

export const selectKeyResultCheckIns = buildPartialSelector<KeyResult['keyResultCheckIns']>(
  'keyResultCheckIns',
)

export const selectLatestKeyResultCheckIn = buildPartialSelector<
  KeyResult['latestKeyResultCheckIn']
>('latestKeyResultCheckIn')

export const getLatestCheckIn = (id?: KeyResult['id']) => ({ get }: RecoilInterfaceGetter) => {
  if (!id) return

  const keyResultCheckIns = get(selectKeyResultCheckIns(id))
  const keyResultLatestCheckIn = get(selectLatestKeyResultCheckIn(id))
  const keyResult = get(keyResultAtomFamily(id))

  const latestKeyResultCheckIn =
    keyResultLatestCheckIn ?? (keyResultCheckIns?.[0] as KeyResultCheckIn)
  const normalizedLatestKeyResultCheckIn: KeyResultCheckIn = {
    ...latestKeyResultCheckIn,
    value: latestKeyResultCheckIn?.value ?? keyResult?.initialValue ?? 0,
    confidence: latestKeyResultCheckIn?.confidence ?? DEFAULT_CONFIDENCE,
  }

  return normalizedLatestKeyResultCheckIn
}

export const setLatestCheckIn = (id?: KeyResult['id']) => (
  { get, set }: RecoilInterfaceReadWrite,
  newCheckIn: KeyResultCheckIn | DefaultValue | undefined,
) => {
  if (!id) return
  if (!newCheckIn) return
  if (newCheckIn instanceof DefaultValue) return

  const selectors = {
    keyResultCheckIns: selectKeyResultCheckIns(id),
    keyResultLatestCheckIn: selectLatestKeyResultCheckIn(id),
    keyResultPreviousCheckIn: selectLatestCheckIn(id),
  }

  const keyResultCheckIns = get(selectors.keyResultCheckIns) ?? []
  const keyResultPreviousCheckIn = get(selectors.keyResultPreviousCheckIn) as KeyResultCheckIn

  const newLocalCheckIn: KeyResultCheckIn = {
    parent: keyResultPreviousCheckIn,
    ...newCheckIn,
  }
  const newCheckIns = remove([newLocalCheckIn, ...keyResultCheckIns])

  set(selectors.keyResultCheckIns, newCheckIns)
  set(selectors.keyResultLatestCheckIn, newLocalCheckIn)
}

export const selectLatestCheckIn = selectorFamily<
  KeyResultCheckIn | undefined,
  KeyResult['id'] | undefined
>({
  key: KEY,
  get: getLatestCheckIn,
  set: setLatestCheckIn,
})

export default selectLatestCheckIn
