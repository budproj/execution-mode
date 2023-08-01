import remove from 'lodash/remove'
import { DefaultValue, selectorFamily } from 'recoil'

import { KeyResult, KeyResultTimelineEntry } from 'src/components/KeyResult/types'
import { GraphQLConnection } from 'src/components/types'
import buildPartialSelector from 'src/state/recoil/key-result/build-partial-selector'
import { RecoilInterfaceGetter, RecoilInterfaceReadWrite } from 'src/state/recoil/types'
import { userAtomFamily } from 'src/state/recoil/user'
import meAtom from 'src/state/recoil/user/me'

import { PREFIX } from './constants'

const KEY = `${PREFIX}::LATEST_ENTRY`

export const selectTimelineConnection = buildPartialSelector<KeyResult['timeline']>('timeline')

export const getLatestTimelineEntry =
  (id?: KeyResult['id']) =>
  ({ get }: RecoilInterfaceGetter) => {
    if (!id) return

    const timelineConnection = get(selectTimelineConnection(id))
    const latestTimelineEntry = timelineConnection?.edges?.[0].node

    return latestTimelineEntry
  }

export const setLatestTimelineEntry =
  (id?: KeyResult['id']) =>
  (
    { get, set }: RecoilInterfaceReadWrite,
    newTimelineEntry: KeyResultTimelineEntry | DefaultValue | undefined,
  ) => {
    if (!id) return

    const timelineConnectionSelector = selectTimelineConnection(id)
    const timelineConnection = get(timelineConnectionSelector)

    const userID = get(meAtom)
    const user = get(userAtomFamily(userID))

    const newLocalTimelineEntry = {
      user,
      createdAt: new Date(),
      ...newTimelineEntry,
    }
    const newTimelineEdges = remove([
      {
        node: newLocalTimelineEntry,
      },
      ...(timelineConnection?.edges ?? []),
    ])

    // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
    const newTimelineConnection = {
      ...timelineConnection,
      edges: newTimelineEdges,
    } as GraphQLConnection<KeyResultTimelineEntry>

    set(timelineConnectionSelector, newTimelineConnection)
  }

export const selectLatestTimelineEntry = selectorFamily<
  KeyResultTimelineEntry | undefined,
  KeyResult['id'] | undefined
>({
  key: KEY,
  get: getLatestTimelineEntry,
  set: setLatestTimelineEntry,
})

export default selectLatestTimelineEntry
