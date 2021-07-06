import uniqueId from 'lodash/uniqueId'
import React from 'react'

import { CycleObjectives } from '../../Cycle/Objectives/wrapper'

export interface ChildTeamsObjectivesSkeletonProperties {
  numOfSkeletons?: number
}

export const TeamOKRsSkeleton = ({ numOfSkeletons }: ChildTeamsObjectivesSkeletonProperties) => {
  numOfSkeletons ??= 1

  return (
    <>
      {[...new Array(numOfSkeletons)].map((_) => (
        <CycleObjectives key={uniqueId()} objectiveIDs={[]} />
      ))}
    </>
  )
}
