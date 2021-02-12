import React from 'react'

import { KeyResultSectionTimelineCardCheckIn, KeyResultSectionTimelineCardComment } from './Cards'

const KeyResultSectionTimelineSkeleton = () => {
  const skeleton = [
    KeyResultSectionTimelineCardComment,
    KeyResultSectionTimelineCardCheckIn,
    KeyResultSectionTimelineCardComment,
    KeyResultSectionTimelineCardComment,
  ]

  return (
    <>
      {skeleton.map((Component) => (
        <Component key={Math.random()} />
      ))}
    </>
  )
}

export default KeyResultSectionTimelineSkeleton
