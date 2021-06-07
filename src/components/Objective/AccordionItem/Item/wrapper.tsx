import { AccordionItem } from '@chakra-ui/react'
import React, { useEffect } from 'react'
import { useRecoilValue } from 'recoil'

import { Objective } from 'src/components/Objective/types'
import useConfidenceTag from 'src/state/hooks/useConfidenceTag'
import { objectiveAtomFamily } from 'src/state/recoil/objective'

import ObjectiveAccordionButton from './button'
import ObjectiveAccordionPanel from './panel'

export interface ObjectiveAccordionItemProperties {
  index: number
  objectiveID?: Objective['id']
  teamID?: string
  accordionID?: string
}

const ObjectiveAccordionItem = ({
  objectiveID,
  teamID,
  index,
  accordionID,
}: ObjectiveAccordionItemProperties) => {
  const objective = useRecoilValue(objectiveAtomFamily(objectiveID))
  const [confidenceTag, setConfidence] = useConfidenceTag(objective?.status?.confidence)
  const isLoaded = Boolean(objective)

  useEffect(() => {
    if (typeof objective?.status?.confidence !== 'undefined')
      setConfidence(objective?.status?.confidence)
  }, [objective, setConfidence])

  return (
    <AccordionItem
      borderColor="transparent"
      bg="white"
      boxShadow="for-background.light"
      p={4}
      borderRadius="10"
    >
      {({ isExpanded }) => (
        <>
          <ObjectiveAccordionButton
            objective={objective}
            confidenceTag={confidenceTag}
            teamID={teamID}
            isLoaded={isLoaded}
            accordionID={accordionID}
            accordionIndex={index}
          />
          <ObjectiveAccordionPanel isExpanded={isExpanded} objectiveID={objectiveID} />
        </>
      )}
    </AccordionItem>
  )
}

export default ObjectiveAccordionItem
