import React from 'react'

import {
  KeyResultSectionTimelineCardCheckIn,
  KeyResultSectionTimelineCardComment,
} from 'src/components/KeyResult/Single/Sections/Timeline/Cards'
import { KeyResultCheckIn, KeyResultComment } from 'src/components/KeyResult/types'

export interface KeyResultSectionTimelineContentEntryProperties<E> {
  typename: string
  data: Partial<E>
}

const KeyResultSectionTimelineContentEntry = <E extends KeyResultCheckIn | KeyResultComment>({
  typename,
  data,
}: KeyResultSectionTimelineContentEntryProperties<E>) => {
  const typenameComponents: Record<string, typeof KeyResultSectionTimelineCardCheckIn> = {
    KeyResultCheckIn: KeyResultSectionTimelineCardCheckIn,
    KeyResultComment: KeyResultSectionTimelineCardComment,
  }
  const TypenameComponent =
    typenameComponents[typename in typenameComponents ? typename : 'KeyResultComment']

  return <TypenameComponent data={data} />
}

export default KeyResultSectionTimelineContentEntry
