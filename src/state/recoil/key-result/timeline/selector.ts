import deepmerge from 'deepmerge'
import { DefaultValue, selectorFamily } from 'recoil'

import { KeyResult, KeyResultTimelineEntry } from 'src/components/KeyResult/types'
import { GraphQLConnection } from 'src/components/types'
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
  newValue: GraphQLConnection<KeyResultTimelineEntry> | DefaultValue | undefined,
) => {
  if (!id) return
  if (!newValue) return
  if (newValue instanceof DefaultValue) return

  const timelineSelector = timelinePartialSelector(id)
  const previousTimeline = get(timelineSelector) ?? {}

  const timeline = deepmerge(previousTimeline, newValue)

  set(timelineSelector, timeline)
}

export const selectTimeline = selectorFamily<
  GraphQLConnection<KeyResultTimelineEntry> | undefined,
  KeyResult['id'] | undefined
>({
  key: KEY,
  get: getTimeline,
  set: setTimeline,
})

export default selectTimeline
