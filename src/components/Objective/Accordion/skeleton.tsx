import uniqueId from 'lodash/uniqueId'
import React from 'react'

import { ObjectiveAccordionItem } from 'src/components/Objective/Accordion/Item/wrapper'

export interface ObjectiveAccordionSkeletonProperties {
  numOfSkeletons?: number
}

export const ObjectiveAccordionSkeleton = ({
  numOfSkeletons,
}: ObjectiveAccordionSkeletonProperties) => {
  numOfSkeletons ??= 3

  return (
    <>
      {[...new Array(numOfSkeletons)].map(() => (
        <ObjectiveAccordionItem key={uniqueId()} />
      ))}
    </>
  )
}
