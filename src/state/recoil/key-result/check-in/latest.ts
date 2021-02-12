import remove from 'lodash/remove'
import { DefaultValue, selectorFamily } from 'recoil'

import { KeyResult, KeyResultCheckIn } from 'src/components/KeyResult/types'
import buildPartialSelector from 'src/state/recoil/key-result/build-partial-selector'
import selectCurrentConfidence from 'src/state/recoil/key-result/current-confidence'
import selectCurrentProgress from 'src/state/recoil/key-result/current-progress'
import { RecoilInterfaceGetter, RecoilInterfaceReadWrite } from 'src/state/recoil/types'
import { userAtomFamily } from 'src/state/recoil/user'
import meAtom from 'src/state/recoil/user/me'

import { PREFIX } from './constants'
import progressDraft from './progress-draft'

const KEY = `${PREFIX}::LATEST`

export const selectCheckIns = buildPartialSelector<KeyResult['keyResultCheckIns']>(
  'keyResultCheckIns',
)

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
  const previousLatestCheckInSelector = selectLatestCheckIn(id)
  const currentProgressSelector = selectCurrentProgress(id)
  const currentConfidenceSelector = selectCurrentConfidence(id)
  const progressDraftSelector = progressDraft(id)

  const checkIns = get(checkInsSelector)
  const previousLatestCheckIn = get(previousLatestCheckInSelector)

  const userID = get(meAtom)
  const user = get(userAtomFamily(userID))

  // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
  const newLocalCheckIn = {
    user,
    createdAt: new Date(),
    parent: previousLatestCheckIn,
    ...newCheckIn,
  } as KeyResultCheckIn
  const newCheckIns = remove([newLocalCheckIn, ...(checkIns ?? [])])

  set(checkInsSelector, newCheckIns)
  set(currentProgressSelector, newLocalCheckIn.progress)
  set(progressDraftSelector, newLocalCheckIn.progress)
  set(currentConfidenceSelector, newLocalCheckIn.confidence)
}

export const selectLatestCheckIn = selectorFamily<
  Partial<KeyResultCheckIn> | undefined,
  KeyResult['id'] | undefined
>({
  key: KEY,
  get: getLatestCheckIn,
  set: setLatestCheckIn,
})

export default selectLatestCheckIn
