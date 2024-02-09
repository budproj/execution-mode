import React from 'react'

import { KeyResultSectionTimelineCardCheckIn } from 'src/components/KeyResult/Single/Sections/Timeline/Cards'
import KeyResultSectionTimelineCardCommentAndFeedbacks from 'src/components/KeyResult/Single/Sections/Timeline/Cards/Comment/comment'
import KeyResultSectionTimelineCardUpdate from 'src/components/KeyResult/Single/Sections/Timeline/Cards/Updates'
import {
  KeyResult,
  KeyResultCheckIn,
  KeyResultComment,
  KeyResultUpdates,
} from 'src/components/KeyResult/types'

export interface KeyResultSectionTimelineContentEntryProperties<E> {
  readonly typename: string
  readonly keyResultID: KeyResult['id']
  readonly data: Partial<E>
  readonly onEntryDelete?: (entryType: string) => void
}

const KeyResultSectionTimelineContentEntry = <
  E extends KeyResultCheckIn | KeyResultComment | KeyResultUpdates,
>({
  typename,
  keyResultID,
  data,
  onEntryDelete,
}: KeyResultSectionTimelineContentEntryProperties<E>) => {
  const typenameComponents: Record<string, typeof KeyResultSectionTimelineCardCheckIn> = {
    KeyResultCheckIn: KeyResultSectionTimelineCardCheckIn,
    KeyResultComment: KeyResultSectionTimelineCardCommentAndFeedbacks,
    KeyResultUpdate: KeyResultSectionTimelineCardUpdate,
  }
  const TypenameComponent =
    typenameComponents[typename in typenameComponents ? typename : 'TaskComment']

  return <TypenameComponent keyResultID={keyResultID} data={data} onEntryDelete={onEntryDelete} />
}

export default KeyResultSectionTimelineContentEntry
