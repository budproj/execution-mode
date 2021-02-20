import React from 'react'

import {
  KeyResultSectionTimelineCardCheckIn,
  KeyResultSectionTimelineCardComment,
} from 'src/components/KeyResult/Single/Sections/Timeline/Cards'
import { KeyResult, KeyResultCheckIn, KeyResultComment } from 'src/components/KeyResult/types'

export interface KeyResultSectionTimelineContentEntryProperties<E> {
  typename: string
  keyResultID: KeyResult['id']
  data: Partial<E>
  onEntryDelete?: (entryType: string) => void
}

const KeyResultSectionTimelineContentEntry = <E extends KeyResultCheckIn | KeyResultComment>({
  typename,
  keyResultID,
  data,
  onEntryDelete,
}: KeyResultSectionTimelineContentEntryProperties<E>) => {
  const typenameComponents: Record<string, typeof KeyResultSectionTimelineCardCheckIn> = {
    KeyResultCheckIn: KeyResultSectionTimelineCardCheckIn,
    KeyResultComment: KeyResultSectionTimelineCardComment,
  }
  const TypenameComponent =
    typenameComponents[typename in typenameComponents ? typename : 'KeyResultComment']

  return <TypenameComponent keyResultID={keyResultID} data={data} onEntryDelete={onEntryDelete} />
}

export default KeyResultSectionTimelineContentEntry
