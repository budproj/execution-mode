import { Accordion, Box, Heading, Skeleton } from '@chakra-ui/react'
import uniqueId from 'lodash/uniqueId'
import React from 'react'

import buildSkeletonMinSize from 'lib/chakra/build-skeleton-min-size'

import ObjectiveAccordionItem from '../AccordionItem'
import { Objective } from '../types'

import ObjectivesSkeleton from './objectives-skeleton'

export interface ObjectiveGroupProperties {
  groupTitle?: string
  objectiveIDs?: Array<Objective['id']>
}

const ObjectiveGroup = ({ groupTitle, objectiveIDs }: ObjectiveGroupProperties) => {
  const isLoaded = Boolean(objectiveIDs && objectiveIDs.length > 0)

  return (
    <Box borderRadius="xl" bg="black.200" p={6}>
      <Skeleton isLoaded={isLoaded} {...buildSkeletonMinSize(isLoaded, 200, 24)}>
        <Heading fontSize="xl" as="h3" fontWeight={500} color="black.900">
          {groupTitle}
        </Heading>
      </Skeleton>

      <Accordion allowToggle pt={6} display="flex" flexDirection="column" gridGap={6}>
        {isLoaded ? (
          objectiveIDs?.map((objectiveID) => (
            <ObjectiveAccordionItem
              key={`${groupTitle ?? uniqueId()}_OBJECTIVE_ACCORDION_${objectiveID ?? uniqueId()}`}
              objectiveID={objectiveID}
            />
          ))
        ) : (
          <ObjectivesSkeleton />
        )}
      </Accordion>
    </Box>
  )
}

export default ObjectiveGroup
