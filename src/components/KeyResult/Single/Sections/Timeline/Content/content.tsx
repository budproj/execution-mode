import React from 'react'

import { EmptyState } from 'src/components/Base'
import { KeyResult } from 'src/components/KeyResult/types'

import KeyResultSectionTimelineContentEntry from './entry'
import messages from './messages'

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
    <EmptyState labelMessage={messages.emptyState} />
  )

export default KeyResultSectionTimelineContent
