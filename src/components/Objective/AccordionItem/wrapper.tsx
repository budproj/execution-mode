import { Accordion } from '@chakra-ui/react'
import React, { useEffect } from 'react'
import { useRecoilState, useSetRecoilState } from 'recoil'

import {
  buildDefaultAccordionStateFromObjectives,
  objectiveAccordionExpandedEntries,
  objectiveAccordionEntryModes,
} from '../../../state/recoil/objective/accordion'
import { Objective } from '../types'

import ObjectiveAccordionItem from './Item/wrapper'
import { ObjectiveAccordionSkeleton } from './skeleton'

interface ObjectiveAccordionProperties {
  isLoaded: boolean
  accordionID?: string
  objectives?: Objective[]
  teamID?: string
}

export const ObjectiveAccordion = ({
  isLoaded,
  objectives,
  teamID,
  accordionID,
}: ObjectiveAccordionProperties) => {
  const setIndexesState = useSetRecoilState(objectiveAccordionEntryModes(accordionID))
  const [accordionExpandedIndexes, setAccordionExpandedIndexes] = useRecoilState(
    objectiveAccordionExpandedEntries(accordionID),
  )

  useEffect(() => {
    setIndexesState(buildDefaultAccordionStateFromObjectives(objectives))
  }, [objectives, setIndexesState])

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
      {isLoaded && objectives ? (
        objectives.map((objective, index) => (
          <ObjectiveAccordionItem
            key={objective.id}
            objectiveID={objective.id}
            teamID={teamID}
            accordionID={accordionID}
            index={index}
          />
        ))
      ) : (
        <ObjectiveAccordionSkeleton />
      )}
    </Accordion>
  )
}
