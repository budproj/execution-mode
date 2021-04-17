import { DefaultValue, selectorFamily } from 'recoil'

import { KeyResult, KeyResultTimelineEntry } from 'src/components/KeyResult/types'
import buildPartialSelector from 'src/state/recoil/key-result/build-partial-selector'
import { RecoilInterfaceReadWrite } from 'src/state/recoil/types'

import { PREFIX } from './constants'

const KEY = `${PREFIX}::REMOVE_ENTRY`

export const selectTimelineConnection = buildPartialSelector<KeyResult['timeline']>('timeline')

export const removeTimelineEntry = (id?: KeyResult['id']) => (
  { get, set }: RecoilInterfaceReadWrite,
  entryToRemove: Partial<KeyResultTimelineEntry> | DefaultValue | undefined,
) => {
  if (!id) return
  if (!entryToRemove) return
  if (entryToRemove instanceof DefaultValue) return

  const timelineConnectionSelector = selectTimelineConnection(id)
  const timelineConnection = get(timelineConnectionSelector)

  const removedTimelineEdges = timelineConnection?.edges.filter(
    (edge) => edge.node.id !== entryToRemove.id,
  )
  const newTimelineConnection = {
    ...timelineConnection,
    edges: removedTimelineEdges,
  }

  set(timelineConnectionSelector, newTimelineConnection)
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
