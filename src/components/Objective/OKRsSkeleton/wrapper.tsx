import uniqueId from 'lodash/uniqueId'
import React from 'react'

import CycleObjectives from '../../Cycle/Objectives/wrapper'

export interface ChildObjectivesSkeletonProperties {
  numOfSkeletons?: number
}

export const OKRsSkeleton = ({ numOfSkeletons }: ChildObjectivesSkeletonProperties) => {
  numOfSkeletons ??= 1

  return (
    <>
      {[...new Array(numOfSkeletons)].map((_) => (
        <CycleObjectives key={uniqueId()} objectiveIDs={[]} />
      ))}
    </>
  )
}
