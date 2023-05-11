import { AccordionItem } from '@chakra-ui/react'
import React, { useEffect } from 'react'
import { useRecoilValue } from 'recoil'

import { Objective, ObjectiveMode } from 'src/components/Objective/types'
import { Team } from 'src/components/Team/types'
import { User } from 'src/components/User/types'
import useConfidenceTag from 'src/state/hooks/useConfidenceTag'
import { objectiveAtomFamily } from 'src/state/recoil/objective'
import { objectiveContext } from 'src/state/recoil/objective/context'

import { ObjectiveAccordionButton } from './Button/wrapper'
import { ObjectiveAccordionPanel } from './Panel/wrapper'

export interface ObjectiveAccordionItemProperties {
  objectiveID?: Objective['id']
  userID?: User['id']
  teamID?: Team['id']
  isDisabled?: boolean
}

export const ObjectiveAccordionItem = ({
  objectiveID,
  teamID,
  userID,
  isDisabled,
}: ObjectiveAccordionItemProperties) => {
  const objective = useRecoilValue(objectiveAtomFamily(objectiveID))
  const context = useRecoilValue(objectiveContext(objectiveID))

  const [confidenceTag, setConfidence] = useConfidenceTag(objective?.status?.confidence)
  const isLoaded = Boolean(objective)

  useEffect(() => {
    if (typeof objective?.status?.confidence !== 'undefined')
      setConfidence(objective?.status?.confidence)
  }, [objective, setConfidence])

  const isDraft = objective?.mode === ObjectiveMode.DRAFT

  return (
    <AccordionItem
      borderColor="transparent"
      bg="white"
      boxShadow="for-background.light"
      p={6}
      borderRadius="10"
      border={isDraft ? '2px dashed #D9E2F7' : 'initial'}
    >
      {({ isExpanded }) => (
        <>
          <ObjectiveAccordionButton
            objective={objective}
            confidenceTag={confidenceTag}
            teamID={teamID}
            userID={userID}
            isLoaded={isLoaded}
            isDisabled={isDisabled}
            context={context}
          />
          <ObjectiveAccordionPanel
            context={context}
            isExpanded={isExpanded}
            objectiveID={objectiveID}
            teamID={teamID}
            isDisabled={isDisabled}
            description={objective?.description}
            isDraft={isDraft}
          />
        </>
      )}
    </AccordionItem>
  )
}
