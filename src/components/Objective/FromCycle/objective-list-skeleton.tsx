import uniqueId from 'lodash/uniqueId'
import React from 'react'

import ObjectiveAccordionItem from 'src/components/Objective/AccordionItem'

export interface ObjectivesSkeletonProperties {
  numOfSkeletons?: number
}

export const ObjectiveListSkeleton = ({ numOfSkeletons }: ObjectivesSkeletonProperties) => {
  numOfSkeletons ??= 3

  return (
    <>
      {[...new Array(numOfSkeletons)].map(() => (
        <ObjectiveAccordionItem key={uniqueId()} />
      ))}
    </>
  )
}
