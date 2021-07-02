import { Accordion } from '@chakra-ui/react'
import React, { useEffect } from 'react'
import { useRecoilState, useSetRecoilState } from 'recoil'

import {
  objectiveAccordionExpandedEntries,
  objectiveAccordionUpdate,
} from '../../../state/recoil/objective/accordion'

import { ObjectiveAccordionItem } from './Item/wrapper'
import { ObjectiveAccordionSkeleton } from './skeleton'

interface ObjectiveAccordionProperties {
  isLoaded: boolean
  objectiveIDs: string[]
  accordionID?: string
  teamID?: string
  isDisabled?: boolean
}

export const ObjectiveAccordion = ({
  isLoaded,
  objectiveIDs,
  teamID,
  accordionID,
  isDisabled,
}: ObjectiveAccordionProperties) => {
  const refreshAccordionState = useSetRecoilState(objectiveAccordionUpdate(accordionID))
  const [accordionExpandedIndexes, setAccordionExpandedIndexes] = useRecoilState(
    objectiveAccordionExpandedEntries(accordionID),
  )

  useEffect(() => {
    refreshAccordionState(objectiveIDs)
  }, [objectiveIDs, refreshAccordionState])

  return (
    <Accordion
      allowToggle
      allowMultiple
      index={accordionExpandedIndexes}
      gridGap={8}
      display="flex"
      flexDirection="column"
      onChange={setAccordionExpandedIndexes}
    >
      {isLoaded && objectiveIDs ? (
        objectiveIDs.map((objectiveID, index) => (
          <ObjectiveAccordionItem
            key={objectiveID}
            objectiveID={objectiveID}
            teamID={teamID}
            accordionID={accordionID}
            index={index}
            isDisabled={isDisabled}
          />
        ))
      ) : (
        <ObjectiveAccordionSkeleton />
      )}
    </Accordion>
  )
}
