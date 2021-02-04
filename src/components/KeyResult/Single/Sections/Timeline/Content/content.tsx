import React from 'react'

import { EmptyState } from 'src/components/Base'
import { KeyResultSectionTimelineCardCheckIn } from 'src/components/KeyResult/Single/Sections/Timeline/Cards'
import { KeyResultCheckIn } from 'src/components/KeyResult/types'

import messages from './messages'

export interface KeyResultSectionTimelineContentProperties {
  checkIns?: KeyResultCheckIn[]
}

const KeyResultSectionTimelineContent = ({ checkIns }: KeyResultSectionTimelineContentProperties) =>
  checkIns && checkIns.length > 0 ? (
    <>
      {checkIns.map((checkIn) => (
        <KeyResultSectionTimelineCardCheckIn key={checkIn.id} {...checkIn} />
      ))}
    </>
  ) : (
    <EmptyState labelMessage={messages.emptyState} />
  )

export default KeyResultSectionTimelineContent
