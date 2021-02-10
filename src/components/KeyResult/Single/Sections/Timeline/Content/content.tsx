import React from 'react'

import { KeyResult } from 'src/components/KeyResult/types'

import { KeyResultSectionTimelineCardEmptyState } from '../Cards'

import KeyResultSectionTimelineContentEntry from './entry'

export interface KeyResultSectionTimelineContentProperties {
  entries?: KeyResult['timeline']
}

const KeyResultSectionTimelineContent = ({ entries }: KeyResultSectionTimelineContentProperties) =>
  entries && entries.length > 0 ? (
    <>
      {entries.map((entry) => (
        <KeyResultSectionTimelineContentEntry
          key={entry.id}
          typename={entry.__typename}
          data={entry}
        />
      ))}
    </>
  ) : (
    <KeyResultSectionTimelineCardEmptyState />
  )

export default KeyResultSectionTimelineContent
