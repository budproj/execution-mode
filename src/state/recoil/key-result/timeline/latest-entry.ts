import remove from 'lodash/remove'
import { DefaultValue, selectorFamily } from 'recoil'

import { KeyResult, KeyResultTimelineEntry } from 'src/components/KeyResult/types'
import buildPartialSelector from 'src/state/recoil/key-result/build-partial-selector'
import { RecoilInterfaceGetter, RecoilInterfaceReadWrite } from 'src/state/recoil/types'
import { userAtomFamily } from 'src/state/recoil/user'
import meAtom from 'src/state/recoil/user/me'

import { PREFIX } from './constants'

const KEY = `${PREFIX}::LATEST_ENTRY`

export const selectTimelineEntries = buildPartialSelector<KeyResult['timeline']>('timeline')

export const getLatestTimelineEntry = (id?: KeyResult['id']) => ({
  get,
}: RecoilInterfaceGetter) => {
  if (!id) return

  const timelineEntries = get(selectTimelineEntries(id))
  const latestTimelineEntry = timelineEntries?.[0]

  return latestTimelineEntry
}

export const setLatestTimelineEntry = (id?: KeyResult['id']) => (
  { get, set }: RecoilInterfaceReadWrite,
  newTimelineEntry: Partial<KeyResultTimelineEntry> | DefaultValue | undefined,
) => {
  if (!id) return

  const timelineEntriesSelector = selectTimelineEntries(id)
  const timelineEntries = get(timelineEntriesSelector)

  const userID = get(meAtom)
  const user = get(userAtomFamily(userID))

  // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
  const newLocalTimelineEntry = {
    user,
    createdAt: new Date(),
    ...newTimelineEntry,
  } as KeyResultTimelineEntry
  const newTimelineEntries = remove([newLocalTimelineEntry, ...(timelineEntries ?? [])])

  set(timelineEntriesSelector, newTimelineEntries)
}

export const selectLatestTimelineEntry = selectorFamily<
  Partial<KeyResultTimelineEntry> | undefined,
  KeyResult['id'] | undefined
>({
  key: KEY,
  get: getLatestTimelineEntry,
  set: setLatestTimelineEntry,
})

export default selectLatestTimelineEntry
