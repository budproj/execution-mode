import { Accordion, Box, Heading, Skeleton } from '@chakra-ui/react'
import React from 'react'

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
    <Box borderRadius="15px" bg="gray.50" p={6}>
      <Skeleton isLoaded={isLoaded} maxW={isLoaded ? 'auto' : '30%'}>
        <Heading fontSize="20px" as="h3" fontWeight={500}>
          {groupTitle ?? 'Sample title'}
        </Heading>
      </Skeleton>

      <Accordion allowToggle pt={6} display="flex" flexDirection="column" gridGap={6}>
        {isLoaded ? (
          objectiveIDs?.map((objectiveID) => (
            <ObjectiveAccordionItem
              key={`${groupTitle ?? Math.random()}_OBJECTIVE_ACCORDION_${
                objectiveID ?? Math.random()
              }`}
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
