import remove from 'lodash/remove'
import { DefaultValue, selectorFamily } from 'recoil'

import { KeyResult, KeyResultCheckIn } from 'src/components/KeyResult/types'
import { buildPartialSelector } from 'src/state/recoil/key-result/selectors'
import { RecoilInterfaceGetter, RecoilInterfaceReadWrite } from 'src/state/recoil/types'
import { userAtomFamily } from 'src/state/recoil/user'
import meAtom from 'src/state/recoil/user/me'

import { PREFIX } from './constants'

const KEY = `${PREFIX}::LATEST_CHECK_IN`

export const selectCheckIns = buildPartialSelector<KeyResult['checkIns']>('checkIns')

export const getLatestCheckIn = (id?: KeyResult['id']) => ({ get }: RecoilInterfaceGetter) => {
  if (!id) return

  const checkIns = get(selectCheckIns(id))
  const latestCheckIn = checkIns?.[0]

  return latestCheckIn
}

export const setLatestCheckIn = (id?: KeyResult['id']) => (
  { get, set }: RecoilInterfaceReadWrite,
  newCheckIn: Partial<KeyResultCheckIn> | DefaultValue | undefined,
) => {
  if (!id) return

  const checkInsSelector = selectCheckIns(id)
  const checkIns = get(checkInsSelector)

  const userID = get(meAtom)
  const user = get(userAtomFamily(userID))

  // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
  const newLocalCheckIn = {
    user,
    createdAt: new Date(),
    ...newCheckIn,
  } as KeyResultCheckIn
  const newCheckIns = remove([newLocalCheckIn, ...(checkIns ?? [])])

  set(checkInsSelector, newCheckIns)
}

const currentConfidence = selectorFamily<
  Partial<KeyResultCheckIn> | undefined,
  KeyResult['id'] | undefined
>({
  key: KEY,
  get: getLatestCheckIn,
  set: setLatestCheckIn,
})

export default currentConfidence
