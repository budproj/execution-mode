import { DefaultValue, selectorFamily } from 'recoil'

import { KeyResult, KeyResultTimelineEntry } from 'src/components/KeyResult/types'
import { buildPartialSelector } from 'src/state/recoil/key-result/selectors'
import { RecoilInterfaceReadWrite } from 'src/state/recoil/types'

import { PREFIX } from './constants'

const KEY = `${PREFIX}::REMOVE_TIMELINE_ENTRY`

export const selectTimelineEntries = buildPartialSelector<KeyResult['timeline']>('timeline')

export const removeTimelineEntry = (id?: KeyResult['id']) => (
  { get, set }: RecoilInterfaceReadWrite,
  entryToRemove: Partial<KeyResultTimelineEntry> | DefaultValue | undefined,
) => {
  if (!id) return
  if (!entryToRemove) return
  if (entryToRemove instanceof DefaultValue) return

  const timelineEntriesSelector = selectTimelineEntries(id)
  const timelineEntries = get(timelineEntriesSelector)

  const removedTimelineEntries = timelineEntries?.filter((entry) => entry.id !== entryToRemove.id)

  set(timelineEntriesSelector, removedTimelineEntries)
}

export const selectRemoveTimelineEntry = selectorFamily<
  Partial<KeyResultTimelineEntry> | undefined,
  KeyResult['id'] | undefined
>({
  key: KEY,
  // eslint-disable-next-line unicorn/consistent-function-scoping, unicorn/no-useless-undefined
  get: () => () => undefined,
  set: removeTimelineEntry,
})

export default selectRemoveTimelineEntry
