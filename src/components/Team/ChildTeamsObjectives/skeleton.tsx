import React from 'react'

import ObjectiveGroup from 'src/components/Objective/Group'

export interface ChildTeamsObjectivesSkeletonProperties {
  numOfSkeletons: number
}

const ChildTeamsObjectivesSkeleton = ({
  numOfSkeletons,
}: ChildTeamsObjectivesSkeletonProperties) => (
  <>
    {
      // eslint-disable-next-line unicorn/no-null
      new Array(numOfSkeletons).fill(null).map(() => (
        <ObjectiveGroup key={Math.random()} />
      ))
    }
  </>
)

ChildTeamsObjectivesSkeleton.defaultProps = {
  numOfSkeletons: 3,
}

export default ChildTeamsObjectivesSkeleton
