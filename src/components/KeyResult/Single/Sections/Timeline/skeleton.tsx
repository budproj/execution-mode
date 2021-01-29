import React from 'react'

import { KeyResultSectionTimelineCardCheckIn } from './Cards'

export interface KeyResultSectionTimelineSkeletonProperties {
  noOfSkeletons: number
}

const KeyResultSectionTimelineSkeleton = ({
  noOfSkeletons,
}: KeyResultSectionTimelineSkeletonProperties) => (
  <>
    {[...new Array(noOfSkeletons)].map(() => (
      <KeyResultSectionTimelineCardCheckIn key={Math.random()} />
    ))}
  </>
)

KeyResultSectionTimelineSkeleton.defaultProps = {
  noOfSkeletons: 3,
}

export default KeyResultSectionTimelineSkeleton
