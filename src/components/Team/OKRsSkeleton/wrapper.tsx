import uniqueId from 'lodash/uniqueId'
import React from 'react'

import { ObjectivesFromCycle } from '../../Objective/FromCycle/wrapper'

export interface ChildTeamsObjectivesSkeletonProperties {
  numOfSkeletons?: number
}

export const TeamOKRsSkeleton = ({ numOfSkeletons }: ChildTeamsObjectivesSkeletonProperties) => {
  numOfSkeletons ??= 1

  return (
    <>
      {[...new Array(numOfSkeletons)].map((_) => (
        <ObjectivesFromCycle key={uniqueId()} objectiveIDs={[]} />
      ))}
    </>
  )
}
