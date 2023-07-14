import { AccordionItem, Box } from '@chakra-ui/react'
import { FormikProps } from 'formik'
import React, { useEffect, useMemo, useRef } from 'react'
import { useRecoilValue } from 'recoil'

import { Objective, ObjectiveMode } from 'src/components/Objective/types'
import { Team } from 'src/components/Team/types'
import { User } from 'src/components/User/types'
import useConfidenceTag from 'src/state/hooks/useConfidenceTag'
import { objectiveAtomFamily } from 'src/state/recoil/objective'
import { objectiveContext, ObjectiveViewMode } from 'src/state/recoil/objective/context'

import IntroductionSpotlight from '../IntroductionSpotlight'

import { EditModeValues } from './Button/edit-mode'
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

  console.log({ objective })

  const isDraft = useMemo(() => objective?.mode === ObjectiveMode.DRAFT, [objective?.mode])

  const [confidenceTag, setConfidence] = useConfidenceTag(objective?.status?.confidence)
  const isLoaded = Boolean(objective)
  const formikReference = useRef<FormikProps<EditModeValues> | null>(null)

  useEffect(() => {
    if (typeof objective?.status?.confidence !== 'undefined')
      setConfidence(objective?.status?.confidence)
  }, [objective, setConfidence])

  return (
    <AccordionItem
      borderColor="transparent"
      boxShadow="for-background.light"
      p={6}
      borderRadius="10"
      border={isDraft ? '2px dashed #ADC5E2' : 'initial'}
    >
      {({ isExpanded }) =>
        context.mode === ObjectiveViewMode.FILLED ? (
          <IntroductionSpotlight objectiveID={objectiveID} />
        ) : (
          <Box>
            <ObjectiveAccordionButton
              objective={objective}
              confidenceTag={confidenceTag}
              teamID={teamID}
              userID={userID}
              isLoaded={isLoaded}
              isDisabled={isDisabled}
              context={context}
              forwardedRef={formikReference}
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
          </Box>
        )
      }
    </AccordionItem>
  )
}
