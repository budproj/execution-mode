import { AccordionItem } from '@chakra-ui/react'
import React, { useEffect } from 'react'
import { useRecoilValue } from 'recoil'

import { Objective } from 'src/components/Objective/types'
import useConfidenceTag from 'src/state/hooks/useConfidenceTag'
import { objectiveAtomFamily } from 'src/state/recoil/objective'

import { ObjectiveAccordionButton } from './Button/wrapper'
import { ObjectiveAccordionPanel } from './Panel/wrapper'

export interface ObjectiveAccordionItemProperties {
  objectiveID?: Objective['id']
  teamID?: string
  isDisabled?: boolean
}

export const ObjectiveAccordionItem = ({
  objectiveID,
  teamID,
  isDisabled,
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
            isDisabled={isDisabled}
          />
          <ObjectiveAccordionPanel
            isExpanded={isExpanded}
            objectiveID={objectiveID}
            teamID={teamID}
            isDisabled={isDisabled}
          />
        </>
      )}
    </AccordionItem>
  )
}
