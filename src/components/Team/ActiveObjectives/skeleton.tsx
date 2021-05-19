import uniqueId from 'lodash/uniqueId'
import React from 'react'

import { ObjectivesFromCycle } from '../../Objective/FromCycle/wrapper'

export interface ChildTeamsObjectivesSkeletonProperties {
  numOfSkeletons: number
}

const ChildTeamsObjectivesSkeleton = ({
  numOfSkeletons,
}: ChildTeamsObjectivesSkeletonProperties) => (
  <>
    {[...new Array(numOfSkeletons)].map(() => (
      <ObjectivesFromCycle key={uniqueId()} />
    ))}
  </>
)

ChildTeamsObjectivesSkeleton.defaultProps = {
  numOfSkeletons: 3,
}

export default ChildTeamsObjectivesSkeleton
