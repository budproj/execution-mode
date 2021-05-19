import uniqueId from 'lodash/uniqueId'
import React from 'react'

import ObjectiveAccordionItem from 'src/components/Objective/AccordionItem'

export interface ObjectivesSkeletonProperties {
  numOfSkeletons: number
}

const ObjectivesSkeleton = ({ numOfSkeletons }: ObjectivesSkeletonProperties) => {
  return (
    <>
      {[...new Array(numOfSkeletons)].map(() => (
        <ObjectiveAccordionItem key={uniqueId()} />
      ))}
    </>
  )
}

ObjectivesSkeleton.defaultProps = {
  numOfSkeletons: 3,
}

export default ObjectivesSkeleton
