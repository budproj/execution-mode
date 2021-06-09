import uniqueId from 'lodash/uniqueId'
import React from 'react'

import ObjectiveAccordionItem from 'src/components/Objective/AccordionItem/index'

export interface ObjectiveAccordionSkeletonProperties {
  numOfSkeletons?: number
}

export const ObjectiveAccordionSkeleton = ({
  numOfSkeletons,
}: ObjectiveAccordionSkeletonProperties) => {
  numOfSkeletons ??= 3

  return (
    <>
      {[...new Array(numOfSkeletons)].map((_, index) => (
        <ObjectiveAccordionItem key={uniqueId()} index={index} />
      ))}
    </>
  )
}
