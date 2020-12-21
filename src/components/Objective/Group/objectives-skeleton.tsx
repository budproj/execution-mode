import React from 'react'

import ObjectiveAccordionItem from 'src/components/Objective/AccordionItem'

export interface ObjectivesSkeletonProperties {
  numOfSkeletons: number
}

const ObjectivesSkeleton = ({ numOfSkeletons }: ObjectivesSkeletonProperties) => (
  <>
    {
      // eslint-disable-next-line unicorn/no-null
      new Array(numOfSkeletons).fill(null).map(() => (
        <ObjectiveAccordionItem key={Math.random()} />
      ))
    }
  </>
)

ObjectivesSkeleton.defaultProps = {
  numOfSkeletons: 3,
}

export default ObjectivesSkeleton
