import uniqueId from 'lodash/uniqueId'
import React from 'react'

import ObjectiveGroup from 'src/components/Objective/Group'

export interface ChildTeamsObjectivesSkeletonProperties {
  numOfSkeletons: number
}

const ChildTeamsObjectivesSkeleton = ({
  numOfSkeletons,
}: ChildTeamsObjectivesSkeletonProperties) => (
  <>
    {[...new Array(numOfSkeletons)].map(() => (
      <ObjectiveGroup key={uniqueId()} />
    ))}
  </>
)

ChildTeamsObjectivesSkeleton.defaultProps = {
  numOfSkeletons: 3,
}

export default ChildTeamsObjectivesSkeleton
