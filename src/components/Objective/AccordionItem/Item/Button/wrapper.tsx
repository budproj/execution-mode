import { AccordionButton, Box } from '@chakra-ui/react'
import React from 'react'
import { useIntl } from 'react-intl'
import { useRecoilValue } from 'recoil'

import TooltipWithDelay from 'src/components/Base/TooltipWithDelay'
import { Objective } from 'src/components/Objective/types'
import { ConfidenceTag } from 'src/state/hooks/useConfidenceTag/hook'

import { objectiveAccordionEntryModes } from '../../../../../state/recoil/objective/accordion'
import { RadioProgress } from '../../../../Base/RadioProgress/wrapper'

import { ActionBox } from './action-box'
import messages from './messages'
import { TitleBox } from './title-box'

export interface ObjectiveAccordionButtonProperties {
  accordionIndex: number
  objective?: Partial<Objective>
  teamID?: string
  confidenceTag?: ConfidenceTag
  isLoaded?: boolean
  accordionID?: string
}

export const ObjectiveAccordionButton = ({
  objective,
  teamID,
  confidenceTag,
  isLoaded,
  accordionID,
  accordionIndex,
}: ObjectiveAccordionButtonProperties) => {
  const accordionEntryModes = useRecoilValue(objectiveAccordionEntryModes(accordionID))
  const intl = useIntl()

  const entryMode = accordionEntryModes[accordionIndex]
  const roundedProgress = Math.round(objective?.status?.progress ?? 0)

  return (
    <AccordionButton p={0} gridGap={4} _hover={{}} _focus={{ boxShadow: 'none' }}>
      <TooltipWithDelay label={intl.formatMessage(messages.progressTooltip)} placement="top-end">
        <Box>
          <RadioProgress
            progress={roundedProgress}
            isLoaded={isLoaded}
            size={14}
            color={confidenceTag?.color.primary}
            trackColor={confidenceTag?.color.light}
          />
        </Box>
      </TooltipWithDelay>

      <TitleBox mode={entryMode} objective={objective} isLoaded={isLoaded} />

      <ActionBox
        accordionIndex={accordionIndex}
        accordionID={accordionID}
        isLoaded={isLoaded}
        teamID={teamID}
        objective={objective}
        mode={entryMode}
      />
    </AccordionButton>
  )
}
