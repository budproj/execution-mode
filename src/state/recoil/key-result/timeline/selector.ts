import { DefaultValue, selectorFamily } from 'recoil'

import { KeyResult, KeyResultTimelineEntry } from 'src/components/KeyResult/types'
import buildPartialSelector from 'src/state/recoil/key-result/build-partial-selector'
import { RecoilInterfaceGetter, RecoilInterfaceReadWrite } from 'src/state/recoil/types'

import { PREFIX } from './constants'

const KEY = `${PREFIX}::SELECTOR`

export const timelinePartialSelector = buildPartialSelector<KeyResult['timeline']>('timeline')

export const getTimeline = (id?: KeyResult['id']) => ({ get }: RecoilInterfaceGetter) => {
  if (!id) return

  const timeline = get(timelinePartialSelector(id))

  return timeline
}

export const setTimeline = (id?: KeyResult['id']) => (
  { get, set }: RecoilInterfaceReadWrite,
  newEntries: KeyResultTimelineEntry[] | DefaultValue | undefined,
) => {
  if (!id) return
  if (!newEntries) return
  if (newEntries instanceof DefaultValue) return

  const timelineSelector = timelinePartialSelector(id)
  const previousTimeline = get(timelineSelector) ?? []

  const timeline = [...previousTimeline, ...newEntries]

  set(timelineSelector, timeline)
}

export const selectTimeline = selectorFamily<
  KeyResultTimelineEntry[] | undefined,
  KeyResult['id'] | undefined
>({
  key: KEY,
  get: getTimeline,
  set: setTimeline,
})

export default selectTimeline
