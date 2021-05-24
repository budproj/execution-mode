import remove from 'lodash/remove'
import { DefaultValue, selectorFamily } from 'recoil'

import { KeyResult, KeyResultCheckIn } from 'src/components/KeyResult/types'
import { User } from 'src/components/User/types'
import { GraphQLConnection } from 'src/components/types'
import keyResultAtomFamily from 'src/state/recoil/key-result/atom-family'
import { RecoilInterfaceGetter, RecoilInterfaceReadWrite } from 'src/state/recoil/types'
import { userAtomFamily } from 'src/state/recoil/user'
import meAtom from 'src/state/recoil/user/me'

import { DEFAULT_CONFIDENCE, PREFIX } from './constants'

const KEY = `${PREFIX}::LATEST`

export const getLatestCheckIn =
  (id?: KeyResult['id']) =>
  ({ get }: RecoilInterfaceGetter) => {
    if (!id) return

    const keyResult = get(keyResultAtomFamily(id))

    const keyResultCheckIns = keyResult?.keyResultCheckIns?.edges?.map((edge) => edge.node)
    const keyResultLatestCheckIn = keyResult?.latestKeyResultCheckIn

    const latestKeyResultCheckIn =
      keyResultLatestCheckIn ?? (keyResultCheckIns?.[0] as KeyResultCheckIn)
    const normalizedLatestKeyResultCheckIn: KeyResultCheckIn = {
      ...latestKeyResultCheckIn,
      value: latestKeyResultCheckIn?.value ?? keyResult?.initialValue ?? 0,
      confidence: latestKeyResultCheckIn?.confidence ?? DEFAULT_CONFIDENCE,
    }

    return normalizedLatestKeyResultCheckIn
  }

export const setLatestCheckIn =
  (id?: KeyResult['id']) =>
  (
    { get, set }: RecoilInterfaceReadWrite,
    newCheckIn: KeyResultCheckIn | DefaultValue | undefined,
  ) => {
    if (!id) return
    if (!newCheckIn) return
    if (newCheckIn instanceof DefaultValue) return

    const keyResult = get(keyResultAtomFamily(id)) as KeyResult

    const keyResultCheckInConnection =
      keyResult?.keyResultCheckIns as GraphQLConnection<KeyResultCheckIn>
    const keyResultCheckInEdges = keyResultCheckInConnection?.edges ?? []
    const keyResultCheckIns = keyResultCheckInEdges.map((edge) => edge.node)

    const keyResultLatestCheckIn = keyResult?.latestKeyResultCheckIn
    const keyResultPreviousCheckIn = keyResultLatestCheckIn ?? keyResultCheckIns[0]

    const currentUserID = get(meAtom)
    const currentUser = get(userAtomFamily(currentUserID)) as User

    const newLocalCheckIn: KeyResultCheckIn = {
      ...newCheckIn,
      parent: keyResultPreviousCheckIn,
      user: currentUser,
    }
    const newCheckInEdges = remove([{ node: newLocalCheckIn }, ...keyResultCheckInEdges])

    const newKeyResult: KeyResult = {
      ...keyResult,
      isOutdated: false,
      latestKeyResultCheckIn: newLocalCheckIn,
      keyResultCheckIns: {
        ...keyResultCheckInConnection,
        edges: newCheckInEdges,
      },
    }

    set(keyResultAtomFamily(id), newKeyResult)
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
