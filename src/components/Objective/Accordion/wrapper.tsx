import { Accordion } from '@chakra-ui/react'
import React, { useEffect } from 'react'
import { useRecoilState } from 'recoil'

import { Team } from 'src/components/Team/types'
import { User } from 'src/components/User/types'
import {
  objectiveAccordion,
  objectiveAccordionExpandedIndexes,
} from 'src/state/recoil/objective/accordion'

import { ObjectiveAccordionItem } from './Item/wrapper'
import { ObjectiveAccordionSkeleton } from './skeleton'

interface ObjectiveAccordionProperties {
  isLoaded: boolean
  objectiveIDs: string[]
  accordionID?: string
  userID?: User['id']
  teamID?: Team['id']
  isDisabled?: boolean
}

export const ObjectiveAccordion = ({
  isLoaded,
  objectiveIDs,
  userID,
  teamID,
  accordionID,
  isDisabled,
}: ObjectiveAccordionProperties) => {
  const [accordionEntries, setAccordionEntries] = useRecoilState(objectiveAccordion(accordionID))
  const [accordionExpandedIndexes, setExpandedIndexes] = useRecoilState(
    objectiveAccordionExpandedIndexes(accordionID),
  )

  useEffect(() => {
    setAccordionEntries(objectiveIDs)
  }, [objectiveIDs, setAccordionEntries])

  return (
    <Accordion
      allowToggle
      allowMultiple
      index={accordionExpandedIndexes}
      gridGap={8}
      display="flex"
      flexDirection="column"
      onChange={setExpandedIndexes}
    >
      {isLoaded ? (
        accordionEntries.map((objectiveID) => (
          <ObjectiveAccordionItem
            key={objectiveID}
            objectiveID={objectiveID}
            teamID={teamID}
            userID={userID}
            isDisabled={isDisabled}
          />
        ))
      ) : (
        <ObjectiveAccordionSkeleton />
      )}
    </Accordion>
  )
}
