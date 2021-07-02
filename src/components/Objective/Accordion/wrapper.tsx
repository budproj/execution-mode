import { Accordion } from '@chakra-ui/react'
import React, { useEffect } from 'react'
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil'

import {
  objectiveAccordionExpandedEntries,
  objectiveAccordionIDs,
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
  const accordionObjectiveIDs = useRecoilValue(objectiveAccordionIDs(accordionID))
  const [accordionExpandedIndexes, setAccordionExpandedIndexes] = useRecoilState(
    objectiveAccordionExpandedEntries(accordionID),
  )

  const objectiveIDsAsArray = Array.isArray(accordionObjectiveIDs)
    ? accordionObjectiveIDs
    : [accordionObjectiveIDs]

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
      {isLoaded && objectiveIDsAsArray ? (
        objectiveIDsAsArray.map((objectiveID, index) => (
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
