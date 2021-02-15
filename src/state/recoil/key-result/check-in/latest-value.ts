import { selectorFamily } from 'recoil'

import { KeyResult, KeyResultCheckIn } from 'src/components/KeyResult/types'
import { RecoilInterfaceGetter } from 'src/state/recoil/types'

import { PREFIX } from './constants'
import selectLatestCheckIn from './latest'

const KEY = `${PREFIX}::LATEST`

export const getLatestCheckInValue = (id?: KeyResult['id']) => ({ get }: RecoilInterfaceGetter) => {
  if (!id) return

  const keyResultLatestCheckIn = get(selectLatestCheckIn(id))
  return keyResultLatestCheckIn?.value
}

export const selectLatestCheckInValue = selectorFamily<
  KeyResultCheckIn['value'] | undefined,
  KeyResult['id'] | undefined
>({
  key: KEY,
  get: getLatestCheckInValue,
})

export default selectLatestCheckInValue
